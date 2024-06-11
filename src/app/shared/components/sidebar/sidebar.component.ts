import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  
  @Output() isOpen$ = new EventEmitter<boolean>();
  @Input() isOpen = false;

  openSidebar() {
    if (this.isOpen) {
      this.isOpen$.emit(false);
      return;
    }
    this.isOpen$.emit(true);
  }
}
