import { Component, OnInit } from '@angular/core';
//import { fadeAnimation, rotateAnimation } from '../app.animations'
import { state, query, useAnimation, transition, style, trigger, animate, animateChild } from '@angular/animations';

export const fadeAnimation = trigger('fade', [
    state('void', style({
        opacity: 0
    })),
    transition(':enter', [
        style({
            transform: 'translateY(-100%) scale(0.5)',
            opacity: 0
        }),
        animate('2.25s 300ms ease-in')
    ]),

    transition(':leave', [
        animate('0.2s 100ms ease-out',
            style({
                transform: 'translateX(0)',
                opacity: 0
            })
        )
    ])
])


export const rotateAnimation = trigger('rotate', [
    state('void', style({
        opacity: 0
    })),
    transition(':enter', [
        style({
            transform: 'translateX(200%) rotateX(60deg) scale(0.5)',
            opacity: 0
        }),
        animate('1.25s 300ms ease-in')
    ]),

    transition(':leave', [
        animate('0.2s 100ms ease-out',
            style({
                transform: 'translateX(200%) rotateX(-90deg)',
                opacity: 0
            })
        )
    ])
])



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [ fadeAnimation, rotateAnimation ]
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
        'Amelie',
        'Princess',
    ]

    ngOnInit() {
    }
}
