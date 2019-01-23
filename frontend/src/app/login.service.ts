import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Subject, BehaviorSubject, Observable, Subscription, interval } from 'rxjs'

import * as Cookies from 'es-cookie'

import { RPCService } from './rpc.service'
import { NoticesService } from './notices.service'

import { User } from './models/user.model'

declare var $: any

export enum AccessLevel {
    guest = 1,
    user = 2,
    superuser = 3
}

@Injectable({ 
    providedIn: 'root' 
})
export class LoginService {

    userProfile: User = { 
        id: -1,
        name: '',
        superuser: false,
        gecos: ''
    }

    cookieName = 'session'
    returnUrl: string = '/'
    reasonMessage: string = ''

    returnUrlSubject: BehaviorSubject<string>

    isAuth: boolean = false
    //accessLevel: AccessLevel = AccessLevel.guest

    authSubject: BehaviorSubject<boolean>
    loginSubject: Subject<boolean>

    constructor(
        private router: Router,
        private rpc: RPCService,
        public noticesService: NoticesService,
    ) {

        this.returnUrlSubject = new BehaviorSubject<string>('/')
        this.authSubject = new BehaviorSubject<boolean>(false)
        this.loginSubject = new Subject<boolean>()

        interval(1000).subscribe((value) => {
            if (this.isAuth && !Cookies.get(this.cookieName)) {
                //this.noticesService.sendAlertMessage('Your session expired! Please login with your account.')
                this.isAuth = false
                Cookies.remove(this.cookieName)
                $('.modal').modal('hide')

                this.reasonMessage = 'Your session expired'
                this.router.navigate(['/login'])
            }
        })

        router.events.subscribe((event: any) => { 
            if (event['id'] && event['urlAfterRedirects']) {
                if (event.url !== '/login') {
                    this.returnUrl = event.urlAfterRedirects
                }
            }
        })

    }

    checkLogin(name: string, password: string)  {
        let params: User = {
            name: name,
            password: password,
            id: -1
        }

        this.rpc.request<User, User>('/api/login', 'login', params)
            .subscribe(
                (res) => {
                    if (res.result.id >= 0) {
                        console.log(`#login service result id ${res.result.id}`)
                        this.userProfile.id = res.result.id
                        this.userProfile.superuser = res.result.superuser
                        this.userProfile.gecos = res.result.gecos
                        this.userProfile.name = res.result.name
                        this.isAuth = true
                        this.reasonMessage = ''
                        this.loginSubject.next(true)
                        this.authSubject.next(true)
                    } else {
                        this.isAuth = false
                        this.loginSubject.next(false)
                        this.authSubject.next(false)
                    }
                },
                (err) => {
                    this.noticesService.sendAlertMessage('Backend communication problem')
                })
    }

    cleanLogin() {
        Cookies.remove(this.cookieName)
        this.isAuth = false
        this.userProfile = { 
            id: -1,
            name: '',
            superuser: false,
            gecos: ''
        }
        this.authSubject.next(false)
    }

    accessLevel() : AccessLevel {

        console.log(`#login service cookie ${this.cookieName} = ${Cookies.get(this.cookieName)}`)
        console.log(`#login service is auth ${this.isAuth}`)

        if (this.isAuth && Cookies.get(this.cookieName) && this.userProfile.superuser) {
            return AccessLevel.superuser
        }
        if (this.isAuth && Cookies.get(this.cookieName) && !this.userProfile.superuser) {
            return AccessLevel.user
        }
        return AccessLevel.guest
    }

}
