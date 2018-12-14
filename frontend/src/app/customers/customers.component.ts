import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { AppHeaderComponent } from '../app-header/app-header.component'
import { AppFooterComponent } from '../app-footer/app-footer.component'

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { CustomersService } from '../customers.service'
import { Customer } from '../models/customer.model'


@Component({
  selector: 'domain',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    phone: string = ''

    customer: Customer = {
        id: -1,
        name: '',
        phone1: '',
        phone2: '',
        city: '',
        agreement: ''
    }

    constructor(
        private route: ActivatedRoute,
        private customersService: CustomersService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.phone = params.get('phone')

            if (this.phone) {
                let customer : Customer = {
                    phone1: this.phone,
                    phone2: this.phone
                }
                this.customersService
                    .find(customer)
                    .subscribe((res: RPCResponce<Customer[]>) => {
                        if (res.result.length > 0) {
                            this.customer = res.result[0]
                        }
                    })
            }

        })
    }


}

