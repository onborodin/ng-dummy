import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { DomainsComponent } from './domains/domains.component'
import { UsersComponent } from './users/users.component'
import { NotFoundComponent } from './not-found/not-found.component'

import { LoginGuard } from './login.guard'

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'domains',
        component: DomainsComponent,
        canActivate: [ LoginGuard ]
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [ LoginGuard ]
    },
    {
        path: '',
        //redirectTo: 'domains',
        //pathMatch: 'full'
        component: HomeComponent,
        //canActivate: [ LoginGuard ]
    },
    {
        path: '**', 
        component: NotFoundComponent,
        canActivate: [ LoginGuard ]
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class RoutingModule {}
