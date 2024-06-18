import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownService } from './dropdown.service';
import { AsyncPipe } from '@angular/common';

//dropdown value object
export class DropdownValue {
  value:string;
  label:string;

  constructor(value:string,label:string) {
    this.value = value;
    this.label = label;
  }
}

@Component({
  selector: 'dropdown',
  standalone: true,
  imports: [AsyncPipe],
  providers: [DropdownService],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() values!: DropdownValue[];

  // @Input() value!: string[];

  @Output() valueChange: EventEmitter<string>;

  constructor(
    public dropdownService: DropdownService
  ) {
    this.valueChange = new EventEmitter();
  }

  select(value: string) {
    this.valueChange.emit(value);
    console.log('selected value:', value);
  }
}
