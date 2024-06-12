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

  @HostListener('window:resize', ['$event'])
  //event.target.innerwidth is the width of the window
  onResize(event: any) {
    this.hideOverlay(event.target.innerWidth);
  }

  active = false;
  showOverlay = false;
  maxWidth = 548; //max width for the overlay to be shown

  ngOnInit() {
    this.active = this.init || false;
  }

  onBurgerClicked() {
    this.active = !this.active;
    this.showOverlay = !this.showOverlay; 
    this.opened.emit(this.active);
  }

  hideOverlay(width: number) {
    if (width > this.maxWidth && this.showOverlay) {
      this.showOverlay = false;
      this.active = !this.active;
      this.opened.emit(this.active);
    }
  }

}
