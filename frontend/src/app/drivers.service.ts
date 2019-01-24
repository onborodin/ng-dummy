import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { RPCService, RPCResponce, RPCError } from './rpc.service'

import { Driver, Drivers } from './models/driver.model'
import { UploadService, Upload, Uploads, UploadResult, UploadResults } from './upload.service'
import { DriverFile, DriverFiles } from './models/driver-file.model'

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
        this.setUploadHandler()
    }

    setUploadHandler() {
        this.uploadSubscription = this.uploadService.subject
            .subscribe((upload: Upload) => {
                console.log('#driver service upload', upload)

                this.uploadTasks.forEach((task) => {
                    if (upload === task.upload) {
                        console.log('#driver service: upload task found', task)
                        var driverFile: DriverFile = {
                            driverId: task.driverId,
                            fileId: upload.result[0].id
                        }
                        //var driverId = task.driverId
                        //var fileId = upload.result[0].id
                        //console.log(`#driver service: driverId=${driverId}, fileId=${fileId}`)
                    this.linkFile(driverFile)
                    }
                })
            })
    }

    linkFile(driverFile: DriverFile) {
        this.rpcService
            .request<DriverFile, boolean>('/api/driver-files', 'create', driverFile)
            .subscribe((event) => {
                console.log('driver service: file link result', event)
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


    fileList(driver: Driver) {
        return this.rpcService
            .request<Driver, DriverFiles>('/api/driver-files', 'list', driver)
    }

    addUploadTasks(uploads: Uploads, driverId: number) {

        uploads.forEach((item) => {
            console.log('driver service add upload task', uploads, driverId)
            this.uploadTasks.push({
                upload: item,
                driverId: driverId
            })
            this.uploadService.addUploadTask('/files/upload', item)
        })

    }


}
