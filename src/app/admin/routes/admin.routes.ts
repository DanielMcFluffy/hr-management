import { Routes } from "@angular/router";

export const ADMIN_ROUTES: Routes = [
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