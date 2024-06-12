import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { LayoutRouteComponent } from './shared/pages/layout-route/layout-route.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
   {path: '', redirectTo: '/home', pathMatch: 'full'},
   {path: 'home', component: HomeComponent},
   {path: 'admin/login', component: AdminLoginComponent},
   //layout route for admin
   {path: 'admin/dashboard', component:LayoutRouteComponent, children: [
    {path: 'test', component: PageNotFoundComponent},
   ]},
   //layout route for employee
   {path: '**', component: PageNotFoundComponent},
];
