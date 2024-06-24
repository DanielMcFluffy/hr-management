import { Injectable, signal } from '@angular/core';
import { 
  Observable,
  catchError, map, tap, throwError } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthHttpService } from './auth.http.services';
import { User } from '../../models/user';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  //TODO: get user data only from the token's session storage
  //extract out objectId from the token
  //get the user data from the api based on objectId (super-admin service)

  constructor(
    private tokenService: TokenService,
    private authHttp: AuthHttpService,
  ) { }
  
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
    return this.authHttp.login_POST(username, password)
            .pipe(
              catchError(err => {
                console.log(err);
                return throwError(() => new Error(err.error));
              }),
              tap(user => {
                this._user.set(user);
                this.tokenService.setToken(user.token.result.token);
              })
            )
  }

  logout() {
    this._user.set(null);
    this.tokenService.removeToken();
  }

}
