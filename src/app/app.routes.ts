import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminAccountsComponent } from './admin/admin-accounts/admin-accounts.component';
import { AdminPermissionGroupComponent } from './admin/admin-permission-group/admin-permission-group.component';
import { AdminDetailComponent } from './admin/admin-accounts/admin-detail/admin-detail.component';
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';
import { AdminEmployeeComponent } from './admin/admin-employee/admin-employee.component';
import { AdminEmployeeDepartmentComponent } from './admin/admin-employee/admin-employee-department/admin-employee-department.component';
import { AdminEmployeeAttendanceComponent } from './admin/admin-employee/admin-employee-attendance/admin-employee-attendance.component';
import { AdminEmployeePayrollComponent } from './admin/admin-employee/admin-employee-payroll/admin-employee-payroll.component';
import { AdminProjectsComponent } from './admin/admin-projects/admin-projects.component';
import { AdminScheduleComponent } from './admin/admin-schedule/admin-schedule.component';
import { AdminLeaveComponent } from './admin/admin-leave/admin-leave.component';
import { adminAuthGuard } from './shared/guards/admin-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  //layout route for admin
  {
    path: 'admin/dashboard',
    component: DashboardContainerComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminDashboardComponent },
      { path: 'accounts', component: AdminAccountsComponent },
      { path: 'accounts/:id', component: AdminDetailComponent },
      { path: 'permissionGroup', component: AdminPermissionGroupComponent },
      { path: 'employee', component: AdminEmployeeComponent, 
        children: [
          { path: 'department', component: AdminEmployeeDepartmentComponent, pathMatch: 'full' },
          { path: 'attendance', component: AdminEmployeeAttendanceComponent },
          { path: 'payroll', component: AdminEmployeePayrollComponent },
        ]
       },
      { path: 'projects', component: AdminProjectsComponent },
      { path: 'schedule', component: AdminScheduleComponent },
      { path: 'leave', component: AdminLeaveComponent },


    ],
  },
  //layout route for employee
  { path: '**', component: PageNotFoundComponent },
];
