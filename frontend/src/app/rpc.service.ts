import { Injectable } from '@angular/core'
import { HttpClient, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'

import { throwError, timer, interval, of } from 'rxjs'
import { timeout, retry, retryWhen, take, concat, share, delayWhen, flatMap } from 'rxjs/operators'


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

        function httpRetry(maxRetry: number = 2, delay: number = 5000) {
            return (src: Observable<HttpEvent<any>>) => src.pipe(
                retryWhen((event) => {
                    return interval(delay)
                        .pipe(
                            flatMap((count) => { 
                                if (count === maxRetry) return throwError("Request was unsuccessful")
                                return of(count)
                            })
                        )
                })
            )
        }

        return this.httpClient
            .post<RPCResponce<TResult>>(url, rpcRequest)
    }
}
