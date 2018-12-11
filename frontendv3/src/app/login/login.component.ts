import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

import { LoginService } from '../login.service'

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup
    message: string = ''
    attemptCount: number = 0

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService
    ) {}

    login(event) {
        if (this.loginService.login(event.value.name, event.value.password)) {
            this.message = `Wow! Login successful`
            return
        }
        this.attemptCount++
        this.message = `Login incorrect. Attempt ${this.attemptCount}`
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            name: [ '' ],
            password: [ '' ]
        })
    }
}
