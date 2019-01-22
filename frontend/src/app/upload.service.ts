import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http'

import { Subject, Observable } from 'rxjs'

import { throwError, timer, interval, of } from 'rxjs'
import { timeout, retry, retryWhen, take, concat, share, delayWhen, flatMap } from 'rxjs/operators'
import { NoticesService } from './notices.service'


export interface Upload {
    name: string
    file: File
}

export type Uploads = Upload[]

export enum UploadStatus {
    start = 1,
    process = 2,
    success = 3,
    fail = 4
}

interface UploadTask {
    id: number,
    url: string,
    file: File,
    name: string,
    percent: number,
    total: number,
    loaded: number,
    status: UploadStatus,
    subscription: any
}

type UploadTasks = UploadTask[]

@Injectable({
  providedIn: 'root'
})
export class UploadService {

    tasks: UploadTasks = []

    subject: Subject<Upload>
    subscription: any


    constructor(
        private httpClient: HttpClient,
        public noticesService: NoticesService,
    ) {
        this.subject = new Subject<Upload>()
        //this.subscription = this.subject.subscribe((event: Upload) => {
        //    console.log(event)
        //})
    }

    nextId: number = 0

    addItem(item: UploadTask) : number {
        item.id = this.nextId 
        this.tasks.push(item)
        this.nextId += 1
        return item.id
    }

    deleteItem(id: number) {
        this.tasks = this.tasks.filter((item) => {
            if (item.id === id) return false
            return true
        })
    }

    stopUpload(id: number) {
        this.tasks.forEach((item) => {
            if (item.id === id) {
                item.subscription.unsubscribe()
            }
        })
        this.deleteItem(id)
    }

    uploadFile(url: string, upload: Upload) : Observable<HttpEvent<any>> {

        let formData = new FormData()
        formData.append(name, upload.file, upload.name)

        let params = new HttpParams()
        const options = {
            params: params,
            reportProgress: true,
        }

        function httpRetry(maxRetry: number = 3, delay: number = 30000) {
            return (src: Observable<HttpEvent<any>>) => src.pipe(
                retryWhen((event) => {
                    return interval(delay)
                        .pipe(
                            flatMap((count) => { 
                                if (count === maxRetry) return throwError("Upload was unsuccessful")
                                return of(count)
                            })
                        )
                })
            )
        }

        const req = new HttpRequest('POST', url, formData, options)
        let observer = this.httpClient.request(req).pipe(httpRetry())

        var task: UploadTask = {
            id: -1,
            url: url,
            file: upload.file,
            name: upload.name,
            percent: 0,
            loaded: 0,
            total: upload.file.size,
            status: UploadStatus.start,
            subscription: null
        }

        var id = this.addItem(task)

        let subscription = observer.subscribe(
            (event) => {
                if (event.type == HttpEventType.UploadProgress) {
                    task.percent = Math.round(100 * event.loaded / event.total)
                    task.total = event.total
                    task.loaded = event.loaded
                    task.status = UploadStatus.process
                }
                if (event.type == HttpEventType.Response) {
                    task.percent = 100
                    task.status = UploadStatus.success
                    this.noticesService.sendSuccessMessage(`Upload ${task.name} done`)
                    setTimeout(() => { this.deleteItem(id) }, 700)

                    this.subject.next(upload)

                }
            },
            (err) => {
                    task.status = UploadStatus.fail
                    this.noticesService.sendAlertMessage(`Error when upload ${task.name}`)
            }
        )
        task.subscription = subscription
        return observer
    }
}
