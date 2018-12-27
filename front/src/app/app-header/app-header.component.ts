import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterStateSnapshot } from "@angular/router"

import { LoginService, AccessLevel } from '../login.service'
import { SuperuserGuard } from '../superuser.guard'

declare var $ : any

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnChanges, OnDestroy {

    brandName: string = "NG"

    @Input() level : AccessLevel = AccessLevel.guest
    private accessLevel = AccessLevel

    constructor(
        private router: Router,
        private loginService: LoginService,
        private superuserGuard: SuperuserGuard,
    ) {
    }

    foundation() {
        $('#app-header').foundation()
    }

    login() {
        this.router.navigate([ '/login' ]) 
    }

    logout() {
        this.loginService.cleanLogin()
        this.router.navigate([ '/' ]) 
        //this.router.navigate([ this.router.routerState.snapshot.url ])
    }

    ngAfterViewInit() {
        this.foundation()
    }

    ngOnChanges(changes: SimpleChanges) {
        this.foundation()
    }

    ngAfterContentChecked() {
        this.foundation()
    }

    ngAfterViewChecked() {
        this.foundation()
    }

    ngOnInit() {
        this.foundation()
        this.loginService.authSubject
            .subscribe((auth) => {
                if (auth) {
                    if (this.loginService.isUser()) this.level = AccessLevel.user
                    if (this.loginService.isSuperuser()) { 
                        this.level = AccessLevel.superuser
                    }
                    return
                }
                this.level = AccessLevel.guest
            })
    }

    ngOnDestroy() {
    }
}
