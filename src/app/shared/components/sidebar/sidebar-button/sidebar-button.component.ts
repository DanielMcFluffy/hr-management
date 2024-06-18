import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'sidebar-button',
  standalone: true,
  imports: [ MatIcon, MatButtonModule],
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.scss'
})
export class SidebarButtonComponent {
  @Input() isOpen = false;

  @Input() iconName!: string;

  @Input() label!: string;
}
