import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes
} from '@angular/animations';


export const fadeAnimation = trigger('fade', [
    state('void', style({
        opacity: 0
    })),
    transition(':enter', [
        style({
            transform: 'translateX(0)',
            opacity: 0
        }),
        animate('0.45s 200ms ease-in')
    ]),

    transition(':leave', [
        animate('0.25s 100ms ease-out',
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
            transform: 'translateX(0) rotateX(60deg)',
            opacity: 0
        }),
        animate('0.25s 100ms ease-in')
    ]),

    transition(':leave', [
        animate('0.2s 100ms ease-out',
            style({
                transform: 'translateX(0) rotateX(-60deg)',
                opacity: 0
            })
        )
    ])
])
