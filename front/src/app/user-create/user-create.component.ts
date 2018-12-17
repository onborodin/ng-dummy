import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { state, query, useAnimation, transition, style, trigger, animate, animateChild } from '@angular/animations';

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { UsersService } from '../users.service'
import { User } from '../models/user.model'


@Component({
    selector: 'user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss'],
    animations: [
    ]
})
export class UserCreateComponent implements OnInit {

    userForm: FormGroup
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

    create(item) {
        this.user = item.value
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

    escape() {
        this.show = false
        this.escapeEvent.emit(true)
    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            name: [ '' ],
            password: [ '' ],
            gecos: [ '' ],
            superuser: [ false ]
        })
    }
}
