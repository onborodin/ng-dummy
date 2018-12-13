import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { User } from '../models/user.model'


@Component({
  selector: 'user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

    userForm: FormGroup
    user: User

    @Input() show: boolean = false
    @Output() escapeEvent = new EventEmitter<boolean>();

    constructor(
        private formBuilder: FormBuilder,
    ) {}

    create(item) {
        this.user = item.value
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
