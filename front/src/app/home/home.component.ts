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
        this.noticesService.sendAlertMessage('Alert! Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.')
        setTimeout(() => { this.noticesService.sendWarningMessage('Warning! Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.') }, 700)
        setTimeout(() => { this.noticesService.sendSuccessMessage('Success. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.') }, 1400)
        setTimeout(() => { this.noticesService.sendInfoMessage('Info. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.') }, 2100)
    }

}
