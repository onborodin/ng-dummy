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
    selector: 'user-drop',
    templateUrl: './user-drop.component.html',
    styleUrls: ['./user-drop.component.scss'],
    animations: [ fadeAnimation ]
})
export class UserDropComponent implements OnInit, OnDestroy {

    form: FormGroup

    @Input() user: User
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
            if (event.destination == Form.dropUser) {
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
        if (changes['user']) {
            this.createForm()
        }
    }

    createForm() {
            this.form = new FormGroup({
                id: new FormControl(this.user.id),
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
        this.openModal('user-drop-modal')
    }

    closeForm() {
        this.closeModal('user-drop-modal')
    }

    get confirm() {
        return this.form.get('confirm')
    }


    dropUser(form) {
        if (this.formValidator(form)) return

        this.user = form.value
        this.usersService
            .drop(this.user)
            .subscribe(
                (res: RPCResponce<any>) => {
                    if (res.result === true) {
                        this.subject.next({
                            destination: Form.listUsers,
                            action: Action.update
                        })
                        this.noticesService.sendSuccessMessage('User was deleted')
                        this.closeForm()
                    } else {
                        this.showAlertMessage('User was not deleted')
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
