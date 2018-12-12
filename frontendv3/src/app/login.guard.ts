import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"

import { LoginService } from './login.service'

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) : Observable<boolean> | boolean {

        console.log('#login guard')

        if (!this.loginService.loginState) {
            this.router.navigate(['/login'])
            return false
        }
        return true
    }
}

