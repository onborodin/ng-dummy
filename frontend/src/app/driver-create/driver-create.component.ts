import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators,  ValidationErrors } from '@angular/forms'
import { Subject, Observable } from 'rxjs'

import { fadeAnimation } from '../app.animations'

import { NoticesService } from '../notices.service'
import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { DriversService } from '../drivers.service'
import { Driver } from '../models/driver.model'

import { Form, Action, Event } from '../drivers/drivers.component'

declare var $: any

@Component({
    selector: 'driver-create',
    templateUrl: './driver-create.component.html',
    styleUrls: ['./driver-create.component.scss'],
    animations: [ fadeAnimation ]
})
export class DriverCreateComponent implements OnInit, OnDestroy {

    form: FormGroup
    driver: Driver

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
            if (event.destination == Form.createDriver) {
                if (event.action == Action.open) {
                    this.openForm()
                }
                if (event.action == Action.close) {
                    this.closeForm()
                }
            }
        })
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
                name: new FormControl(),
            }, {
                validators: this.formValidator
            });
    }

    openForm() {
        this.openModal('driver-create-modal')
    }

    closeForm() {
        this.closeModal('driver-create-modal')
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

    createDriver(form) {
        if (this.formValidator(form)) return

        this.driver = form.value
        this.driversService
            .create(this.driver)
            .subscribe(
                (res: RPCResponce<any>) => {
                    if (res.result === true) {
                        this.noticesService.sendSuccessMessage('Driver record was created')
                        this.subject.next({
                            destination: Form.listDrivers,
                            action: Action.update
                        })
                        this.closeForm()
                    } else {
                        this.showAlertMessage('Backend problem')
                    }
                },
                (err) => {
                    this.showAlertMessage('Communication problem')
                    console.log(err)
                }
            )
    }

    openModal(name: string) {
        var name = '#' + name
        $(name).modal({
            keyboard: false,
            backdrop: 'static'
        })
        $(name).modal('show')
    }

    closeModal(name: string) {
        var name = '#' + name
        $(name).modal('hide')
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

}
