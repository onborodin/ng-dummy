import { NgModule } from '@angular/core'
import { BrowserModule, Title } from '@angular/platform-browser'

import { LocationStrategy, HashLocationStrategy } from '@angular/common'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'

import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'


import { AppComponent } from './app.component'

import { AppHeaderComponent } from './app-header/app-header.component'
import { AppFooterComponent } from './app-footer/app-footer.component'

import { HomeComponent } from './home/home.component'
import { UsersComponent } from './users/users.component'
import { NotFoundComponent } from './not-found/not-found.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LoginComponent } from './login/login.component'

import { LoginService } from './login.service'
import { PageService } from './page.service'

import { Routes, Route, RouterModule } from '@angular/router'

const routes: Routes = []

@NgModule({
    entryComponents: [
        HomeComponent,
        UsersComponent,
        NotFoundComponent,
        LoginComponent
    ],
    declarations: [
        AppComponent,
        AppHeaderComponent,
        AppFooterComponent,
        HomeComponent,
        UsersComponent,
        NotFoundComponent,
        SideBarComponent,
        LoginComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [
        Title,
        LoginService,
        PageService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
