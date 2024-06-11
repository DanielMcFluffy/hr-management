import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidebar-mobile',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-mobile.component.html',
  styleUrl: './sidebar-mobile.component.scss'
})
export class SidebarMobileComponent {

@Input() isOpen = false;

}
