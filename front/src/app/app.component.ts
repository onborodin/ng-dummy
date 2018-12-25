import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser';

declare var $: any

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    theTitle: string = 'NgII'

    public constructor(private titleService: Title ) { }

    ngOnInit() {
        this.titleService.setTitle(this.theTitle)
        $(document).foundation()
    }
}
