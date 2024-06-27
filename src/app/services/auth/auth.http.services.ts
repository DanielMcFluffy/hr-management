import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserAdmin } from "../../models/user";
import { HttpService } from "../http.service";
import { Api_URL_POST } from "../../models/api";
import { Token} from "../../models/token";
import { BaseResponse, LoginResponse, TokenResponse } from "../../models/response";


@Injectable({
    providedIn: 'root'
})
export class AuthHttpService {

    constructor(
        private httpService: HttpService
    ) {}

    send_login(username: string, password: string): Observable<LoginResponse> {
       return this.httpService.POST<
        {username: string, password: string},
        LoginResponse,
        Api_URL_POST
        >
        ("Account/Login", {username, password})
    }

    send_logout() {
        return this.httpService.POST<
        null,
        BaseResponse,
        Api_URL_POST
        >
        ("Account/Logout", null)
    }

    send_requestRefreshToken(userToken: Token): Observable<TokenResponse> {
        return this.httpService.POST<
        Token,
        TokenResponse,
        Api_URL_POST
        >
        ("Account/RefreshToken", userToken)
    }



}