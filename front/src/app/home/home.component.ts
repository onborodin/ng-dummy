import { Component, OnInit } from '@angular/core'

import { fadeAnimation } from '../app.animations'
import { NoticesService } from '../notices.service'

declare var $: any

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ],
    animations: [ fadeAnimation ]
})
export class HomeComponent implements OnInit {

    constructor(public noticesService: NoticesService) {}

    ngOnInit() { }

    openModal(name: string) {
        var name = '#' + name
        $(name).modal({
            keyboard: false,
            backdrop: 'static'
        })
        $(name).modal('show')
    }

    sendNotice() {
        this.noticesService.sendAlertMessage('Hello!')
        setTimeout(() => { this.noticesService.sendAlertMessage('Hello2!') }, 500)
        setTimeout(() => { this.noticesService.sendAlertMessage('Hello3!') }, 1200)
    }

}
