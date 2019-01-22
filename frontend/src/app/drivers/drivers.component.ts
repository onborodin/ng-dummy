import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subject, Observable } from 'rxjs'

import { fadeAnimation } from '../app.animations'

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { DriversService } from '../drivers.service'
import { Driver, Drivers } from '../models/driver.model'

import { Upload, Uploads } from '../upload.service'

export enum Form {
    all = 0,
    createDriver = 1,
    updateDriver = 2,
    dropDriver = 3,
    listDrivers = 4,
    driverCard = 5
}

export enum Action {
    closeAll = 0,
    open = 1,
    close = 2,
    update = 3
}

export interface Event {
    destination: Form
    action: Action
}

@Component({
    selector: 'drivers',
    templateUrl: './drivers.component.html',
    styleUrls: [ './drivers.component.scss' ],
    animations: [ fadeAnimation ]
})
export class DriversComponent implements OnInit {

    drivers: Driver[] = []
    driver: Driver = { id: -1, name: '' }
    timestamp: Date
    alertMessage: string = ''

    search: string = ''

    subject: Subject<Event>
    subscription: any

    firstElem: number = 0
    pageSize: number = 5
    listLength: number = 0

    changePageSize(size: number) {
        this.pageSize = size
    }

    changePage(eventData) {
        this.firstElem = eventData
    }

    constructor(
        private driversService: DriversService,
    ) {
        this.subject = new Subject<Event>()
        this.subscription = this.subject.subscribe((event: Event) => {
            if (event.destination == Form.listDrivers) {
                if (event.action == Action.update) {
                    this.getList()
                }
            }
        })
    }

    showAlertMessage(message: string) {
        this.alertMessage = message
        setTimeout(() => {
            this.alertMessage = ''
        }, 3000)
    }


    createDriver() {
        this.subject.next({ 
            destination: Form.createDriver,
            action: Action.open 
        })
    }

    dropDriver(driver) {
        this.driver = driver
        this.subject.next({ 
            destination: Form.dropDriver,
            action: Action.open
        })
    }

    updateDriver(driver) {
        this.driver = driver
        this.subject.next({ 
            destination: Form.updateDriver,
            action: Action.open
        })
    }

    getList() {
        this.driversService
            .list()
            .subscribe(
                (res: RPCResponce<Driver[]>) => {
                    this.drivers = res.result
                    this.timestamp = new Date()
                },
                (err) => {
                    this.showAlertMessage('Backend error')
                    console.log(err)
                }
            )
    }

    sendFiles(uploads: Uploads, driverId: number = -1) {
        this.driversService.uploadFiles(uploads, driverId)
    }

    ngOnInit() {
        this.getList()
    }
}
