import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';
import {   ActivatedRoute, RouterModule } from '@angular/router';
import { AuthStoreService } from '../../../services/auth/auth-store.service';
@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule, MatIcon, MatButtonModule, SidebarButtonComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  
  @Output() isOpen$ = new EventEmitter<boolean>();
  @Input() isOpen = false;
  @Input() isExpand = false;
  isSuperAdmin!: boolean;

  constructor(
    private route: ActivatedRoute,
    private authStore: AuthStoreService,
  ) {
    this.isSuperAdmin = this.authStore.user()!.admin.isSuperAdmin || false;
  }

  openSidebar() {
    if (this.isOpen) {
      this.isOpen$.emit(false);
      return;
    }
    this.isOpen$.emit(true);
  }

  expandButton($event: MouseEvent | any) {


      if ($event.target.offsetParent.className === 'employee-menu' ) {
        return;
      }
      //window.location.href will return the absolute URL of the current page
      if (!window.location.href.includes('employee') && !this.isExpand) { 
        this.isExpand = true;
        return;
      } else if (window.location.href.includes('employee') && this.isExpand) {
        this.isExpand = false;
        return;
      } else if (window.location.href.includes('employee') && !this.isExpand) {
        this.isExpand = true;
        return;
      }
  }

  //stop propogation of event from child button to parent button (which will trigger a page redirect in this case)
  stopPropogation($event: Event) {
    $event.stopPropagation();

  }
}
