import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms'


import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { ThingsService } from '../things.service'
import { Thing } from '../models/thing.model'

import { fadeAnimation } from '../app.animations'

@Component({
    selector: 'thing-update',
    templateUrl: './thing-update.component.html',
    styleUrls: ['./thing-update.component.scss'],
    animations: [ fadeAnimation ]
})
export class ThingUpdateComponent implements OnInit {

    modelForm: FormGroup
    alertMessage: string = ''
    message: string = ''

    @Input() show: boolean = false
    @Input() thing: Thing = {
        id: -1,
        name: '',
    }

    @Output() escapeEvent = new EventEmitter<boolean>();
    @Output() successEvent = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private thingsService: ThingsService

    ) {}

    create(item) {
        this.thing = item.value
    }

    escape() {
        this.show = false
        this.escapeEvent.emit(true)
    }

    formValidator(form: FormGroup) : ValidationErrors | null {
        const name = form.get('name')

        if (name.errors) { 
            return { formValidator: true }
        }
        return null
    }


    updateModel(form) {

        if (this.formValidator(form)) return

        this.thing = form.value
        this.thingsService
            .update(this.thing)
            .subscribe((res: RPCResponce<any>) => {
                if (res.result > 0) {
                    this.show = false
                    this.successEvent.emit(true)
                } else {
                    this.show = false
                    this.successEvent.emit(false)
                }
            })
    }

    createForm() {
            this.modelForm = new FormGroup({
                id: new FormControl(this.thing.id),
                name: new FormControl(this.thing.name),
            },  { validators: this.formValidator });
    }

    get name() {
        return this.modelForm.get('name')
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['thing']) {
            this.createForm()
        }
    }

    ngOnInit() {
    }
}
