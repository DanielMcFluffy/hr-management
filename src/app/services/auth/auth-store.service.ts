import { Injectable,signal } from '@angular/core';
import { 
  Observable,
  catchError, map, tap, throwError } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthHttpService } from './auth.http.services';
import { User } from '../../models/user';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../../models/token';
import { SuperAdminService } from '../super-admin/super-admin.service';
import { UserTokenStoreService } from '../user-token-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService  {

  //TODO: get user data only from the token's session storage
  //extract out objectId from the token
  //get the user data from the api based on objectId (super-admin service)

  constructor(
    private authHttp: AuthHttpService,
    private superAdminService: SuperAdminService,
    private userTokenStoreService: UserTokenStoreService
  ) {
    //TODO: refactor this to a generic method (verifyUser) 
    //////////////////////////////////////////
    const token = this.userTokenStoreService.getToken();

    if (!token) {
      return;
    }

    const decode = jwtDecode(token) as TokenPayload; //use the token payload interface
    const {ObjectId} = decode;
    console.log(ObjectId)
    console.log('COnstructor ran')


    this.superAdminService.getAdmin(ObjectId)
      .pipe( //transform the data to the user interface
        map( adminData => { 
          const user: User = {
            admin: adminData,
            token: {result: {
              token: token,
              refreshToken: adminData.refreshToken
            }}
          }
          return user;
        })
      ).subscribe(user => this._user.set(user));
      
    //get the user data from the api based on ObjectId

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
