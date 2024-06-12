import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-detail',
  standalone: true,
  imports: [],
  templateUrl: './admin-detail.component.html',
  styleUrl: './admin-detail.component.scss'
})
export class AdminDetailComponent {
  constructor(
    private route: ActivatedRoute
  ) {}

  id = this.route.snapshot.paramMap.get('id');
}
