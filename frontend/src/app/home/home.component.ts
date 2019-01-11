import {HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http'
import { Component, OnInit } from '@angular/core'

import { FormGroup, FormControl, FormBuilder, FormArray, Validators,  ValidationErrors } from '@angular/forms'
import { Subject, Observable } from 'rxjs'

import { fadeAnimation, rotateAnimation } from '../app.animations'
import { NoticesService } from '../notices.service'
import { UploadService } from '../upload.service'

interface Progress {
    percent: number
    label: string
    id: string
}

type Progresses = Progress[]

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ],
    animations: [ fadeAnimation, rotateAnimation ]
})
export class HomeComponent implements OnInit {

    constructor(
        public noticesService: NoticesService
    ) {}


    sendNotices() {
        this.noticesService
            .sendAlertMessage('Alert! Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.')
        setTimeout(() => {
            this.noticesService
                .sendWarningMessage('Warning! Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.')
        }, 700)
        setTimeout(() => {
            this.noticesService
                .sendSuccessMessage('Success. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.')
        }, 1400)
        setTimeout(() => {
            this.noticesService
                .sendInfoMessage('Info. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.')
        }, 2100)
    }

    ngOnInit() {
    }

}
