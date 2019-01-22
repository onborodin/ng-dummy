import { Injectable } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'
import { interval } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

    constructor(public swUpdate: SwUpdate) {
        swUpdate.available
            .subscribe((event) => {
                //console.log('current version is', event.current)
                //console.log('available version is', event.available)
            })
        swUpdate.activated
            .subscribe((event) => {
                //console.log('old version was', event.previous)
                //console.log('new version is', event.current)
            })
        //interval(5)
        //    .subscribe(() => { 
        //        swUpdate.checkForUpdate()
        //    })
    }
}
