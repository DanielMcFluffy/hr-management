import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api_URL } from "../../environment/environment";
import { User } from "../../models/user";

interface token {
    token: string;
    refreshToken: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthHttpService {

    private API_URL = api_URL;
    
    constructor(
        private http: HttpClient,
    ) {}

    login_POST(username: string, password: string):Observable<User> {
        return this.http.post<User>(`${this.API_URL}/api/Account/Login`, {username, password})
    }

    refreshToken_POST(userToken: token): Observable<token> {
        return this.http.post<token>(`${this.API_URL}/api/Account/RefreshToken`, userToken)
    }
    

}