import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router'

import { PageService } from './page.service'
import { PageGuard } from './page.guard'

declare var $: any

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    theTitle: string = 'NG'
    routes: Routes = []

    public constructor(
        private titleService: Title,
        private router: Router,
        private pageService: PageService
    ) { 
        this.routes = this.pageService.listRoutes()
        this.routes.forEach((item) => {
            item.canActivate = [ PageGuard ]
        })
        this.router.resetConfig(this.routes)
    }

    ngOnInit() {
        this.titleService.setTitle(this.theTitle)
        $(document).foundation()
    }
}
