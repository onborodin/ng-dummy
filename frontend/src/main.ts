import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

//import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core'
//let current_language = 'ru'
//import {RU_TRANS} from './i18n/messages.' + current_language

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
    enableProdMode()
    window.console.log = function(...args) { }
    console.log = function(...args) { }
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => { 
        console.error(err)
    })
