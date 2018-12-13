import { NgModule } from '@angular/core'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { RoutingModule } from './routing.module'

import { AppComponent } from './app.component'

import { AppHeaderComponent } from './app-header/app-header.component'
import { AppFooterComponent } from './app-footer/app-footer.component'

import { HomeComponent } from './home/home.component'
import { CustomersComponent } from './customers/customers.component'

import { LoginComponent } from './login/login.component'
import { NotFoundComponent } from './not-found/not-found.component'

import { RPCService } from './rpc.service'
import { LoginService } from './login.service'
import { UsersService } from './users.service'
import { CustomersService } from './customers.service'

import { LoginGuard } from './login.guard'

import { UsersComponent } from './users/users.component'
import { UserCreateComponent } from './user-create/user-create.component'
import { UserUpdateComponent } from './user-update/user-update.component'


@NgModule({
    declarations: [
        AppHeaderComponent,
        AppFooterComponent,
        AppComponent,
        HomeComponent,
        CustomersComponent,
        UsersComponent,
        LoginComponent,
        NotFoundComponent,
        UserCreateComponent,
        UserUpdateComponent
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        RoutingModule,
        HttpClientModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        LoginService,
        RPCService,
        UsersService,
        CustomersService,
        LoginGuard
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}

