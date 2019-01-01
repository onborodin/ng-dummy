import { NgModule } from '@angular/core'
import { BrowserModule, Title } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'

import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { Routes, Route, RouterModule } from '@angular/router'


import { AppComponent } from './app.component'

import { AppHeaderComponent } from './app-header/app-header.component'
import { AppFooterComponent } from './app-footer/app-footer.component'

import { HomeComponent } from './home/home.component'
import { UsersComponent } from './users/users.component'
import { NotFoundComponent } from './not-found/not-found.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LoginComponent } from './login/login.component'

import { LoginService } from './login.service'
import { PagesService } from './pages.service'
import { RPCService } from './rpc.service'
import { UsersService } from './users.service'
import { NoticesService } from './notices.service'

import { PagesGuard } from './pages.guard';
import { NotifierComponent } from './notifier/notifier.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { AppContainerComponent } from './app-container/app-container.component';
import { UserDropComponent } from './user-drop/user-drop.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserFilterPipe } from './user-filter.pipe'


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
        LoginComponent,
        NotifierComponent,
        UserCreateComponent,
        AppContainerComponent,
        UserDropComponent,
        UserUpdateComponent,
        UserFilterPipe
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
        RPCService,
        LoginService,
        PagesService,
        PagesGuard,
        NoticesService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
