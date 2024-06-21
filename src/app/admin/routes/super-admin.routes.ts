import { Routes } from "@angular/router";
import { SuperAdminPermissionGroupComponent } from "../super-admin-permission-group/super-admin-permission-group.component";
import { SuperAdminAdminAccountsComponent } from "../super-admin-admin-accounts/super-admin-admin-accounts.component";
import { SuperAdminAdminDetailComponent } from "../super-admin-admin-accounts/super-admin-admin-detail/super-admin-admin-detail.component";

export const SUPER_ADMIN_ROUTES: Routes = [
    {path: 'accounts', component: SuperAdminAdminAccountsComponent},
    {path: 'accounts/:id', component: SuperAdminAdminDetailComponent},
    {path: 'permissionGroup', component: SuperAdminPermissionGroupComponent},
    {path: 'employee', loadComponent: () => import('../admin-employee/admin-employee.component').then(c => c.AdminEmployeeComponent),
        children: [
            { path: 'department', loadComponent: () => import('../admin-employee/admin-employee-department/admin-employee-department.component').then(c => c.AdminEmployeeDepartmentComponent)},
            { path: 'attendance', loadComponent: () => import ('../admin-employee/admin-employee-attendance/admin-employee-attendance.component').then(c => c.AdminEmployeeAttendanceComponent)},
            { path: 'payroll', loadComponent: () => import ('..//admin-employee/admin-employee-payroll/admin-employee-payroll.component').then(c => c.AdminEmployeePayrollComponent)},
            ]
        },
        {path: 'projects', loadComponent: () => import('../admin-projects/admin-projects.component').then(c => c.AdminProjectsComponent)},
        {path: 'schedule', loadComponent: () => import('../admin-schedule/admin-schedule.component').then(c => c.AdminScheduleComponent)},
        {path: 'leave', loadComponent: () => import('../admin-leave/admin-leave.component').then(c => c.AdminLeaveComponent)},
]