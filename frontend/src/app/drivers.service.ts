import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { RPCService, RPCResponce, RPCError } from './rpc.service'

import { Driver } from './models/driver.model'

@Injectable({
  providedIn: 'root'
})
export class DriversService {

    constructor(
        private rpcService: RPCService
    ) {}

    list() {
        return this.rpcService
            .request<any, Driver[]>('/api/drivers', 'list', {})
    }

    create(driver: Driver) {
        return this.rpcService
            .request<Driver, number>('/api/drivers', 'create', driver)
    }

    update(driver: Driver) {
        return this.rpcService
            .request<Driver, number>('/api/drivers', 'update', driver)
    }

    drop(driver: Driver) {
        return this.rpcService
            .request<Driver, number>('/api/drivers', 'drop', driver)
    }


}
