import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core'

import { Router, ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { AppHeaderComponent } from '../app-header/app-header.component'
import { AppFooterComponent } from '../app-footer/app-footer.component'

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { CustomersService } from '../customers.service'
import { Customer } from '../models/customer.model'
import { fadeAnimation } from '../app.animations'


import * as moment from 'moment-mini'

@Component({
    selector: 'domain',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
    animations: [ fadeAnimation ]
})
export class CustomersComponent implements OnInit {

    phoneForm: FormGroup

    phone: string = ''

    customer: Customer = {
        id: -1,
        name: '',
        phone1: '',
        phone2: '',
        city: '',
        agreement: ''
    }

    theTimestamp: string = ''

    customerList: Customer[] = []

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private customersService: CustomersService
    ) {}


    timestamp() : string {
        var now = moment()
        return now.format('hh:mm:ss a')
    }

    searchByPhone(form) {
        let phone = form.value.phone
        if (this.phone !== phone) {
            this.customerList = []
            this.router.navigate([ '/customers/' + phone ])
        } else {
            this.theTimestamp = this.timestamp()
        }
    }

    search(some) {
        this.customerList = []
        this.router.navigate([ '/customers/' + some ])
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    ngOnInit() {
        this.phoneForm = this.formBuilder.group({
            phone: [ this.phone ],
        })

        this.route.paramMap.subscribe(params => {
            this.phone = params.get('phone')

            this.phone = this.phone.replace(/[\-.()+]/g, '')

            this.phoneForm = this.formBuilder.group({
                phone: [ this.phone ],
            })

            if (this.phone) {
                let customer : Customer = {
                    phone1: this.phone,
                    phone2: this.phone,
                    name: this.phone
                }
                this.customersService
                    .find(customer)
                    .subscribe((res: RPCResponce<Customer[]>) => {
                        this.theTimestamp = this.timestamp()
                        if (res.result.length > 0) {
                            this.customerList = res.result
                        }
                    })
            }

        })
    }


}

