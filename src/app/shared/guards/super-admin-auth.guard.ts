import { CanActivateFn } from '@angular/router';
import { AuthStoreService } from '../services/auth-store.service';
import { inject } from '@angular/core';

export const superAdminAuthGuard: CanActivateFn = (route, state) => {

  //get the user from the store
  const authStore = inject(AuthStoreService);

  //verify if the user is super admin
  // if (authStore.user()?.admin.)

  //verify if token has expired

  return true

//if not super admin, but is admin, redirect to admin dashboard

};
