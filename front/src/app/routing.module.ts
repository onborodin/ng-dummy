import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { UsersComponent } from './users/users.component'
import { LoginComponent } from './login/login.component'
import { NotFoundComponent } from './not-found/not-found.component'

import { SuperuserGuard } from './superuser.guard'

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [ SuperuserGuard ]
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

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class RoutingModule {}
