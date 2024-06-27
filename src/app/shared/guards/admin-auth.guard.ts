import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserTokenStoreService } from '../../services/user-token-store.service';
import { AuthHttpService } from '../../services/auth/auth.http.services';
import { tap } from 'rxjs';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userTokenStoreService = inject(UserTokenStoreService);
  const authHttpService = inject(AuthHttpService);

  //get the user from the store
  let user = userTokenStoreService.getUser();
  //get the refreshToken from user
  const refreshToken = user.admin.refreshToken;
  //get the refreshTokenExpiry(ms) from user 
  const refreshTokenExpiry = new Date(user.admin.refreshTokenExpiry).valueOf();
  
  //get the token from the store(session storage)
  const token = userTokenStoreService.getToken();
  //get the user id from token

  let isTokenExpired = userTokenStoreService.isTokenExpired(token);
  let isRefreshTokenExpired = refreshTokenExpiry < new Date().valueOf();
  
  if (isTokenExpired && isRefreshTokenExpired) {
    router.navigate(['/home']);
    return false;
  }

  if (isTokenExpired && !isRefreshTokenExpired) {

    //call the refresh token endpoint
    authHttpService.send_requestRefreshToken({token, refreshToken})
      .pipe(
        tap((tokenData) => {
          //get the token data, then save the token data to the session storage
          //then update the admin data with the new token data to session storage

          userTokenStoreService.setToken(tokenData.token);
          //update user
          user = {
            ...user,
            admin: {
              ...user.admin,
              refreshToken: tokenData.refreshToken,
            },
            token: {
              result: tokenData
            }
          }
            //due to limited perms, normal admin can't get its own data from backend (means refreshtoken expiry remains the same)
          userTokenStoreService.storeUser(user)
        })
          ).subscribe(() => {
        user = userTokenStoreService.getUser(); //update the user
      })

  }

  const isAdmin = user.admin;

  if (!isAdmin) {
    router.navigate(['/home']);
    return false;
  }

//finally, return true
  return true
};
