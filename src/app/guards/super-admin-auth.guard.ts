//auth guard will check 2 things
//checks if the token is expired
//checks if the user is super admin

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { UserTokenStoreService } from '../services/user-token-store.service';
import { AuthHttpService } from '../services/auth/auth.http.services';
import { SuperAdminService } from '../services/super-admin/super-admin.service';
import { UserAdmin } from '../models/user';

export const superAdminAuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const userTokenStoreService = inject(UserTokenStoreService);
  const authHttpService = inject(AuthHttpService);
  const superAdminService = inject(SuperAdminService);

  //get the user from the store
  let user = userTokenStoreService.getUser();
  //get the refreshToken from user
  const refreshToken = user.admin.refreshToken;
  //get the refreshTokenExpiry(ms) from user 
  const refreshTokenExpiry = new Date(user.admin.refreshTokenExpiry).valueOf();
  
  //get the token from the store(session storage)
  const token = userTokenStoreService.getToken();
  //get the user id from token
  const userId = userTokenStoreService.getUserIdFromToken(token);

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
          //get the token data and update the user with the new token data
          user = {
            ...user,
            token: {
              ...tokenData
            }
          }

          userTokenStoreService.storeUser(user)
        }),
        switchMap((tokenData) => superAdminService.getAdmin(userId).pipe( //this returns an observable of Admin
            map(
              //transform the admin data to user data
            (adminData) => {

              return {
                ...user,
                admin: {...adminData}
              } as UserAdmin
            })
          ))
      ).subscribe((updatedUserData) => {
        userTokenStoreService.storeUser(updatedUserData);
        user = updatedUserData; //update the user
      })

  }

  const isSuperAdmin = user!.admin.isSuperAdmin;

  if (!isSuperAdmin) {
    router.navigate(['/dashboard/admin']);
    return false;
  }
//finally, return true
  return true
};
