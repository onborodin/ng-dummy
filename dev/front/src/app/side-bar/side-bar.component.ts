import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"

import { PagesService, Page, Pages } from '../pages.service'

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

    list: Pages = [
        { name: "Home", path: "/", active: false },
    ]

    constructor(
        private router: Router,
        private pageService: PagesService,
    ) { }

    changePage(page: Page) {
        this.router.navigate([ page.path ])
    }

    itemClass(item: Page) : string {
        if (item.active) {
                return 'dropdown-item active'
        }
        return 'dropdown-item'
    }

    ngOnInit() {
        this.list = this.pageService.listPages()

        this.list.forEach((item: Page) => {
            item.active = false
            if (item.path === this.router.url) item.active = true
        })
    }

}
