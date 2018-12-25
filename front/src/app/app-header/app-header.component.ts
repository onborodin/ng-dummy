import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

declare var $ : any

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnChanges {

    ngOnInit() {
        $('#app-header').foundation()
    }

    ngAfterViewInit() {
        $('#app-header').foundation()
    }

    ngOnChanges(changes: SimpleChanges) {
        $('#app-header').foundation()
    }

    ngAfterContentChecked() {
        $('#app-header').foundation()
    }

    ngAfterViewChecked() {
        $('#app-header').foundation()
    }
}
