import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators,  ValidationErrors } from '@angular/forms'
import { state, query, useAnimation, transition, style, trigger, animate, animateChild } from '@angular/animations';

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { UsersService } from '../users.service'
import { User } from '../models/user.model'

import { fadeAnimation } from '../app.animations'

@Component({
    selector: 'user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss'],
    animations: [ fadeAnimation ]
})
export class UserCreateComponent implements OnInit {

    modelForm: FormGroup
    user: User
    alertMessage: string = ''
    message: string = ''

    @Input() show: boolean = false
    @Output() escapeEvent = new EventEmitter<boolean>();
    @Output() successEvent = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService
    ) {}


    formValidator(form: FormGroup) : ValidationErrors | null {
        const name = form.get('name')
        const password = form.get('password')
        const gecos = form.get('gecos')
        if (name.errors || password.errors || gecos.errors) { 
            return { formValidator: true }
        }
        return null
    }

    createForm() {
        this.modelForm = new FormGroup({
            name: new FormControl(),
            password: new FormControl(),
            gecos: new FormControl(),
            superuser: new FormControl(),
        },  { validators: this.formValidator });
    }


    createModel(form) {
        if (this.formValidator(form)) return

        this.user = form.value
        this.usersService
            .create(this.user)
            .subscribe((res: RPCResponce<any>) => {
                if (res.result.rowCount > 0) {
                    this.show = false
                    this.successEvent.emit(true)
                } else {
                    this.show = false
                    this.successEvent.emit(false)
                }
            })
    }

    get name() {
        return this.modelForm.get('name')
    }

    get password() {
        return this.modelForm.get('password')
    }

    get gecos() {
        return this.modelForm.get('gecos')
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
