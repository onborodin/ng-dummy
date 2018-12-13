import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { User } from '../models/user.model'

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

    userForm: FormGroup

    @Input() show: boolean = false
    @Input() user: User = {
        id: -1,
        name: '',
        password: '',
        gecos: ''
    }

    @Output() escapeEvent = new EventEmitter<boolean>()

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

    ngOnChanges(changes: SimpleChanges) {
        if (changes['user']) {
            this.userForm = this.formBuilder.group({
                name: [ this.user.name ],
                password: [ this.user.password ],
                gecos: [ this.user.gecos ],
                superuser: [ this.user.superuser ]
            })
        }
    }

    ngOnInit() {
    }
}
