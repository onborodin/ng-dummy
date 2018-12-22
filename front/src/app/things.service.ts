import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { RPCService, RPCResponce, RPCError } from './rpc.service'

import { Thing } from './models/thing.model'

@Injectable({
  providedIn: 'root'
})
export class ThingsService {

    constructor(
        private rpcService: RPCService
    ) {}

    list() {
        return this.rpcService
            .request<any, Thing[]>('/api/things', 'list', {})
    }

    create(thing: Thing) {
        return this.rpcService
            .request<Thing, number>('/api/things', 'create', thing)
    }

    update(thing: Thing) {
        return this.rpcService
            .request<Thing, number>('/api/things', 'update', thing)
    }

    drop(thing: Thing) {
        return this.rpcService
            .request<Thing, number>('/api/things', 'drop', thing)
    }

}
