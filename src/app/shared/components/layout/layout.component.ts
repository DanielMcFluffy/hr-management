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
    this.currentWidth = event.target.innerWidth;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any) {

    //error handling for the sidebar --current setup will throw an error of accessing the classList of null
    // if the sidebar is opened and the user clicks outside the sidebar, the sidebar will close
    try {
      if (
        event.target.classList.contains('main-content') || 
        event.target.children['0'].classList.contains('overlay')
      ) {
        this.active = false;
        this.showOverlay = false;
        this.opened.emit(this.active);
      }
      
    } catch (error) {
      console.log('Sidebar opened')
    }

  }

  active = false;
  showOverlay = false;
  currentWidth!: number;
  maxWidth = 548; //max width for the overlay to be shown

  ngOnInit() {
    this.active = this.init || false;
    this.currentWidth = window.innerWidth;
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
