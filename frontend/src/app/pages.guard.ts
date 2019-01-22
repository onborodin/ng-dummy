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

        console.log(`#can activate url ${routerState.url}`)

        var url = routerState.url
        var userAccessLevel = this.loginService.accessLevel()

        console.log(`#access level ${userAccessLevel}`)


        if (this.pageService.computeAccess(url, userAccessLevel)) {
            console.log(`#compute access as true`)
            return true
        }

        console.log(`#compute access to page as false`)

        this.loginService.reasonMessage = 'An appropriate access level is required'

        this.loginService.returnUrl = routerState.url
        this.loginService.returnUrlSubject.next(routerState.url)

        this.router.navigate(['/login'])
        return false
    }
}
