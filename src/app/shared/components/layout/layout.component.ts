import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {



  @Input() init!: boolean;
  @Output() opened = new EventEmitter<boolean>();

  active = false;
  showOverlay = false;

  ngOnInit() {
    this.active = this.init || false;
  }

  onBurgerClicked() {
    this.active = !this.active;
    this.showOverlay = !this.showOverlay; 
    this.opened.emit(this.active);
  }

}
