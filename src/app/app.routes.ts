import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminAccountsComponent } from './admin/admin-accounts/admin-accounts.component';
import { AdminPermissionGroupComponent } from './admin/admin-permission-group/admin-permission-group.component';
import { AdminDetailComponent } from './admin/admin-accounts/admin-detail/admin-detail.component';
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  //layout route for admin
  {
    path: 'admin/dashboard',
    component: DashboardContainerComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminDashboardComponent },
      { path: 'accounts', component: AdminAccountsComponent },
      { path: 'accounts/:id', component: AdminDetailComponent },
      { path: 'permissionGroup', component: AdminPermissionGroupComponent },
    ],
  },
  //layout route for employee
  { path: '**', component: PageNotFoundComponent },
];
