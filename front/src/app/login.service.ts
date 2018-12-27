import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Subject, BehaviorSubject } from 'rxjs'

import * as Cookies from 'es-cookie'

import { RPCService } from './rpc.service'
import { User } from './models/user.model'


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
        private rpc: RPCService
    ) {

        this.returnUrlSubject = new BehaviorSubject<string>('/')
        this.authSubject = new BehaviorSubject<boolean>(false)
        this.loginSubject = new Subject<boolean>()
    }

    checkLogin(name: string, password: string)  {
        let params: User = {
            name: name,
            password: password,
            id: -1
        }

        this.rpc.request<User, User>('/api/login', 'login', params)
            .subscribe((res) => {
            if (res.result.id >= 0) {
                this.userProfile.id = res.result.id
                this.userProfile.superuser = res.result.superuser
                this.userProfile.gecos = res.result.gecos
                this.userProfile.name = res.result.name
                this.isAuth = true
                this.loginSubject.next(true)
                this.authSubject.next(true)
            } else {
                this.isAuth = false
                this.loginSubject.next(false)
                this.authSubject.next(false)
            }
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
        if (this.isAuth && Cookies.get(this.cookieName) && this.userProfile.superuser) {
            return AccessLevel.superuser
        }
        if (this.isAuth && Cookies.get(this.cookieName) && !this.userProfile.superuser) {
            return AccessLevel.user
        }
        return AccessLevel.guest
    }

    //isGuest() {
    //    if (this.isAuth) return false
    //    return true
    //}

    //isUser() {
    //    if (this.isAuth && Cookies.get(this.cookieName) && !this.userProfile.superuser) return true
    //    return false
    //}

    //isSuperuser() {
    //    if (this.isAuth && this.userProfile.superuser && Cookies.get(this.cookieName)) return true
    //    return false
    //}

}
