import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//this service is responsible for updating the toolbar template when a user is using the mobile sidebar
@Injectable({
  providedIn: 'root'
})
export class SidebarMobileToolbarService {

  constructor(
  ) { }

  private subject = new BehaviorSubject<string>('Welcome');

  page$ = this.subject.asObservable();


  //method to emit the page name
  setPage(page: string) {
    this.subject.next(page);
  }

}
