import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService, AccessLevel } from './login.service'
import { PageService } from './page.service'

@Injectable({
  providedIn: 'root'
})
export class PageGuard implements CanActivate {

    constructor(
        private loginService: LoginService,
        private pageService: PageService,
        private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot
    ) : Observable<boolean> | Promise<boolean> | boolean {

        var url = routerState.url
        var userAccessLevel = this.loginService.accessLevel()

        console.log(`canActivate url=${url} userAccessLevel=${userAccessLevel}`)

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
