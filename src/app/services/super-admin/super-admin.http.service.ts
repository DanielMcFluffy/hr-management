import { Injectable } from "@angular/core";
import { HttpService } from "../http.service";
import { Observable } from "rxjs";
import { Admin } from "../../models/admin";
import { Api_URL_DELETE, Api_URL_GET, Api_URL_POST } from "../../models/api";
import { Response } from "../../models/response";

@Injectable({
    providedIn:'root'
})
export class SuperAdminHttpService {

    constructor (
        private httpService: HttpService,
    ) {
    }

    send_getAdmins(): Observable<Response<Admin[]>> {
        return this.httpService.GET<
        Response<Admin[]>,
        Api_URL_GET
        >("Admin")
    }

    send_getAdmin(id: string): Observable<Response<Admin>> {
        return this.httpService.GET<
        Response<Admin>,
        Api_URL_GET
        >("Admin/View/", id)
    }

    //TODO: not sure what to return here for now
    send_createAdmin(admin: Admin): Observable<any> {
        return this.httpService.POST<
        Admin,
        any,
        Api_URL_POST
        >("Admin/Create", admin)
    }

    //TODO: not sure what to return here for now
    send_updateAdmin(id: string, updatedAdmin: Partial<Admin>): Observable<any> {
        return this.httpService.POST<
        Partial<Admin>,
        any,
        Api_URL_POST
        >("Admin/Update/", updatedAdmin, id)
    }

    //TODO: not sure what to return here for now
    send_deleteAdmin(id: string): Observable<any> {
        return this.httpService.DELETE<
        any,
        Api_URL_DELETE
        >("Admin/", id)
    }


}