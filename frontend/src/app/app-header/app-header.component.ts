import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router"

import { LoginService, AccessLevel } from '../login.service'
import { PagesService, Page, Pages } from '../pages.service'

declare var $ : any

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {

    brandName: string = "NG"
    subscription: any

    @Input() level : AccessLevel = AccessLevel.guest
    accessLevel = AccessLevel

    list: Pages = [
        { name: "Home", path: "/", active: false },
    ]

    constructor(
        private router: Router,
        public loginService: LoginService,
        private pageService: PagesService
    ) { }

    ngOnInit() {
        this.list = this.pageService.listPages()

        this.list.forEach((item: Page) => {
            item.active = false
            if (item.path === this.router.url) item.active = true
        })

        this.subscription = this.loginService.authSubject
            .subscribe((auth) => {
                this.level = this.loginService.accessLevel()
            })
    }


    login() {
        this.router.navigate([ '/login' ]) 
    }

    logout() {
        this.loginService.cleanLogin()
        this.router.navigate([ '/' ]) 
    }

    changePage(page: Page) {
        this.router.navigate([ page.path ])
    }

    itemClass(item: Page) : string {
        if (item.active) {
                return 'dropdown-item active'
        }
        return 'dropdown-item'
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
