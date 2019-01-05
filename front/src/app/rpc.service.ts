import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import 'rxjs/add/operator/retry'
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/map'



import { v4 as uuid } from 'uuid'

export interface RPCRequest<TParam> {
    jsonrpc: string
    method: string
    params: TParam
    id: string
}

export interface RPCError {
    code?: number
    message?: string
}

export interface RPCResponce<TResult> {
    jsonrpc: string
    error?: RPCError
    result?: TResult
    id: string
}

@Injectable({
  providedIn: 'root'
})
export class RPCService {

    constructor(
        private httpClient: HttpClient
    ) {}

    request<TParam, TResult>(url: string, method: string, params: TParam) : Observable<RPCResponce<TResult>> {
        let rpcRequest : RPCRequest<TParam> = {
            jsonrpc: '2.0',
            method: method,
            params: params,
            id: uuid()
        }
        return this.httpClient
            .post<RPCResponce<TResult>>(url, rpcRequest)
            .timeout(3000)

    }
}
