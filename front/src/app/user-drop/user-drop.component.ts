import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { UsersService } from '../users.service'
import { User } from '../models/user.model'

@Component({
  selector: 'user-drop',
  templateUrl: './user-drop.component.html',
  styleUrls: ['./user-drop.component.scss']
})
export class UserDropComponent implements OnInit {

    userForm: FormGroup
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

    create(item) {
        this.user = item.value
    }

    escape() {
        this.show = false
        this.escapeEvent.emit(true)
    }

    update(item) {
        this.user = item.value
                this.usersService
                    .drop(this.user)
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

    ngOnChanges(changes: SimpleChanges) {
        if (changes['user']) {
            this.userForm = this.formBuilder.group({
                id: [ this.user.id ],
            })
        }
    }

    ngOnInit() {
    }
}
