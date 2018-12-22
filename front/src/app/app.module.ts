import { NgModule } from '@angular/core'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'

import { RoutingModule } from './routing.module'

import { AppComponent } from './app.component'

import { AppHeaderComponent } from './app-header/app-header.component'
import { AppFooterComponent } from './app-footer/app-footer.component'

import { HomeComponent } from './home/home.component'

import { LoginComponent } from './login/login.component'
import { NotFoundComponent } from './not-found/not-found.component'

import { RPCService } from './rpc.service'
import { LoginService } from './login.service'
import { UsersService } from './users.service'
import { ThingsService } from './things.service'

import { UploadService } from './upload.service'

import { LoginGuard } from './guards/login.guard'
import { SuperloginGuard } from './guards/superlogin.guard'

import { UsersComponent } from './users/users.component'
import { UserCreateComponent } from './user-create/user-create.component'
import { UserUpdateComponent } from './user-update/user-update.component'
import { UserDropComponent } from './user-drop/user-drop.component';

import { ThingsComponent } from './things/things.component'
import { ThingCreateComponent } from './thing-create/thing-create.component'
import { ThingUpdateComponent } from './thing-update/thing-update.component'
import { ThingDropComponent } from './thing-drop/thing-drop.component'
import { ThingCardComponent } from './thing-card/thing-card.component'


@NgModule({
    declarations: [
        AppHeaderComponent,
        AppFooterComponent,
        AppComponent,
        HomeComponent,
        LoginComponent,
        NotFoundComponent,

        UsersComponent,
        UserCreateComponent,
        UserUpdateComponent,
        UserDropComponent,

        ThingsComponent,
        ThingCreateComponent,
        ThingUpdateComponent,
        ThingDropComponent,
        ThingCardComponent,

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
        LoginService,
        RPCService,
        UploadService,
        LoginGuard,
        SuperloginGuard,
        UsersService,
        ThingsService,
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}


