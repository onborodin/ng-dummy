import { Injectable, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import * as Cookies from 'es-cookie'

import { RPCService } from './rpc.service'

import { User } from './models/user.model'

export interface UserLogin {
    name: string
    password: string
}

//export enum AccessLevel { Superuser = 'superuser', User = 'user' }

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    cookieName = 'session'
    returnUrl: string = '/'
    cookieController: any

    loginState: boolean = false
    user: User = { 
        id: -1,
        name: '',
        superuser: false,
        gecos: ''
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private rpc: RPCService
    ) {}


    isLogin() : boolean {
        if (Cookies.get(this.cookieName)) {
            return true
        }
        return false
    }

    isUser() : boolean {
        return this.isLogin()
    }

    isSuperuser() : boolean {
        if (this.isLogin() && this.user.superuser) {
            return true
        }
        return false
    }

    login(name: string, password: string) : boolean {
        let params : User = {
            name: name,
            password: password,
            id: -1
        }

        this.rpc.request<User, User[]>('/api/login', 'login', params)
            .subscribe((res) => {
                if (res.result[0].id >= 0) {

                    this.user.id = res.result[0].id
                    this.user.superuser = res.result[0].superuser
                    this.user.gecos = res.result[0].gecos
                    var theThis = this
                    this.cookieController = setInterval(function() {
                        //console.log('#check cookie ' + theThis.cookieName)
                        if (theThis.isLogin() && !Cookies.get(theThis.cookieName)) {
                            theThis.logout()
                        }
                    }, 1000)

                    this.router.navigate([ this.returnUrl ])
                }
            })
        if (this.user.id >= 0) return true
        return false
    }

    logout() {
        Cookies.remove(this.cookieName)
        this.router.navigate(['/'])
    }

    ngOnInit() {
    }

}
