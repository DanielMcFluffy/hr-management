import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-detail',
  standalone: true,
  imports: [],
  templateUrl: './super-admin-admin-detail.component.html',
  styleUrl: './super-admin-admin-detail.component.scss'
})
export class SuperAdminAdminDetailComponent {
  constructor(
    private route: ActivatedRoute
  ) {}

  id = this.route.snapshot.paramMap.get('id');
}
