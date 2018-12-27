import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from './login.service'

@Injectable({
  providedIn: 'root'
})
export class SuperuserGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router
    ) {}


    canActivate(
        next: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot
    ) : Observable<boolean> | Promise<boolean> | boolean {

        if (this.loginService.isSuperuser()) {
            return true
        }

        this.loginService.returnMessage = 'Access was withdraw'

        this.loginService.returnUrl = routerState.url
        this.loginService.returnUrlSubject.next(routerState.url)
        this.router.navigate(['/login'])
        return false
    }
}
