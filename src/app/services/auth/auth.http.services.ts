import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserAdmin } from "../../models/user";
import { HttpService } from "../http.service";
import { Api_URL_POST } from "../../models/api";

interface token {
    token: string;
    refreshToken: string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthHttpService {

    constructor(
        private httpService: HttpService
    ) {}

    send_login(username: string, password: string): Observable<UserAdmin> {
       return this.httpService.POST<
        {username: string, password: string},
        UserAdmin,
        Api_URL_POST
        >
        ("Account/Login", {username, password})
    }

    send_logout() {
        return this.httpService.POST<
        null,
        any,
        Api_URL_POST
        >
        ("Account/Logout", null)
    }

    send_requestRefreshToken(userToken: token): Observable<token> {
        return this.httpService.POST<
        token,
        token,
        Api_URL_POST
        >
        ("Account/RefreshToken", userToken)
    }



}