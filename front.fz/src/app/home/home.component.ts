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

    constructor(
        public noticesService: NoticesService
    ) {}

    foundation() {
        $('#home').foundation()
    }

    hello() {
        this.noticesService.sendAlertMessage('Alert!')

        setTimeout(() => {
            this.noticesService.sendAlertMessage('Again alert!')
        }, 2000)

        setTimeout(() => {
            this.noticesService.sendSuccessMessage('Success message.')
        }, 4000)
    }

    ngOnInit() {
        this.foundation()

        //setInterval(() => {
        //    this.noticesService.sendAlertMessage('Alert message')
        //}, 5000)

        //setInterval(() => {
        //    this.noticesService.sendSuccessMessage('Success message')
        //}, 7000)

    }
}
