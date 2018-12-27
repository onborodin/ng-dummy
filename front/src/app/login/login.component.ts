import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router } from "@angular/router"

import { LoginService } from '../login.service'
import { rotateAnimation } from '../app.animations'

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ],
    animations: [ rotateAnimation ]

})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup

    preMessage: string = ''
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

    ngOnInit() {
        this.loginService.cleanLogin()
        this.preMessage = this.loginService.returnMessage
        //this.attemptCounter = 0
        this.loginForm = this.formBuilder.group({
            name: [ 'qwerty' ],
            password: [ '12345' ]
        })

        this.loginService.loginSubject
            .subscribe((authState) => {
                this.attemptCounter++

                if (authState) {
                    this.message = 'Login successful'
                    setTimeout(() => { 
                        this.router.navigate([ this.loginService.returnUrl ]) 
                    }, 1000)
                } else {
                    this.attemptCounter++
                    this.message = 'Login incorrect'
                }
            })
    }

    ngOnDestroy() {
    }
}
