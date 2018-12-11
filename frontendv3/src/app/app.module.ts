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
import { LoginComponent } from './login/login.component'
import { NotFoundComponent } from './not-found/not-found.component'

import { RPCService } from './rpc.service'
import { LoginService } from './login.service'


@NgModule({
    declarations: [
        AppHeaderComponent,
        AppFooterComponent,
        AppComponent,
        DomainsComponent,
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
    providers: [ LoginService, RPCService ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}

