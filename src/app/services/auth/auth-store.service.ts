import { Injectable,signal } from '@angular/core';
import { 
  Observable,
  catchError, map, tap, throwError } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthHttpService } from './auth.http.services';
import { UserAdmin } from '../../models/user';
import { UserTokenStoreService } from '../user-token-store.service';
import { LoginResponse } from '../../models/response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService  {

  constructor(
    private authHttp: AuthHttpService,
    private userTokenStoreService: UserTokenStoreService,
    private router: Router
  ) {
    //TODO: refactor this to a generic method (verifyUser) 
    //////////////////////////////////////////
    const token = this.userTokenStoreService.getToken();
    const user = this.userTokenStoreService.getUser();

    if (!token || !user) {
      return;
    }
    
    this._user.set(user); //the user store is stateless and will be set to null on logout 
    
  }

  //user store
  private _user = signal<UserAdmin | null>(null);
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
  
  login(username: string, password: string): Observable<LoginResponse> {
    //call the api to login
    return this.authHttp.send_login(username, password)
            .pipe(
              tap(res => {
                const user: UserAdmin = {
                  auth: res.auth,
                  admin: res.result
                };
                this._user.set(user);
                this.userTokenStoreService.setToken(res.auth.token);
                this.userTokenStoreService.storeUser(user);
              })
            )
  }
  
  
  logout() {
    this.authHttp.send_logout().subscribe(() => {
      console.log("logged out");
      this._user.set(null);
      this.userTokenStoreService.clearUser();
      this.userTokenStoreService.removeToken();
      this.router.navigate(['/home']);
    })
  }

  // verifyUser<T>() {
  //   //this will be a generic type that will run in the constructor
  //   //extracts the objectid from the token
  //   //get the user data from the api based on the objectid
  //   //set the user data to the _user signal
  // }

  requestRefreshToken() {
    return this.authHttp.send_requestRefreshToken(this.user()!.auth)
  }


}
