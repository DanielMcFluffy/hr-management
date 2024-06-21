import { Component, OnInit, ViewChild, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, NgForm,  ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthStoreService } from '../../shared/services/auth-store.service';
import { MessagesComponent } from '../../shared/components/messages/messages.component';

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
    CommonModule,
    MessagesComponent
   ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit{


  ngOnInit(): void {
  }

  //hide password property and methods
  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }


  //access form data 
  @ViewChild('form') form!: NgForm;

showSuccessMessage = false; //message service pending

//form data
  username = '';
  password = '';

  constructor(
    private authStore: AuthStoreService,
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
      this.authStore.login(this.username, this.password);
      // this.showSuccessMessage = true; // TODO: implement message service
      this.form.resetForm();
    }

  }
}
