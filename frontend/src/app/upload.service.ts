import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

    constructor(private httpClient: HttpClient) {}

    uploadFile(url: string, file: File, name: string) : Observable<HttpEvent<any>> {
        let formData = new FormData();
        formData.append(name, file, name);

        let params = new HttpParams();
        const options = {
            params: params,
            reportProgress: true,
        }

        const req = new HttpRequest('POST', url, formData, options);
        return this.httpClient.request(req);
    }
}
