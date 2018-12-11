
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './login/login.component'
import { DomainsComponent } from './domains/domains.component'
import { NotFoundComponent } from './not-found/not-found.component'

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'domains',
        component: DomainsComponent
    },
    {
        path: '',
        redirectTo: '/domains',
        pathMatch: 'full'
    },
    { 
        path: '**', 
        component: NotFoundComponent 
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class RoutingModule {}
