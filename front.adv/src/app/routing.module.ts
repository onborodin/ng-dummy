import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { UsersComponent } from './users/users.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { ThingsComponent } from './things/things.component'

import { LoginGuard } from './guards/login.guard'
import { SuperloginGuard } from './guards/superlogin.guard'

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'things',
        component: ThingsComponent,
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [ SuperloginGuard ]
    },
    {
        path: '',
        component: ThingsComponent,
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
