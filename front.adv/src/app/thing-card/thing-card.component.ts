import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms'

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { ThingsService } from '../things.service'
import { Thing } from '../models/thing.model'

import { fadeAnimation } from '../app.animations'

declare var $ : any

@Component({
    selector: 'thing-card',
    templateUrl: './thing-card.component.html',
    styleUrls: ['./thing-card.component.scss'],
    animations: [ fadeAnimation ]
})
export class ThingCardComponent implements OnInit {

    modelForm: FormGroup
    alertMessage: string = ''
    message: string = ''

    @Input() show: boolean = false
    @Input() thing: Thing = {
        id: -1,
        name: '',
    }

    @Output() escapeEvent = new EventEmitter<boolean>();

    constructor(
        private thingsService: ThingsService
    ) {}

    create(item) {
        this.thing = item.value
    }

    escape() {
        this.show = false
        this.escapeEvent.emit(true)
    }


    ngOnChanges(changes: SimpleChanges) {
        if (changes['thing']) {
        }
    }

    ngOnInit() {
    }
}
