import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SidebarMobileToolbarService } from '../../../../services/sidebar-mobile-toolbar.service';

@Component({
  selector: 'sidebar-mobile-button',
  standalone: true,
  imports: [MatIcon, MatButtonModule,],
  templateUrl: './sidebar-mobile-button.component.html',
  styleUrl: './sidebar-mobile-button.component.scss'
})
export class SidebarMobileButtonComponent {
  @Input() iconName!: string;
  @Input() label!: string;
  @Input() pageLabel!: string;

  constructor(
    public MobileToolbarService: SidebarMobileToolbarService
  ) {}
  
}
