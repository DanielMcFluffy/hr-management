import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../../components/layout/layout.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SidebarMobileComponent } from '../../components/sidebar-mobile/sidebar-mobile.component';

@Component({
  selector: 'app-layout-route',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, SidebarComponent, SidebarMobileComponent, CommonModule],
  templateUrl: './layout-route.component.html',
  styleUrl: './layout-route.component.scss'
})
export class LayoutRouteComponent {
  isOpen = false;
  mobileIsOpen = false;
  private readonly minWidth = 976;
  private previousWidth = window.innerWidth; // Initialize with the current screen width

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustSidebarOnResize(event.target.innerWidth);
  }

  constructor() {
    this.adjustSidebarOnResize(window.innerWidth);
  }

  private adjustSidebarOnResize(width: number) {
    if ((width < this.minWidth) && (width < this.previousWidth)) {
      this.isOpen = false;
    }
    this.previousWidth = width; // Update the previousWidth after each adjustment
  }

  checkOpen(event: boolean) {
    this.mobileIsOpen = event;
  }
}
