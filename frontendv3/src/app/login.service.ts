import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

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

    loginState: boolean = false
    user: User = { 
        id: -1,
        name: '',
        superuser: false,
        gecos: ''
    }

    constructor(
        private router: Router,
        private rpc: RPCService
    ) {}

    login(name: string, password: string) : boolean {
        let params : User = {
            name: name,
            password: password,
            id: -1
        }

        this.rpc.request<User, User[]>('/api/login', 'login', params)
            .subscribe((res) => {
                if (res.result[0].id >= 0) {
                    this.loginState = true

                    this.user.id = res.result[0].id
                    this.user.superuser = res.result[0].superuser
                    this.user.gecos = res.result[0].gecos
                    this.router.navigate(['/domains'])
                }
            })
        if (this.user.id >= 0) return true
        return false
    }

    logout() {
        this.loginState = false
        this.router.navigate(['/'])
    }

    checkLogin() {
        if (!this.loginState) {
            this.router.navigate(['/login'])
        }
    }
}
