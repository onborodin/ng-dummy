import { NgModule } from '@angular/core'
import { BrowserModule, Title } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'

import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { Routes, Route, RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { AppContainerComponent } from './app-container/app-container.component'

import { AppHeaderComponent } from './app-header/app-header.component'
import { AppFooterComponent } from './app-footer/app-footer.component'

import { HomeComponent } from './home/home.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { SideBarComponent } from './side-bar/side-bar.component'
import { LoginComponent } from './login/login.component'

import { LoginService } from './login.service'
import { PagesService } from './pages.service'
import { RPCService } from './rpc.service'
import { UsersService } from './users.service'
import { NoticesService } from './notices.service'

import { PagesGuard } from './pages.guard'
import { NotifierComponent } from './notifier/notifier.component'

import { UsersComponent } from './users/users.component'
import { UserCreateComponent } from './user-create/user-create.component'
import { UserDropComponent } from './user-drop/user-drop.component'
import { UserUpdateComponent } from './user-update/user-update.component'

import { UsersFilterPipe } from './users-filter.pipe'

import { LowercaseDirective } from './directives/lowercase.directive'
import { TrimDirective } from './directives/trim.directive'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import {
    faEdit,
    faPlusSquare,
    faTrashAlt,
} from '@fortawesome/free-regular-svg-icons'

import { 
    faStarOfDavid,
    faBell,
    faCheck,
    faCheckCircle,
    faExclamation,
    faExclamationCircle,
    faInfo,
    faInfoCircle,
    faPlus,
    faShieldAlt,
    faSyncAlt,
    faThumbsUp,
    faUserAlt,
    faUserPlus,
    faUserSecret,
    faStar,
    faSignInAlt,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

import {
    faOldRepublic,
} from '@fortawesome/free-brands-svg-icons'


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
        AppContainerComponent,
        AppHeaderComponent,
        AppFooterComponent,
        HomeComponent,
        NotFoundComponent,
        SideBarComponent,
        LoginComponent,
        NotifierComponent,
        UsersComponent,
        UserCreateComponent,
        UserDropComponent,
        UserUpdateComponent,
        UsersFilterPipe,
        LowercaseDirective,
        TrimDirective,
    ],
    imports: [
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
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
export class AppModule {

    constructor() {
        //library.add(fas, far)
        library.add(
            faBell,
            faCheck,
            faCheckCircle,
            faEdit,
            faExclamation,
            faExclamationCircle,
            faInfo,
            faInfoCircle,
            faPlus,
            faPlusSquare,
            faShieldAlt,
            faStarOfDavid,
            faSyncAlt,
            faThumbsUp,
            faTrashAlt,
            faUserAlt,
            faUserPlus,
            faUserSecret,
            faStar,
            faSignInAlt,
            faSignOutAlt,
            faOldRepublic,
        )

    }
}
