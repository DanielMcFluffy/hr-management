import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule, MatIcon, MatButtonModule, SidebarButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  
  @Output() isOpen$ = new EventEmitter<boolean>();
  @Input() isOpen = false;
  @Input() isExpand = false;



  openSidebar() {
    if (this.isOpen) {
      this.isOpen$.emit(false);
      return;
    }
    this.isOpen$.emit(true);
  }

  expandButton($event: MouseEvent | any) {

      console.log($event.target.offsetParent.className);
      if ($event.target.offsetParent.className === 'employee-menu' ) {
        return;
      }
      this.isExpand = !this.isExpand;
  }
}
