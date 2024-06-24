import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStoreService } from '../../services/auth/auth-store.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {

  //get the user from the store
  const authStore = inject(AuthStoreService);

  console.log(authStore.user());
  return true;
};
