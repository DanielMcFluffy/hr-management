import { Component, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, NgForm,  ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

showSuccessMessage = false;

//form data
  email = '';
  password = '';

  constructor(
    private router: Router,
  ) {
  }

  //view form data
  submitForm() {
    console.log(this.form);
    if (this.form.valid) {
      //trigger send data to server
      //if response is 200 redirect to admin dashboard while including a success message
      //if request is unsuccessful display error message (500)
      //if response is 400 display error message


      //if login successful redirect to admin dashboard
      this.showSuccessMessage = true;
      this.form.resetForm();
      setTimeout(() => {
        this.router.navigate(['/admin/dashboard']);
      }, 2000);
    }

  }
}
