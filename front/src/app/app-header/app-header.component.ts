import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { LoginService } from '../login.service'

declare var $ : any

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnChanges {

    constructor(
        public loginService: LoginService
    ) {}

    ngOnInit() {
        //this.foundation()
    }

    ngDoCheck() {
        //this.foundation()
    }

    foundation() {
        $('#app-header').foundation()
    }

    ngAfterViewChecked() {
        this.foundation()
    }

    ngAfterViewInit() {
        //this.foundation()
    }

    ngOnChanges(changes: SimpleChanges) {
        //this.foundation()
    }

    ngAfterContentChecked() {
        //this.foundation()
    }

    ngAfterContentInit() { // not called
        //this.foundation()
    }
}
