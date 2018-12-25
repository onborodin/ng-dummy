import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'
import { Subject, Observable } from 'rxjs'

import { fadeAnimation, rotateAnimation } from '../app.animations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
    animations: [ fadeAnimation, rotateAnimation ]
})
export class HomeComponent implements OnInit {

    constructor(
    ) {}

    ngOnInit() {
    }
}
