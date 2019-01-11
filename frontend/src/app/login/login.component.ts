import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router } from "@angular/router"

import { LoginService } from '../login.service'
import { rotateAnimation, fadeAnimation } from '../app.animations'

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
    animations: [ rotateAnimation, fadeAnimation ]

})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup

    reasonMessage: string = ''
    alertMessage: string = ''
    message: string = ''
    attemptCounter: number = 0
    debug: string = ''

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router
    ) {}


    login(event) {
        this.loginService.checkLogin(event.value.name, event.value.password)
    }

    home() {
        this.router.navigate([ '/' ])
    }

    showAlertMessage(message: string) {
        this.alertMessage = message
        setTimeout(() => {
            this.alertMessage = ''
        }, 3000)
    }


    ngOnInit() {
        this.loginService.cleanLogin()
        this.reasonMessage = this.loginService.reasonMessage
        this.loginForm = this.formBuilder.group({
            name: [ 'qwerty' ],
            password: [ '12345' ]
        })

        this.loginService.loginSubject
            .subscribe(
                (authState) => {
                    if (authState) {
                        this.attemptCounter = 0
                        this.message = 'Login successful'
                        setTimeout(() => {
                            this.router.navigate([ this.loginService.returnUrl ])
                        }, 300)
                    } else {
                        this.attemptCounter++
                        this.message = 'Login incorrect'
                    }
                }
            )
    }

    ngOnDestroy() {
    }
}
