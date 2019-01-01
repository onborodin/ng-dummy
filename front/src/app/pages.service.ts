import { Injectable, Component, ComponentRef } from '@angular/core'
import { Routes, Route } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { UsersComponent } from './users/users.component'
import { LoginComponent } from './login/login.component'
import { NotFoundComponent } from './not-found/not-found.component'

import { AccessLevel } from './login.service'

export interface Page {
    name: string
    path: string
    active: boolean
}

export type Pages = Page[]

@Injectable({
    providedIn: 'root'
})
export class PagesService {

    routes: Routes = [
        {
            path: '',
            component: HomeComponent,
            //data: { accessLevel: [ AccessLevel.user, AccessLevel.superuser ] }
        },
        {
            path: 'users',
            component: UsersComponent,
            data: { accessLevel: [ AccessLevel.superuser ] }
        },
        {
            path: 'login',
            component: LoginComponent,
        },
        {
            path: '**', 
            component: NotFoundComponent,
        }
    ]

    constructor() {
        var defaultAccess = [ AccessLevel.guest, AccessLevel.user, AccessLevel.superuser ]

        this.routes.forEach((item) => {
            if (!item['data']) {
                item.data = { accessLevel: defaultAccess }
            }
            if (!item.data['accessLevel']) {
                item.data.accessLevel = defaultAccess
            }
        })
    }

    listRoutes() : Routes {
        var arr: Routes = []
        this.routes.forEach((item) => {
            arr.push(item)
        })
        return arr
    }

    camelize(str : string) : string {
        //return str.replace(/\W+(.)/g, (match, chr) => {
        //    return chr.toUpperCase()
        //})
        //return str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2, offset) => {
        //    if (p2) return p2.toUpperCase()
        //    return p1.toLowerCase()
        //})
        return str.charAt(0).toUpperCase() + str.slice(1)
    }


    listPages() : Pages {
        var arr: Pages = []
        this.routes.forEach((item) => {
            var page: Page
            if (item.path !== '**') {

                var path = '/' + item.path
                var name = this.camelize(item.path)
                if (path === '/') name = 'Home'

                page = { 
                    active: false,
                    path: path,
                    name: name
                }
                arr.push(page)
            }
        })
        return arr
    }

    computeAccess(path: string, userAccessLevel: AccessLevel) : boolean  {
        var result: boolean = false
        this.routes.forEach((item) => {
            if ('/' + item.path === path) {
                item.data.accessLevel.forEach((elem) => {
                    if (elem == userAccessLevel) { 
                        result = true 
                    } else {
                    }
                })
            }
        })
        return result
    }
}
