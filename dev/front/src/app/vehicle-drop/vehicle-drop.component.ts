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
    selector: 'vehicle-drop',
    templateUrl: './vehicle-drop.component.html',
    styleUrls: ['./vehicle-drop.component.scss'],
    animations: [ fadeAnimation ]
})
export class VehicleDropComponent implements OnInit, OnDestroy {

    form: FormGroup

    @Input() vehicle: Vehicle
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
            if (event.destination == Form.dropVehicle) {
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
        if (changes['vehicle']) {
            this.createForm()
        }
    }

    createForm() {
            this.form = new FormGroup({
                id: new FormControl(this.vehicle.id),
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
        this.openModal('vehicle-drop-modal')
    }

    closeForm() {
        this.closeModal('vehicle-drop-modal')
    }

    get confirm() {
        return this.form.get('confirm')
    }


    dropVehicle(form) {
        if (this.formValidator(form)) return

        this.vehicle = form.value
        this.vehiclesService
            .drop(this.vehicle)
            .subscribe(
                (res: RPCResponce<any>) => {
                    if (res.result === true) {
                        this.subject.next({
                            destination: Form.listVehicles,
                            action: Action.update
                        })
                        this.noticesService.sendSuccessMessage('Vehicle record was deleted')
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
