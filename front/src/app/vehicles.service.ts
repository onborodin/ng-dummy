import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { RPCService, RPCResponce, RPCError } from './rpc.service'

import { Vehicle } from './models/vehicle.model'

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

    constructor(
        private rpcService: RPCService
    ) {}

    list() {
        return this.rpcService
            .request<any, Vehicle[]>('/api/vehicles', 'list', {})
    }

    create(vehicle: Vehicle) {
        return this.rpcService
            .request<Vehicle, number>('/api/vehicles', 'create', vehicle)
    }

    update(vehicle: Vehicle) {
        return this.rpcService
            .request<Vehicle, number>('/api/vehicles', 'update', vehicle)
    }

    drop(vehicle: Vehicle) {
        return this.rpcService
            .request<Vehicle, number>('/api/vehicles', 'drop', vehicle)
    }
}
