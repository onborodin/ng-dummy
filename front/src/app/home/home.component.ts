import { Component, OnInit } from '@angular/core'
import { fadeAnimation } from '../app.animations'

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ],
    animations: [ fadeAnimation ]
})
export class HomeComponent implements OnInit {

    constructor(
    ) {}

    ngOnInit() {
    }
}
