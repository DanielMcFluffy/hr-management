import { Component, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    FormsModule,
    CommonModule ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  //hide password property and methods
  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  //access form data 
  @ViewChild('form') form!: NgForm;

  //form validity
  formValid!: boolean;

  loginAttempted = false;

//form data
  email = '';
  password = '';

  // //form control validation function 
  // checkControl(control: NgModel) {
  //   if (control.control.value && control.control.value.length > 10)
  // }

  //view form data
  submitForm() {
    this.loginAttempted = true; 
    console.log(this.form);
    if (!this.form.valid && (this.email || this.password)) {
      this.formValid = false;
    }
    else if (this.formValid) {
      // this.loginAttempted = false;
      this.formValid = true;
    }
    
  }
}
