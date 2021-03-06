import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators,  ValidationErrors } from '@angular/forms'
import { Subject, Observable } from 'rxjs'

import { fadeAnimation } from '../app.animations'

import { NoticesService } from '../notices.service'
import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { UsersService } from '../users.service'
import { User } from '../models/user.model'

import { Form, Action, Event } from '../users/users.component'
import { openModal, closeModal } from '../css.utils'

declare var $: any

@Component({
    selector: 'user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss'],
    animations: [ fadeAnimation ]
})
export class UserCreateComponent implements OnInit, OnDestroy {

    form: FormGroup
    user: User

    @Input() subject: Subject<Event>
    private subscription: any

    alertMessage: string = ''

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private noticesService: NoticesService
    ) {}

    ngOnInit(){
        this.createForm()
        this.subscription = this.subject.subscribe((event: Event) => {
            if (event.destination == Form.createUser) {
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
        const password = form.get('password')
        const gecos = form.get('gecos')
        if (name.errors || password.errors || gecos.errors) {
            return { formValidator: true }
        }
        return null
    }

    createForm() {
        this.form = new FormGroup({
                name: new FormControl(),
                password: new FormControl(),
                gecos: new FormControl(),
                superuser: new FormControl(),
            }, {
                validators: this.formValidator
            });
    }

    openForm() {
        openModal('user-create-modal')
    }

    closeForm() {
        closeModal('user-create-modal')
    }

    get name() {
        return this.form.get('name')
    }

    get password() {
        return this.form.get('password')
    }

    get gecos() {
        return this.form.get('gecos')
    }

    showAlertMessage(message: string) {
        this.alertMessage = message
        setTimeout(() => {
            this.alertMessage = ''
        }, 3000)
    }

    createUser(form) {
        if (this.formValidator(form)) return

        this.user = form.value
        this.usersService
            .create(this.user)
            .subscribe(
                (res: RPCResponce<any>) => {
                    if (res.result === true) {
                        this.noticesService.sendSuccessMessage('User record was created ')
                        this.subject.next({
                            destination: Form.listUsers,
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
