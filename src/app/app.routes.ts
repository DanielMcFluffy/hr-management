import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { adminAuthGuard } from './shared/guards/admin-auth.guard';
import { SuperAdminDashboardComponent } from './admin/super-admin-dashboard/super-admin-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  //layroute for superadmin
  {
    path: 'superadmin/dashboard', 
    loadComponent: () => import('./containers/dashboard-container/dashboard-container.component').then(c => c.DashboardContainerComponent), 
    canActivate: [adminAuthGuard],
    children: [
      {path: '', component: SuperAdminDashboardComponent},
      {path: '', loadChildren: () => import('./admin/routes/super-admin.routes').then(r => r.SUPER_ADMIN_ROUTES)},
    ],
  },

  //layout route for admin
  {
    path: 'admin/dashboard', 
    loadComponent: () => import('./containers/dashboard-container/dashboard-container.component').then(c => c.DashboardContainerComponent), 
    canActivate: [adminAuthGuard],
    children: [
      {path: '', component: AdminDashboardComponent},
      {path: '', loadChildren: () => import('./admin/routes/admin.routes').then(r => r.ADMIN_ROUTES)},
      
    ],
  },
  //layout route for employee
  { path: '**', component: PageNotFoundComponent },
];
