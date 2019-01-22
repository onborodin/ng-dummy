import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { RPCService, RPCResponce, RPCError } from './rpc.service'

import { Driver } from './models/driver.model'
import { UploadService, Upload, Uploads } from './upload.service'

interface UploadTask {
    upload: Upload
    driverId: number
}

type UploadTasks = UploadTask[]

@Injectable({
  providedIn: 'root'
})
export class DriversService {

    uploadSubscription: any

    uploadTasks: UploadTasks = []

    constructor(
        private rpcService: RPCService,
        public uploadService: UploadService,
    ) {

        this.uploadSubscription = this.uploadService.subject.subscribe((event: Upload) => {
            console.log('#driver servcie upload', event)
            //this.linkFile(fileId, driverId)

        })

    }

    list() {
        return this.rpcService
            .request<any, Driver[]>('/api/drivers', 'list', {})
    }

    create(driver: Driver) {
        return this.rpcService
            .request<Driver, number>('/api/drivers', 'create', driver)
    }

    update(driver: Driver) {
        return this.rpcService
            .request<Driver, number>('/api/drivers', 'update', driver)
    }

    drop(driver: Driver) {
        return this.rpcService
            .request<Driver, number>('/api/drivers', 'drop', driver)
    }

    //linkFile() {
    //}

    //unlinkFile() {
    //}

    uploadFiles(uploads: Uploads, driverId: number) {
        uploads.forEach((item) => {
            this.uploadTasks.push({ upload: item, driverId: driverId })
            this.uploadService.uploadFile('/files/upload', item)
        })

    }


}
