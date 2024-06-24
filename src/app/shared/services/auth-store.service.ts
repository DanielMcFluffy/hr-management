import { Injectable, signal } from '@angular/core';
import { 
  Observable,
  Subscription,
  catchError, map, shareReplay, tap, throwError } from 'rxjs';
import { User } from '../../models/user';
import { toObservable } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  constructor(
    private http: HttpClient,
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

  login(username: string, password: string): Observable<User> {
    //call the api to login
    return this.http.post<User>(`${this.API_URL}/api/Account/Login`, {username, password})
            .pipe(
              catchError(err => {
                console.log(err);
                return throwError(() => new Error(err.error));
              }),
              tap(user => this._user.set(user))
            )
  }

  logout() {
    this._user.set(null);
  }

}
