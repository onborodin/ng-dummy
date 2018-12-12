import { NgModule } from '@angular/core'

import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RoutingModule } from './routing.module'

import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'

import { AppHeaderComponent } from './app-header/app-header.component'
import { AppFooterComponent } from './app-footer/app-footer.component'

import { DomainsComponent } from './domains/domains.component'
import { UsersComponent } from './users/users.component'
import { UsersListComponent } from './users-list/users-list.component'

import { LoginComponent } from './login/login.component'
import { NotFoundComponent } from './not-found/not-found.component'

import { RPCService } from './rpc.service'
import { LoginService } from './login.service'
import { UsersService } from './users.service'

import { LoginGuard }   from './login.guard'

@NgModule({
    declarations: [
        AppHeaderComponent,
        AppFooterComponent,
        AppComponent,
        DomainsComponent,
        UsersComponent,
        UsersListComponent,
        LoginComponent,
        NotFoundComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        RoutingModule,
        HttpClientModule
    ],
    providers: [ LoginService, RPCService, UsersService, LoginGuard ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}

