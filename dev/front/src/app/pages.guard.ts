import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService, AccessLevel } from './login.service'
import { PagesService } from './pages.service'

@Injectable({
  providedIn: 'root'
})
export class PagesGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private pageService: PagesService,
        private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot
    ) : Observable<boolean> | Promise<boolean> | boolean {

        var url = routerState.url
        var userAccessLevel = this.loginService.accessLevel()

        if (this.pageService.computeAccess(url, userAccessLevel)) {
            return true
        }

        this.loginService.reasonMessage = 'An appropriate access level is required'

        this.loginService.returnUrl = routerState.url
        this.loginService.returnUrlSubject.next(routerState.url)

        this.router.navigate(['/login'])
        return false
    }
}
