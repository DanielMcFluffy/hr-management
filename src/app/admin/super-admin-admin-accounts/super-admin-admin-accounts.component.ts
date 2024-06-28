import { CommonModule } from '@angular/common';
import {  Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { SuperAdminService } from '../../services/super-admin/super-admin.service';
import { Admin } from '../../models/admin';
import { Observable, map } from 'rxjs';
import { SuperAdminAdminDetailComponent } from './super-admin-admin-detail/super-admin-admin-detail.component';
import { DetailTableComponent } from '../../shared/components/detail-table/detail-table.component';

@Component({
  selector: 'app-admin-accounts',
  standalone: true,
  imports: [CommonModule, SuperAdminAdminDetailComponent, DetailTableComponent],
  templateUrl: './super-admin-admin-accounts.component.html',
  styleUrl: './super-admin-admin-accounts.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class SuperAdminAdminAccountsComponent implements OnInit {

  //these will be passed into the detail table component as inputs
  //different components that use this detail-table component will have their own data source and columns
  admins!: Observable<Admin[]>;
  columns: (keyof Admin)[] = ['username', 'email', 'isLogin', 'permission'];

  isAdminDetailClicked = false;

  constructor(
    private superAdminService: SuperAdminService,
  ) {
  }
  
  ngOnInit(): void {
    this.admins = this.superAdminService.getAdmins().pipe(
      map(res => res.result)
    )
}


}
