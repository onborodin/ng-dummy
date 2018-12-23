import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators,  ValidationErrors } from '@angular/forms'
import { state, query, useAnimation, transition, style, trigger, animate, animateChild } from '@angular/animations';

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { ThingsService } from '../things.service'
import { Thing } from '../models/thing.model'

import { fadeAnimation } from '../app.animations'

@Component({
    selector: 'thing-create',
    templateUrl: './thing-create.component.html',
    styleUrls: ['./thing-create.component.scss'],
    animations: [
        fadeAnimation
//        trigger('fade', [
//            state('void', style({
//                opacity: 0
//            })),
//            transition('void <=> *', animate('0.5s')),
//        ])
    ]

})
export class ThingCreateComponent implements OnInit {

    modelForm: FormGroup
    thing: Thing
    alertMessage: string = ''
    message: string = ''

    @Input() show: boolean = false
    @Output() escapeEvent = new EventEmitter<boolean>();
    @Output() successEvent = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private thingsService: ThingsService
    ) {}


    formValidator(form: FormGroup) : ValidationErrors | null {
        const name = form.get('name')
        if (name.errors) { 
            return { formValidator: true }
        }
        return null
    }

    createForm() {
        this.modelForm = new FormGroup({
            name: new FormControl(),
        },  { validators: this.formValidator });
    }


    createModel(form) {
        if (this.formValidator(form)) return

        this.thing = form.value
        this.thingsService
            .create(this.thing)
            .subscribe((res: RPCResponce<any>) => {
                if (res.result.rowCount > 0) {
                    this.show = false
                    this.successEvent.emit(true)
                    this.createForm()
                } else {
                    this.show = false
                    this.successEvent.emit(false)

                }
            })
    }

    get name() {
        return this.modelForm.get('name')
    }

    escape() {
        this.show = false
        this.escapeEvent.emit(true)
        this.createForm()
    }

    ngOnInit() {
        this.createForm()
    }

}
