import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  constructor() { }

  private subject = new BehaviorSubject<User | null>(null);

  user$ = this.subject.asObservable();

  isLoggedIn$ = this.user$.pipe(
    catchError(err => {
      const message = err.error.message;
      console.log(message, err);
      return throwError(() => new Error(message));
    }),
    map(user => !!user),
  );
  
  isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

  login(email: string, password: string) {
    //call the api to login
    //
    //set the user in the subject
    
  }

  logout() {
    this.subject.next(null);
  }

}
