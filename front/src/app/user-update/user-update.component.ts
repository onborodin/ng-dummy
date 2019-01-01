import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators,  ValidationErrors } from '@angular/forms'
import { Subject, Observable } from 'rxjs'

import { fadeAnimation } from '../app.animations'

import { NoticesService } from '../notices.service'
import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { UsersService } from '../users.service'
import { User } from '../models/user.model'

import { Form, Action, Event } from '../users/users.component'

declare var $: any

@Component({
    selector: 'user-update',
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.scss'],
    animations: [ fadeAnimation ]
})
export class UserUpdateComponent implements OnInit, OnDestroy {

    form: FormGroup

    @Input() user: User = { id: -1, password: '', name: 'xxx', gecos: 'xxx' }
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
            if (event.destination == Form.updateUser) {
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
        if (changes['user']) {
            this.createForm()
        }
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
                id: new FormControl(this.user.id),
                name: new FormControl(this.user.name),
                password: new FormControl(this.user.password),
                gecos: new FormControl(this.user.gecos),
                superuser: new FormControl(this.user.superuser),
            }, {
                validators: this.formValidator
            });
    }

    openForm() {
        this.openModal('user-update-modal')
    }

    closeForm() {
        this.closeModal('user-update-modal')
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

    updateUser(form) {
        if (this.formValidator(form)) return

        this.user = form.value
        this.usersService
            .update(this.user)
            .subscribe(
                (res: RPCResponce<any>) => {
                    if (res.result === true) {
                        this.noticesService.sendSuccessMessage('User was updated ')
                        this.subject.next({
                            destination: Form.listUsers,
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
