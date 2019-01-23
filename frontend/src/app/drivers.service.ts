import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { RPCService, RPCResponce, RPCError } from './rpc.service'

import { Driver, Drivers } from './models/driver.model'
import { UploadService, Upload, Uploads } from './upload.service'
import { DriverFile, DriverFiles } from './models/driver-file.model'

interface UploadTask {
    upload: Upload
    driverId: number
}

type UploadTasks = UploadTask[]

interface DriverFileLink {
    id?: number
    driverId?: number
    fileId?: number
}

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

        this.uploadSubscription = this.uploadService.subject.subscribe((upload: Upload) => {
            console.log('#driver service upload', upload)
            this.uploadTasks.forEach((task) => {
                if (upload === task.upload) {
                    console.log('#upload task found', task)
                }
            })
            //this.linkFile(fileId, driverId)
        })

    }

    list() {
        return this.rpcService
            .request<any, Drivers>('/api/drivers', 'list', {})
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
            .request<Driver, DriverFiles>('/api/driver-files', 'list', driver)
    }

    linkFile(fileId : number, driverId: number) {
        var driverFile: DriverFile = {
            driverId: driverId,
            fileId: fileId
        }
        //return this.rpcService
        //    .request<DriverFile, boolean>('/api/driver-files', 'create', )
    }

    //unlinkFile() {
    //}

    fileList(driver: Driver) {
        return this.rpcService
            .request<Driver, DriverFiles>('/api/driver-files', 'list', driver)
    }

    uploadFiles(uploads: Uploads, driverId: number) {
        uploads.forEach((item) => {
            this.uploadTasks.push({ upload: item, driverId: driverId })
            this.uploadService.uploadFile('/files/upload', item)
        })

    }


}
