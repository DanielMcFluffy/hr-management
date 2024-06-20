import { CanActivateFn } from '@angular/router';
import { AuthStoreService } from '../services/auth-store.service';
import { inject } from '@angular/core';

export const adminAuthGuard: CanActivateFn = (route, state) => {

  //get the user from the store
  const authStore = inject(AuthStoreService);

  console.log(authStore.user());
  return true;
};
