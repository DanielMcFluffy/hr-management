import { Injectable,signal } from '@angular/core';
import { 
  Observable,
  catchError, map, tap, throwError } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthHttpService } from './auth.http.services';
import { User } from '../../models/user';
import { UserTokenStoreService } from '../user-token-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService  {

  constructor(
    private authHttp: AuthHttpService,
    private userTokenStoreService: UserTokenStoreService
  ) {
    //TODO: refactor this to a generic method (verifyUser) 
    //////////////////////////////////////////
    const token = this.userTokenStoreService.getToken();
    const user = this.userTokenStoreService.getUser();

    if (!token || !user) {
      return;
    }
    
    this._user.set(user); //the user store is stateless and will be set to null on logout 
    
    // const decode = jwtDecode(token) as TokenPayload; //use the token payload interface


        //runs asynchronously
    // this.superAdminService.getAdmin(ObjectId)
    //   .pipe( //transform the data to the user interface
    //     map( adminData => { 
    //       const user: User = {
    //         admin: adminData,
    //         token: {result: {
    //           token: token,
    //           refreshToken: adminData.refreshToken
    //         }}
    //       }
    //       return user;
    //     })
    //   ).subscribe(user => this._user.set(user));

    //////////////////////////////////////////
    
  }

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
    return this.authHttp.send_login(username, password)
            .pipe(
              tap(user => {
                this._user.set(user);
                this.userTokenStoreService.setToken(user.token.result.token);
                this.userTokenStoreService.storeUser(user);
              })
            )
  }
  
  
  logout() {
    this._user.set(null);
    this.userTokenStoreService.removeToken();
  }

  verifyUser<T>() {
    //this will be a generic type that will run in the constructor
    //extracts the objectid from the token
    //get the user data from the api based on the objectid
    //set the user data to the _user signal
  }

  requestRefreshToken() {
    return this.authHttp.send_requestRefreshToken(this.user()!.token.result)
  }


}
