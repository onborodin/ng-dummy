import { NgModule } from '@angular/core'
import { BrowserModule, Title } from '@angular/platform-browser'

import { LocationStrategy, HashLocationStrategy } from '@angular/common'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'

import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'

import { RoutingModule } from './routing.module'
import { AppComponent } from './app.component'

import { AppHeaderComponent } from './app-header/app-header.component'
import { AppFooterComponent } from './app-footer/app-footer.component'

import { HomeComponent } from './home/home.component'
import { UsersComponent } from './users/users.component'
import { NotFoundComponent } from './not-found/not-found.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LoginComponent } from './login/login.component'

import { LoginService } from './login.service'


@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        AppFooterComponent,
        HomeComponent,
        UsersComponent,
        NotFoundComponent,
        SideBarComponent,
        LoginComponent,
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        RoutingModule,
        HttpClientModule
    ],
    providers: [
        //{provide: LocationStrategy, useClass: HashLocationStrategy},
        Title,
        LoginService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
