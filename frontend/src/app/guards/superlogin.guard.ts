import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"

import * as Cookies from 'es-cookie'

import { LoginService } from '../login.service'


@Injectable()
export class SuperloginGuard implements CanActivate {

    cookieName: string = 'session'

    constructor(
        private loginService: LoginService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) : Observable<boolean> | boolean {

        if (this.loginService.isSuperuser()) {
            return true
        }
        this.loginService.returnUrl = state.url
        this.router.navigate(['/login'])
        return false
    }
}

