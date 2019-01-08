import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router, Routes } from '@angular/router'
import { SwUpdate } from '@angular/service-worker'

import { PagesService } from './pages.service'
import { PagesGuard } from './pages.guard'
//import { UpdateService } from './update.service'

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    theTitle: string = 'NG'
    routes: Routes = []

    public constructor(
    //    private updateService: UpdateService,
        private titleService: Title,
        private router: Router,
        private pageService: PagesService
    ) {

        this.routes = this.pageService.listRoutes()

        this.routes.forEach((item) => {
            item.canActivate = [ PagesGuard ]
        })
        this.router.resetConfig(this.routes)

    }

    ngOnInit() {
        this.titleService.setTitle(this.theTitle)
    }
}
