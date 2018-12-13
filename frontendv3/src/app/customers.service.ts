import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { RPCService, RPCResponce, RPCError } from './rpc.service'

import { Customer } from './models/customer.model'

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

    constructor(
        private rpcService: RPCService
    ) {}

    find(customer: Customer) {
        return this.rpcService
            .request<Customer, Customer[]>('/api/customers', 'find', customer)
    }

}
