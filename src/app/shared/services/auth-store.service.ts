import { Injectable, signal } from '@angular/core';
import { 
  Observable,
  Subscription,
  catchError, map, shareReplay, throwError } from 'rxjs';
import { User } from '../../models/user';
import { toObservable } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  
  private API_URL = 'https://localhost:7022'

  //user store
  private _user = signal<User | null>(null);
  user = this._user.asReadonly();
  user$ = toObservable(this._user); 

  isLoggedIn$ = this.user$.pipe(
    catchError(err => {
      const message = err.error.message;
      console.log(message, err);
      return throwError(() => new Error(message));
    }),
    map(user => !!user),
  );
  
  isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

  login(username: string, password: string): Subscription {
    //call the api to login
    return this.http.post<User>(`${this.API_URL}/api/Account/Login`, {username, password})
            .pipe(
              catchError(err => {
                const message = "Cannot login!";
                console.log(message, err);
                return throwError(() => new Error(message));
              }),
              shareReplay()
            ).subscribe(user => {
              this._user.set(user);
              setTimeout(() => {
                this.user()?.admin.isSuperAdmin ? 
                this.router.navigate(['/superadmin/dashboard']) :
                this.router.navigate(['/admin/dashboard']);
              }, 2000);
            });
    
  }

  logout() {
    this._user.set(null);
  }

}
