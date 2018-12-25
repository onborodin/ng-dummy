import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms'

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { ThingsService } from '../things.service'
import { Thing } from '../models/thing.model'

import { fadeAnimation } from '../app.animations'


@Component({
  selector: 'thing-drop',
  templateUrl: './thing-drop.component.html',
  styleUrls: ['./thing-drop.component.scss'],
    animations: [ fadeAnimation ]
})
export class ThingDropComponent implements OnInit {

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

    escape() {
        this.show = false
        this.escapeEvent.emit(true)
    }

    get confirm() {
        return this.modelForm.get('confirm')
    }

    dropModel(form) {

        if (this.formValidator(form)) return

        this.thing = form.value
        this.thingsService
            .drop(this.thing)
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

    formValidator(form: FormGroup) : ValidationErrors | null {
        const confirm = form.get('confirm')
        if (confirm.errors ) { 
            return { formValidator: true }
        }
        return null
    }


    createForm() {
            this.modelForm = new FormGroup({
                id: new FormControl(this.thing.id),
                confirm: new FormControl(false),
            },  { validators: this.formValidator });
    }



    ngOnChanges(changes: SimpleChanges) {
        if (changes['thing']) {
            this.createForm()
        }
    }

    ngOnInit() {
    }
}
