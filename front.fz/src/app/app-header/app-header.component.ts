import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterStateSnapshot } from "@angular/router"

import { LoginService, AccessLevel } from '../login.service'

declare var $ : any

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnChanges, OnDestroy {

    brandName: string = "NG"
    subscription: any

    @Input() level : AccessLevel = AccessLevel.guest
    accessLevel = AccessLevel


    constructor(
        private router: Router,
        public loginService: LoginService,
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
        this.subscription = this.loginService.authSubject
            .subscribe((auth) => {
                this.level = this.loginService.accessLevel()
            })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
