import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (typeof sessionStorage !== 'undefined') {

    const authToken = sessionStorage.getItem('auth-token');
    if (authToken) {
      return true;
    } else {
      return router.createUrlTree(['/login']);
    }
  } else {
    return router.createUrlTree(['/login']);
  }
};
