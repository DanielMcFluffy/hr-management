import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class SuperAdminHttpService {

    private API_URL = 'https://localhost:7022';

    constructor (
        private http: HttpClient
    ) {}

    getAdmins_GET() {

    }

    //TODO: Write a base genric service for all the http services 

}