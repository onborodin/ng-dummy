import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

import { LoginService } from '../login.service'

import { fadeAnimation } from '../app.animations'


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
    animations: [ fadeAnimation ]

})
export class LoginComponent implements OnInit {

    loginForm: FormGroup
    message: string = ''
    attemptCount: number = 0
    debug: string = ''

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService
    ) {}

    login(event) {
        if (this.loginService.login(event.value.name, event.value.password)) {
            this.message = `Wow! Login successful`
            return
        }
        setTimeout(() => {
            this.attemptCount++
            this.message = `Login incorrect. Attempt ${this.attemptCount}`
        }, 1000 )

    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            name: [ '' ],
            password: [ '' ]
        })
    }
}
