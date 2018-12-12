
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

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
        redirectTo: 'domains',
        pathMatch: 'full'
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
