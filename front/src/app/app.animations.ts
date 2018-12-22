import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

//export const fadeAnimation = trigger('fade', [
//    state('void',
//        style({
//            opacity: 0
//        })
//    ),
//    transition('* <=> *', animate('1s')),
//])

export const fadeAnimation = trigger('fade', [
    state('void', style({
        opacity: 0
    })),
    transition(':enter', [
        style({
            transform: 'translateX(0)',
            opacity: 0
        }),
        animate('0.2s 100ms ease-in')
    ]),
    transition(':leave', [
        animate('0.2s ease-out',
            style({
                transform: 'translateX(0)',
                opacity: 0
            })
        )
    ])
])
