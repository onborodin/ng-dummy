import { Injectable, Component, ComponentRef } from '@angular/core'
import { Routes, Route } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { UsersComponent } from './users/users.component'
import { LoginComponent } from './login/login.component'
import { NotFoundComponent } from './not-found/not-found.component'

import { AccessLevel } from './login.service'

@Injectable({
    providedIn: 'root'
})
export class PageService {

    routes: Routes = [
        {
            path: '',
            component: HomeComponent,
            data: { accessLevel: [ AccessLevel.user, AccessLevel.superuser ] }
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

    computeAccess(path: string, userAccessLevel: AccessLevel) : boolean  {
        var result: boolean = false
        this.routes.forEach((item) => {
            if ('/' + item.path === path) {
                item.data.accessLevel.forEach((elem) => {
                    if (elem == userAccessLevel) { 
                        result = true 
                        console.log(`computeAccess /${item.path} ${elem} == ${userAccessLevel} -> ${elem == userAccessLevel}`)
                    } else {
                        console.log(`computeAccess /${item.path} ${elem} == ${userAccessLevel} -> ${elem == userAccessLevel}`)
                    }
                })
            }
        })
        return result
    }
}
