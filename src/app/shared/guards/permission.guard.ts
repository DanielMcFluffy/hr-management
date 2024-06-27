import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserTokenStoreService } from '../../services/user-token-store.service';

export const permissionGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const userTokenStoreService = inject(UserTokenStoreService);

  const admin = userTokenStoreService.getUser().admin;

  if (admin.isSuperAdmin) return true;

  if (!admin) return false;

  const permissions = admin.permission!; //permission can only be null if user is not superadmin
  
  // console.log(route.url[0].path); //cross check this with perms
  // console.log(permissions) //will return an array of permissions

  const path = route.url[0].path; //might return employee or position

  //check if the path is in the permissions array

  const hasPermission: boolean = permissions.some((perm) => {
    return perm.permissionDesc.toLocaleLowerCase().includes(path)
  })

  if (!hasPermission) {
    router.navigate(['/home']);
  }

  return true;
};
 