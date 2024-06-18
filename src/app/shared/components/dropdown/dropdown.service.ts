import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable() 
export class DropdownService {
  constructor() {
    console.log('DropdownService created');
  }

  private subject = new BehaviorSubject<boolean>(false);

  dropdownIsOpen$ = this.subject.asObservable();

    openDropdown() {
        this.subject.next(true);
    }

    closeDropdown() {
        this.subject.next(false);
    }

}