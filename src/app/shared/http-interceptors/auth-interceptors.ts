import {
    HttpEvent,
    HttpHandlerFn,
    HttpRequest,
  } from '@angular/common/http';
import { inject } from '@angular/core';
  import { Observable } from 'rxjs';
import { AuthStoreService } from '../services/auth-store.service';
  

  export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    
    const authStore = inject(AuthStoreService);
    const user = authStore.user();
    if (!user) {
      return next(req);
    }
    const {token} = authStore.user()?.token?.result!; //this will get the token from the user store
    console.log(token);

      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`), //this will pass in the authorization bearer to our endpoint
      });
    //   console.log('before next.handle', this.token!);
      return next(modifiedReq)  
  }
  