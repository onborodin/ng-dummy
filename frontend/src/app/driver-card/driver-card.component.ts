import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core'
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
    selector: 'driver-card',
    templateUrl: './driver-card.component.html',
    styleUrls: ['./driver-card.component.scss'],
    animations: [ fadeAnimation ]
})
export class DriverCardComponent implements OnInit, OnDestroy {


    @Input() driver: Driver = { id: -1, name: '' }
    @Input() subject: Subject<Event>

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
        this.openModal('driver-card-modal')
    }

    closeForm() {
        this.closeModal('driver-card-modal')
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
