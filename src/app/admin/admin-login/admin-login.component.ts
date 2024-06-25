import { Component, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, NgForm,  ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from '../../shared/components/messages/messages.component';
import { MessageService } from '../../shared/components/messages/message.service';
import { Router } from '@angular/router';
import { AuthStoreService } from '../../services/auth/auth-store.service';

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
   providers: [MessageService],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit{


  
  //hide password property and methods
  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
  
  
  //access form data 
  @ViewChild('form') form!: NgForm;
  
  
  //form data
  username = '';
  password = '';
  
  time!: Date;
  
  constructor(
    private authStore: AuthStoreService,
    private messageService: MessageService,
    private router: Router
  ) {
  }
  
  ngOnInit(): void {
    this.runClock();
  }

  runClock() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }


  //view form data
  submitForm() {
    console.log(this.form);
    if (this.form.valid) {

      this.authStore.login(this.username, this.password)
      .subscribe({
        next: user => {
          this.messageService.setMessage('Login successful!', true);
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
          console.log({"expired": new Date(`${this.authStore.user()?.admin.refreshTokenExpiry}`)})
        },
        error: err => {
          this.messageService.setMessage(err.message, false);
          console.log(err);
        }
      
      } );
      this.form.resetForm();
    }

  }
}
