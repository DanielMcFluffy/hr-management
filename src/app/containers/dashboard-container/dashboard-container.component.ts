import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../../shared/components/toolbar/toolbar.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SidebarMobileComponent } from '../../shared/components/sidebar-mobile/sidebar-mobile.component';

@Component({
  selector: 'dashboard-container',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutComponent,
    SidebarComponent,
    SidebarMobileComponent,
    CommonModule,
  ],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss',
})
export class DashboardContainerComponent implements OnInit {
  isOpen = true;
  mobileIsOpen = false;
  private readonly minWidth = 976;
  private readonly maxWidth = 1278;
  private previousWidth = window.innerWidth; // Initialize with the current screen width

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustSidebarOnResize(event.target.innerWidth);
  }

  constructor(
  ) {
  }
  
  ngOnInit(): void {
    this.adjustSidebarOnResize(window.innerWidth);

  }

  private adjustSidebarOnResize(width: number) {
    if (width < this.minWidth && width < this.previousWidth) {
      this.isOpen = false;
    } else if (width > this.maxWidth && width > this.previousWidth) {
      this.isOpen = true;
    
    }
    this.previousWidth = width; // Update the previousWidth after each adjustment
  }
 
  checkOpen(event: boolean) {
    this.mobileIsOpen = event;
  }

}
