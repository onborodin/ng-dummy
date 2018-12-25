import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms'

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { UsersService } from '../users.service'
import { User } from '../models/user.model'

import { fadeAnimation } from '../app.animations'


@Component({
    selector: 'user-drop',
    templateUrl: './user-drop.component.html',
    styleUrls: ['./user-drop.component.scss'],
    animations: [ fadeAnimation ]

})
export class UserDropComponent implements OnInit {

    modelForm: FormGroup
    alertMessage: string = ''
    message: string = ''

    @Input() show: boolean = false
    @Input() user: User = {
        id: -1,
        name: '',
        password: '',
        gecos: ''
    }

    @Output() escapeEvent = new EventEmitter<boolean>();
    @Output() successEvent = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService

    ) {}

    //create(item) {
    //    this.user = item.value
    //}

    escape() {
        this.show = false
        this.escapeEvent.emit(true)
    }

    get confirm() {
        return this.modelForm.get('confirm')
    }

    dropModel(form) {

        if (this.formValidator(form)) return

        this.user = form.value
        this.usersService
            .drop(this.user)
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
                id: new FormControl(this.user.id),
                confirm: new FormControl(false),
            },  { validators: this.formValidator });
    }



    ngOnChanges(changes: SimpleChanges) {
        if (changes['user']) {
            this.createForm()
        }
    }

    ngOnInit() {
    }
}
