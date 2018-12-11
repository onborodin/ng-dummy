import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface RPCRequest<TParam> {
    jsonrpc: string
    method: string
    params: TParam | TParam[]
    id: string | number
}

export interface RPCError {
    code?: number
    message?: string
}

export interface RPCResponce<TResult> {
    jsonrpc: string
    error?: RPCError
    result?: TResult | TResult[]
    id: string | number
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
            id: '0x123'
        }
        return this.httpClient.post<RPCResponce<TResult>>(url, rpcRequest)
    }
}
