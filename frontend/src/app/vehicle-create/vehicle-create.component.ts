import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators,  ValidationErrors } from '@angular/forms'
import { Subject, Observable } from 'rxjs'

import { fadeAnimation } from '../app.animations'

import { NoticesService } from '../notices.service'
import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { VehiclesService } from '../vehicles.service'
import { Vehicle } from '../models/vehicle.model'

import { Form, Action, Event } from '../vehicles/vehicles.component'
import { openModal, closeModal } from '../css.utils'

declare var $: any

@Component({
    selector: 'vehicle-create',
    templateUrl: './vehicle-create.component.html',
    styleUrls: ['./vehicle-create.component.scss'],
    animations: [ fadeAnimation ]
})
export class VehicleCreateComponent implements OnInit, OnDestroy {

    form: FormGroup
    vehicle: Vehicle

    @Input() subject: Subject<Event>
    private subscription: any

    alertMessage: string = ''

    constructor(
        private formBuilder: FormBuilder,
        private vehiclesService: VehiclesService,
        private noticesService: NoticesService
    ) {}

    ngOnInit(){
        this.createForm()
        this.subscription = this.subject.subscribe((event: Event) => {
            if (event.destination == Form.createVehicle) {
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
        openModal('vehicle-create-modal')
    }

    closeForm() {
        closeModal('vehicle-create-modal')
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

    createVehicle(form) {
        if (this.formValidator(form)) return

        this.vehicle = form.value
        this.vehiclesService
            .create(this.vehicle)
            .subscribe(
                (res: RPCResponce<any>) => {
                    if (res.result === true) {
                        this.noticesService.sendSuccessMessage('Vehicle record was created')
                        this.subject.next({
                            destination: Form.listVehicles,
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

    ngOnChanges(changes: SimpleChanges) {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

}
