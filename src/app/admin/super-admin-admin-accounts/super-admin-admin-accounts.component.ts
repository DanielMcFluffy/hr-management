import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../../services/super-admin/super-admin.service';
import { Admin } from '../../models/admin';
import { Observable } from 'rxjs';
import { SuperAdminAdminDetailComponent } from './super-admin-admin-detail/super-admin-admin-detail.component';
import { DetailTableComponent } from '../../shared/components/detail-table/detail-table.component';


@Component({
  selector: 'app-admin-accounts',
  standalone: true,
  imports: [CommonModule, SuperAdminAdminDetailComponent, DetailTableComponent ],
  templateUrl: './super-admin-admin-accounts.component.html',
  styleUrl: './super-admin-admin-accounts.component.scss'
})
export class SuperAdminAdminAccountsComponent implements OnInit {

  admins!: Observable<Admin[]>;
  

  isAdminDetailClicked = false;

  constructor(
    private superAdminService: SuperAdminService,
  ) {
  }
  
  ngOnInit(): void {
    this.admins = this.superAdminService.getAdmins();
}


}
