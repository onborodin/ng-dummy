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
    selector: 'driver-update',
    templateUrl: './driver-update.component.html',
    styleUrls: ['./driver-update.component.scss'],
    animations: [ fadeAnimation ]
})
export class DriverUpdateComponent implements OnInit, OnDestroy {

    form: FormGroup

    @Input() driver: Driver = { id: -1, name: '' }
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
            if (event.destination == Form.updateDriver) {
                if (event.action == Action.open) {
                    this.createForm()
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


    formValidator(form: FormGroup) : ValidationErrors | null {
        const name = form.get('name')
        if (name.errors) {
            return { formValidator: true }
        }
        return null
    }

    createForm() {
        this.form = new FormGroup({
                id: new FormControl(this.driver.id),
                name: new FormControl(this.driver.name),
            }, {
                validators: this.formValidator
            });
    }

    openForm() {
        openModal('driver-update-modal')
    }

    closeForm() {
        closeModal('driver-update-modal')
    }

    get name() {
        return this.form.get('name')
    }


    showAlertMessage(message: string) {
        this.alertMessage = message
        setTimeout(() => {
            this.alertMessage = ''
        }, 3000)
    }

    updateDriver(form) {
        if (this.formValidator(form)) return

        this.driver = form.value
        this.driversService
            .update(this.driver)
            .subscribe(
                (res: RPCResponce<any>) => {
                    if (res.result === true) {
                        this.noticesService.sendSuccessMessage('Driver record was updated ')
                        this.subject.next({
                            destination: Form.listDrivers,
                            action: Action.update
                        })
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

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

}
