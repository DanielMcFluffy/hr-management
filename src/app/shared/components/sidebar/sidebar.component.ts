import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';
import {   NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

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

  constructor(
    private router: Router
  ) {
    
  }

  openSidebar() {
    if (this.isOpen) {
      this.isOpen$.emit(false);
      return;
    }
    this.isOpen$.emit(true);
  }

  expandButton($event: MouseEvent | any) {

      // console.log($event.target.offsetParent.className);
      if ($event.target.offsetParent.className === 'employee-menu' ) {
        return;
      }

      // this.router.events.pipe(
      //   filter(event => event instanceof NavigationEnd)
      // ).subscribe((event: any) => {
      //   const url = event.url as string;
      //   if (url.includes('employee')) {
      //     console.log(url);
      //   }
      // });
      this.isExpand = !this.isExpand;
      
  }

  //stop propogation of event from child button to parent button (which will trigger a page redirect in this case)
  stopPropogation($event: Event) {
    $event.stopPropagation();

  }
}
