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

import { UploadService, Upload, Uploads, UploadResult, UploadResults } from '../upload.service'

declare var $: any

@Component({
    selector: 'driver-card',
    templateUrl: './driver-card.component.html',
    styleUrls: ['./driver-card.component.scss'],
    animations: [ fadeAnimation ]
})
export class DriverCardComponent implements OnInit, OnChanges, OnDestroy {

    @Input() driver: Driver = { id: -1, name: '' }
    @Input() subject: Subject<Event>

    fileList: DriverFiles = []

    private subscription: any
    private uploadSubscription: any

    constructor(
        private formBuilder: FormBuilder,
        private driversService: DriversService,
        private noticesService: NoticesService,
        public uploadService: UploadService,
    ) {
        this.uploadSubscription = this.uploadService.subject
            .subscribe((upload: Upload) => {
                console.log('#drive card: received upload sergvice event')
                setTimeout(() => { this.getfileList() }, 700)
            })
    }

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
        this.getfileList()
    }

    closeForm() {
        closeModal('driver-card-modal')
        this.fileList = []
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(`#driver card changer`, changes)
            this.getfileList()

        if (changes.driver.currentValue.id > 0) {
            console.log(`#driver card changer`, changes.driver.currentValue.id)
        }
    }

    getfileList() {
        this.fileList = []
        this.driversService
            .fileList(this.driver)
            .subscribe(
                (res: RPCResponce<DriverFiles>) => {
                    this.fileList = res.result
                    console.log(`#driver card: got file list`, this.fileList)
                },
                (err) => {
                    //this.showAlertMessage('Backend error')
                    console.log(err)
                }
            )
    }

    addUploadTasks(uploads: Uploads) {
        console.log('#driver card add upload tasks', uploads, this.driver.id)
        this.driversService.addUploadTasks(uploads, this.driver.id)
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
