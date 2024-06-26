//auth guard will check 2 things
//checks if the token is expired
//checks if the user is super admin

import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserTokenStoreService } from '../../services/user-token-store.service';
import { AuthHttpService } from '../../services/auth/auth.http.services';
import { map, switchMap, tap } from 'rxjs';
import { SuperAdminService } from '../../services/super-admin/super-admin.service';
import { Admin } from '../../models/admin';
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
  console.log("isTokenExpired", isTokenExpired);
  console.log("refreshTokenExpiry", refreshTokenExpiry);
  
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
            token: {
              result: tokenData
            }
          }

          userTokenStoreService.storeUser(user)
        }),
        //from the new token data, update the admin data(backend) with the new token data
        switchMap((tokenData) => superAdminService.getAdmin(userId).pipe(
            map(
              //transform the admin data to user data
            (adminData) => {

              const updatedAdminData: Admin = {
                ...adminData,
                refreshToken: tokenData.refreshToken,
              }

              return {
                ...user,
                admin: updatedAdminData
              }
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
  console.log("user", user);
  console.log("is user superadmin?", user?.admin.isSuperAdmin)
//finally, return true
  return true
};
