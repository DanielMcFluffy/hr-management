import {
    HttpEvent,
    HttpHandlerFn,
    HttpRequest,
  } from '@angular/common/http';
import { inject } from '@angular/core';
  import { Observable } from 'rxjs';
import { UserTokenStoreService } from '../../services/user-token-store.service';

  export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

    const userTokenStoreService = inject(UserTokenStoreService);

    const token = userTokenStoreService.getToken();
    const user = userTokenStoreService.getUser();

    if (!user) {
      return next(req);
    }

    console.log(token);

      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`), //this will pass in the authorization bearer to our endpoint
      });
      return next(modifiedReq)  
  }
  