import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'

//import 'rxjs/add/operator/timeout'
import { concatMap, timeout, catchError, delay } from 'rxjs/operators'


@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ) : Observable<HttpEvent<any>> {

        //console.log(req)

        return next.handle(req)
            .pipe(
                timeout(3000),
                //catchError((error) => {'Request timed out'}
            )
    }

}
