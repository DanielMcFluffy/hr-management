//generic http service

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, shareReplay, throwError } from "rxjs";
import { Api_URL_DELETE, Api_URL_GET, Api_URL_POST } from "../models/api";
import { base_Api_URL } from "../environment/environment";
import { BaseResponse } from "../models/response";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    httpAuthClient!: HttpClient;

    constructor(
        private http: HttpClient,
    ) {
    }

    GET<
    TResponse extends BaseResponse,
    TApi_URL extends Api_URL_GET
    >
    (api_url: TApi_URL, id?: string): Observable<TResponse> {
        return this.http.get<TResponse>(base_Api_URL + api_url + (id || ''))
            .pipe(
                catchError(err => {
                    console.error(err);
                    return throwError(() => new Error(err.error.response.message));
                    }
                )
            )
    }

    POST<
    TRequest,
    TResponse extends BaseResponse,
    TApi_URL extends Api_URL_POST,
    >
    (api_url: TApi_URL, request: TRequest, id?: string): Observable<TResponse> {
        return this.http.post<TResponse>(base_Api_URL + api_url + (id || ''), request)
            .pipe(
                catchError(err => {
                    console.error(err);
                    return throwError(() => new Error(err.error.response.message));
                    }
                ),
                shareReplay()
            )
    }

    DELETE<
    TResponse extends BaseResponse,
    TApi_URL extends Api_URL_DELETE
    >
    (api_url: TApi_URL, id: string): Observable<TResponse> {
        return this.http.delete<TResponse>(base_Api_URL + api_url + id)
            .pipe(
                catchError(err => {
                    console.error(err);
                    return throwError(() => new Error(err.error.response.message));
                    }
                )
            )
    }

}