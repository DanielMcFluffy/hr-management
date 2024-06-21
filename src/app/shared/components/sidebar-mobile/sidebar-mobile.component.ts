import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SidebarMobileToolbarService } from '../../services/sidebar-mobile-toolbar.service';
import { AuthStoreService } from '../../services/auth-store.service';
import { SidebarMobileButtonComponent } from './sidebar-mobile-button/sidebar-mobile-button.component';

@Component({
  selector: 'sidebar-mobile',
  standalone: true,
  imports: [RouterModule, MatIcon, MatButtonModule, SidebarMobileButtonComponent],
  templateUrl: './sidebar-mobile.component.html',
  styleUrl: './sidebar-mobile.component.scss'
})
export class SidebarMobileComponent {

@Input() isOpen = false;
isSuperAdmin!: boolean;


constructor(
  private authStore: AuthStoreService,
  public MobileToolbarService: SidebarMobileToolbarService
) {
  this.isSuperAdmin = this.authStore.user()?.admin.isSuperAdmin || false;
}

}
