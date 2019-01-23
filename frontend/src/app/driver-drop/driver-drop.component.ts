import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators,  ValidationErrors } from '@angular/forms'
import { Subject, Observable } from 'rxjs'

import { fadeAnimation } from '../app.animations'

import { NoticesService } from '../notices.service'
import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { DriversService } from '../drivers.service'
import { Driver } from '../models/driver.model'

import { Form, Action, Event } from '../drivers/drivers.component'
import { openModal, closeModal } from '../css.utils'

declare var $: any

@Component({
    selector: 'driver-drop',
    templateUrl: './driver-drop.component.html',
    styleUrls: ['./driver-drop.component.scss'],
    animations: [ fadeAnimation ]
})
export class DriverDropComponent implements OnInit, OnDestroy {

    form: FormGroup

    @Input() driver: Driver
    @Input() subject: Subject<Event>
    private subscription: any

    alertMessage: string = ''

    constructor(
        private formBuilder: FormBuilder,
        private driversService: DriversService,
        private noticesService: NoticesService
    ) {}


    ngOnInit(){
        this.createForm()
        this.subscription = this.subject.subscribe((event: Event) => {
            if (event.destination == Form.dropDriver) {
                if (event.action == Action.open) {
                    this.openForm()
                }
                if (event.action == Action.close) {
                    this.closeForm()
                }
            }
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['driver']) {
            this.createForm()
        }
    }

    createForm() {
            this.form = new FormGroup({
                id: new FormControl(this.driver.id),
                confirm: new FormControl(false),
            },  { validators: this.formValidator });
    }

    formValidator(form: FormGroup) : ValidationErrors | null {
        const confirm = form.get('confirm')
        if (confirm.errors ) { 
            return { formValidator: true }
        }
        return null
    }

    openForm() {
        openModal('driver-drop-modal')
    }

    closeForm() {
        closeModal('driver-drop-modal')
    }

    get confirm() {
        return this.form.get('confirm')
    }


    dropDriver(form) {
        if (this.formValidator(form)) return

        this.driver = form.value
        this.driversService
            .drop(this.driver)
            .subscribe(
                (res: RPCResponce<any>) => {
                    if (res.result === true) {
                        this.subject.next({
                            destination: Form.listDrivers,
                            action: Action.update
                        })
                        this.noticesService.sendSuccessMessage('Driver record was deleted')
                        this.closeForm()
                    } else {
                        this.showAlertMessage('Backend problem')
                    }
                },
                (error) => {
                    this.showAlertMessage('Communication problem')
                }
            )
    }

    showAlertMessage(message: string) {
        this.alertMessage = message
        setTimeout(() => {
            this.alertMessage = ''
        }, 5000)
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
