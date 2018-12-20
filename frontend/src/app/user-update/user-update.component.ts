import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms'


import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { UsersService } from '../users.service'
import { User } from '../models/user.model'

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

    modelForm: FormGroup
    alertMessage: string = ''
    message: string = ''

    @Input() show: boolean = false
    @Input() user: User = {
        id: -1,
        name: '',
        password: '',
        gecos: '',
        superuser: false
    }

    @Output() escapeEvent = new EventEmitter<boolean>();
    @Output() successEvent = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService

    ) {}

    create(item) {
        this.user = item.value
    }

    escape() {
        this.show = false
        this.escapeEvent.emit(true)
    }

    formValidator(form: FormGroup) : ValidationErrors | null {
        const name = form.get('name')
        const password = form.get('password')
        const gecos = form.get('gecos')

        if (name.errors || password.errors || gecos.errors) { 
            return { formValidator: true }
        }
        return null
    }


    updateModel(form) {

        if (this.formValidator(form)) return

        this.user = form.value
        this.usersService
            .update(this.user)
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
                id: new FormControl(this.user.id),
                name: new FormControl(this.user.name),
                password: new FormControl(this.user.password),
                gecos: new FormControl(this.user.gecos),
                superuser: new FormControl(this.user.superuser),
            },  { validators: this.formValidator });
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


    ngOnChanges(changes: SimpleChanges) {
        if (changes['user']) {
            this.createForm()
        }
    }


    ngOnInit() {
    }
}
