import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { RPCService, RPCResponce, RPCError } from './rpc.service'

import { User } from './models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    constructor(
        private rpcService: RPCService
    ) {}

    list() {
        return this.rpcService
            .request<any, User[]>('/api/users', 'list', {})
    }

    create(user: User) {
        return this.rpcService
            .request<User, number>('/api/users', 'create', user)
    }

    update(user: User) {
        return this.rpcService
            .request<User, number>('/api/users', 'update', user)
    }

    drop(user: User) {
        return this.rpcService
            .request<User, number>('/api/users', 'drop', user)
    }

}
