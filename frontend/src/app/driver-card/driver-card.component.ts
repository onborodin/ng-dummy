import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators,  ValidationErrors } from '@angular/forms'
import { Subject, Observable } from 'rxjs'

import { fadeAnimation } from '../app.animations'

import { NoticesService } from '../notices.service'
import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { DriversService } from '../drivers.service'
import { Driver } from '../models/driver.model'

import { DriverFile, DriverFiles } from '../models/driver-file.model'

import { Form, Action, Event } from '../drivers/drivers.component'
import { openModal, closeModal } from '../css.utils'

import { Upload, Uploads } from '../upload.service'


declare var $: any

@Component({
    selector: 'driver-card',
    templateUrl: './driver-card.component.html',
    styleUrls: ['./driver-card.component.scss'],
    animations: [ fadeAnimation ]
})
export class DriverCardComponent implements OnInit, OnDestroy {

    @Input() driver: Driver = { id: -1, name: '' }
    @Input() subject: Subject<Event>

    fileList: DriverFiles = []

    private subscription: any

    constructor(
        private formBuilder: FormBuilder,
        private driversService: DriversService,
        private noticesService: NoticesService
    ) {}

    ngOnInit(){
        this.subscription = this.subject.subscribe((event: Event) => {
            if (event.destination == Form.driverCard) {

                if (event.action == Action.open) {
                    this.openForm()
                }

                if (event.action == Action.close) {
                    this.closeForm()
                }
            }
        })
    }

    openForm() {
        openModal('driver-card-modal')
    }

    closeForm() {
        closeModal('driver-card-modal')
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(`#driver card changer`, changes)
        if (changes.driver.currentValue.id > 0) {
            console.log(`#driver card changer`, changes.driver.currentValue.id)
            this.getfileList()
        }
    }

    getfileList() {
        this.driversService
            .fileList(this.driver)
            .subscribe(
                (res: RPCResponce<DriverFiles>) => {
                    this.fileList = res.result
                    console.log(`#driver file list`, this.fileList)
                },
                (err) => {
                    //this.showAlertMessage('Backend error')
                    console.log(err)
                }
            )
    }

    sendFiles(uploads: Uploads, driverId) {
        this.driversService.uploadFiles(uploads, driverId)
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

}
