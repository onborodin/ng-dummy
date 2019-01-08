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
//import { fas } from '@fortawesome/free-solid-svg-icons'
//import { far } from '@fortawesome/free-regular-svg-icons'

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
    faShuttleVan,
    faCaretLeft,
    faCaretRight,
    faArrowLeft,
    faArrowRight,
    faFileUpload,
    faFolderPlus,
    faFolderMinus,
    faFolder,
} from '@fortawesome/free-solid-svg-icons'

import {
    faOldRepublic,
} from '@fortawesome/free-brands-svg-icons';

import { DriversComponent } from './drivers/drivers.component';
import { DriverCreateComponent } from './driver-create/driver-create.component';
import { DriverUpdateComponent } from './driver-update/driver-update.component';
import { DriverDropComponent } from './driver-drop/driver-drop.component';
import { DriversFilterPipe } from './drivers-filter.pipe';

import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleCreateComponent } from './vehicle-create/vehicle-create.component';
import { VehicleUpdateComponent } from './vehicle-update/vehicle-update.component';
import { VehicleDropComponent } from './vehicle-drop/vehicle-drop.component'
import { VehiclesFilterPipe } from './vehicles-filter.pipe';
import { PageNavComponent } from './page-nav/page-nav.component';
import { PrettyCodePipe } from './pretty-code.pipe';

//import { ServiceWorkerModule } from '@angular/service-worker'
//import { environment } from '../environments/environment'

//import { registerLocaleData } from '@angular/common'
//import localeRu from '@angular/common/locales/ru'
//import localeRuExtra from '@angular/common/locales/extra/ru'

// the second parameter 'fr' is optional
//registerLocaleData(localeRu, 'ru', localeRuExtra)



const routes: Routes = []

@NgModule({
    entryComponents: [
        HomeComponent,
        UsersComponent,
        DriversComponent,
        VehiclesComponent,
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
        DriversComponent,
        DriverCreateComponent,
        DriverUpdateComponent,
        DriverDropComponent,
        DriversFilterPipe,
        VehiclesComponent,
        VehicleCreateComponent,
        VehicleUpdateComponent,
        VehicleDropComponent,
        VehiclesFilterPipe,
        PageNavComponent,
        PrettyCodePipe,
    ],
    imports: [
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        HttpClientModule,
        //ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        Title,
        RPCService,
        LoginService,
        PagesService,
        PagesGuard,
        NoticesService,
        //{ provide: LOCALE_ID, useValue: 'ru' }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

    constructor() {
        //library.add(fas, far)
        library.add(
            faArrowLeft,
            faArrowRight,
            faBell,
            faCaretLeft,
            faCaretRight,
            faCheck,
            faCheckCircle,
            faEdit,
            faExclamation,
            faExclamationCircle,
            faFileUpload,
            faFolderMinus,
            faFolderPlus,
            faFolder,
            faInfo,
            faInfoCircle,
            faOldRepublic,
            faPlus,
            faPlusSquare,
            faShieldAlt,
            faShuttleVan,
            faSignInAlt,
            faSignOutAlt,
            faStar,
            faStarOfDavid,
            faSyncAlt,
            faThumbsUp,
            faTrashAlt,
            faUserAlt,
            faUserPlus,
            faUserSecret,
        )
    }
}
