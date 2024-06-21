import { Routes } from "@angular/router";
import { SuperAdminPermissionGroupComponent } from "../super-admin-permission-group/super-admin-permission-group.component";
import { SuperAdminAdminAccountsComponent } from "../super-admin-admin-accounts/super-admin-admin-accounts.component";
import { SuperAdminAdminDetailComponent } from "../super-admin-admin-accounts/super-admin-admin-detail/super-admin-admin-detail.component";

export const SUPER_ADMIN_ROUTES: Routes = [
    {path: 'accounts', component: SuperAdminAdminAccountsComponent},
    {path: 'accounts/:id', component: SuperAdminAdminDetailComponent},
    {path: 'permissionGroup', component: SuperAdminPermissionGroupComponent}
]