import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { LoginService } from '../login.service'

declare var $ : any

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

    constructor(
        public loginService: LoginService
    ) {}

    ngOnInit() {
        $('#app-header').foundation()
    }

    ngAfterViewInit() {
        $('#app-header').foundation()
    }

    ngOnChanges(changes: SimpleChanges) {
        $('#app-header').foundation()
    }
}
