import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http'
import { Observable } from "rxjs"

import { throwError, timer, interval, of } from 'rxjs'
import { timeout, retry, retryWhen, take, concat, share, delayWhen, flatMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UploadService {

    constructor(private httpClient: HttpClient) {}

    uploadFile(url: string, file: File, name: string) : Observable<HttpEvent<any>> {
        let formData = new FormData()
        formData.append(name, file, name)

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
            return this.httpClient.request(req)
                .pipe(httpRetry())

    }
}
