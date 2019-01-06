import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

    constructor(private httpClient: HttpClient) {
    }

    uploadFile(url: string, file: File) : Observable<HttpEvent<any>> {
        let formData = new FormData();
        formData.append('upload', file);

        let params = new HttpParams();
        const options = {
            params: params,
            reportProgress: true,
        }

        const req = new HttpRequest('POST', url, formData, options);
        return this.httpClient.request(req);
    }


    uploadFiles(url: string, files: File[]) : Observable<HttpEvent<any>> {
        var formData = new FormData();
        for (var i: number; i < files.length; i++) { 
            formData.append('upload', files[i])
        }

        var params = new HttpParams();
        const options = {
            params: params,
            reportProgress: true,
        }

        const req = new HttpRequest('POST', url, formData, options);
        return this.httpClient.request(req);
    }


}
