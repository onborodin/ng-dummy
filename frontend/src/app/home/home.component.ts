import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    samplePhoneList: string[] = [
        '16192188689',
        '1141855692',
        '7118221699',
        '6315369258',
        '18549937810',
    ]

    partialSamples: string[] = [
        '16192',
        '7911',
        'Anre',
        'Princess',
    ]

    ngOnInit() {
    }
}
