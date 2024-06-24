import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { AuthStoreService } from '../../services/auth/auth-store.service';
export const superAdminAuthGuard: CanActivateFn = (route, state) => {

  //get the user from the store
  
  const tokenService = inject(TokenService);
  const authStore = inject(AuthStoreService);

  //get the token from the store(session storage)
  const token = tokenService.getToken();
  console.log(token);
  const decoded = tokenService.decodeToken(token);
  console.log(decoded);
  const {exp} = decoded;

  //convert the exp date to human readable date

  console.log(new Date().valueOf()); // returns ms since epoch
  console.log(exp * 1000); // we multiply by 1000 to convert to ms

  //compare the expiry time vs current time
  console.log(exp * 1000 > new Date().valueOf());


  

  //verify if the user is super admin
  
  const user = authStore.user();

  console.log(user?.admin.isSuperAdmin)

  
  //if not super admin, but is admin, redirect to admin dashboard
  
  return true
};
