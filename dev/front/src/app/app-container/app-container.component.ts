import { Component, OnInit } from '@angular/core';

import { fadeAnimation } from '../app.animations'


@Component({
    selector: 'app-container',
    templateUrl: './app-container.component.html',
    styleUrls: ['./app-container.component.scss'],
    animations: [ fadeAnimation ]
})
export class AppContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
