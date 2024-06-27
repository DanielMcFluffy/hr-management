import { Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

import { superAdminAuthGuard } from './guards/super-admin-auth.guard';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { permissionGuard } from './guards/permission.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin/login', component: AdminLoginComponent,
   },


  {path: 'dashboard', loadComponent: () => import('./containers/dashboard-container/dashboard-container.component').then(c => c.DashboardContainerComponent),
    children: [
      {path: '', redirectTo: 'superadmin', pathMatch: 'full'},
      {
        path: 'superadmin', 
        loadComponent: () => import('./admin/super-admin-dashboard/super-admin-dashboard.component').then(c => c.SuperAdminDashboardComponent), 
        canActivate: [superAdminAuthGuard],
        children: [
          {path: '', loadChildren: () => import('./admin/routes/super-admin.routes').then(r => r.SUPER_ADMIN_ROUTES)},
        ],
      },
      {path: 'admin', 
      loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.component').then(c => c.AdminDashboardComponent),
      canActivate: [adminAuthGuard],
      },
      //shared routes
      {path: 'employee', 
      loadComponent: () => import('./admin/admin-employee/admin-employee.component').then(c => c.AdminEmployeeComponent),
      canActivate: [adminAuthGuard, permissionGuard],
        children: [
            { path: 'department', 
            loadComponent: () => import('./admin/admin-employee/admin-employee-department/admin-employee-department.component').then(c => c.AdminEmployeeDepartmentComponent),
            canActivate: [adminAuthGuard, permissionGuard],
            },
            { path: 'attendance', loadComponent: () => import ('./admin/admin-employee/admin-employee-attendance/admin-employee-attendance.component').then(c => c.AdminEmployeeAttendanceComponent),
            canActivate: [adminAuthGuard, permissionGuard],
            },
            { path: 'payroll', loadComponent: () => import ('./admin/admin-employee/admin-employee-payroll/admin-employee-payroll.component').then(c => c.AdminEmployeePayrollComponent),
            canActivate: [adminAuthGuard, permissionGuard],
            },
            ]
        },
        {path: 'projects', 
        loadComponent: () => import('./admin/admin-projects/admin-projects.component').then(c => c.AdminProjectsComponent),
        canActivate: [adminAuthGuard, permissionGuard]
        },
        {path: 'schedule', 
        loadComponent: () => import('./admin/admin-schedule/admin-schedule.component').then(c => c.AdminScheduleComponent),
        canActivate: [adminAuthGuard, permissionGuard]
        },
        {path: 'leave', 
        loadComponent: () => import('./admin/admin-leave/admin-leave.component').then(c => c.AdminLeaveComponent),
        canActivate: [adminAuthGuard, permissionGuard]
        },
    ]
  },

  //layout route for employee
  { path: '**', component: PageNotFoundComponent },
];
