import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"


interface Page {
    name: string
    route: string
    active: boolean
}

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

    list: Page[] = [
        { name: "Home", route: "/", active: false },
        { name: "Users", route: "/users", active: false },
    ]

    constructor(
        private router: Router
    ) { }

    changePage(page: Page) {
        this.router.navigate([ page.route ])
    }

    itemClass(item: Page) : string {
        if (item.active) {
                return 'dropdown-item active'
        }
        return 'dropdown-item'
    }

    ngOnInit() {
        this.list.forEach((item: Page) => {
            item.active = false
            if (item.route === this.router.url) item.active = true
        })
    }

}
