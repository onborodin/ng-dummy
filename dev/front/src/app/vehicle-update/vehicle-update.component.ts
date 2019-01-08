import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators,  ValidationErrors } from '@angular/forms'
import { Subject, Observable } from 'rxjs'

import { fadeAnimation } from '../app.animations'

import { NoticesService } from '../notices.service'
import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { VehiclesService } from '../vehicles.service'
import { Vehicle } from '../models/vehicle.model'

import { Form, Action, Event } from '../vehicles/vehicles.component'

declare var $: any

@Component({
    selector: 'vehicle-update',
    templateUrl: './vehicle-update.component.html',
    styleUrls: ['./vehicle-update.component.scss'],
    animations: [ fadeAnimation ]
})
export class VehicleUpdateComponent implements OnInit, OnDestroy {

    form: FormGroup

    @Input() vehicle: Vehicle = { id: -1, name: '' }
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
            if (event.destination == Form.updateVehicle) {
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
        if (changes['vehicle']) {
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
                id: new FormControl(this.vehicle.id),
                name: new FormControl(this.vehicle.name),
            }, {
                validators: this.formValidator
            });
    }

    openForm() {
        this.openModal('vehicle-update-modal')
    }

    closeForm() {
        this.closeModal('vehicle-update-modal')
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

    updateVehicle(form) {
        if (this.formValidator(form)) return

        this.vehicle = form.value
        this.vehiclesService
            .update(this.vehicle)
            .subscribe(
                (res: RPCResponce<any>) => {
                    if (res.result === true) {
                        this.noticesService.sendSuccessMessage('Vehicle record was updated ')
                        this.subject.next({
                            destination: Form.listVehicles,
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

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }

}
