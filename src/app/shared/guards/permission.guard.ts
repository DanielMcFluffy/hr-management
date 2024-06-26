import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserTokenStoreService } from '../../services/user-token-store.service';

export const permissionGuard: CanActivateFn = (route, state) => {

  const userTokenStoreService = inject(UserTokenStoreService);

  const admin = userTokenStoreService.getUser().admin;

  if (!admin) return false;

  const permissions = admin.permission!; //permission can only be null if user is not superadmin
  console.log(route.url);
  console.log(permissions)

  console.log(permissions[0].permissionAction)
  return true;
};
