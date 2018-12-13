import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { CustomersComponent } from './customers/customers.component'
import { UsersComponent } from './users/users.component'
import { NotFoundComponent } from './not-found/not-found.component'

import { LoginGuard } from './login.guard'

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'customers',
        component: CustomersComponent,
        canActivate: [ LoginGuard ]
    },
    {
        path: 'customers/:phone',
        component: CustomersComponent,
        canActivate: [ LoginGuard ]
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [ LoginGuard ]
    },
    {
        path: '',
        //redirectTo: 'customers',
        //pathMatch: 'full'
        component: HomeComponent,
        //canActivate: [ LoginGuard ]
    },
    {
        path: '**', 
        component: NotFoundComponent,
        //canActivate: [ LoginGuard ]
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class RoutingModule {}
