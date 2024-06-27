import { Injectable } from "@angular/core";
import { SuperAdminHttpService } from "./super-admin.http.service";
import { Observable } from "rxjs";
import { Admin } from "../../models/admin";

@Injectable({
    providedIn: 'root'
})
export class SuperAdminService {

    
    constructor(
        private superAdminHttpService: SuperAdminHttpService
    ) {
        
    }

    getAdmins(): Observable<Admin[]>  {
        return this.superAdminHttpService.send_getAdmins();
    }

    getAdmin(id: string): Observable<Admin> {
        return this.superAdminHttpService.send_getAdmin(id);
    }

    createAdmin(admin: Admin): Observable<any> {
        return this.superAdminHttpService.send_createAdmin(admin);
    }

    updateAdmin(id: string, updatedAdmin: Partial<Admin>): Observable<any> {
        return this.superAdminHttpService.send_updateAdmin(id, updatedAdmin);
    }

    deleteAdmin(id: string): Observable<any> {
        return this.superAdminHttpService.send_deleteAdmin(id);
    }
}