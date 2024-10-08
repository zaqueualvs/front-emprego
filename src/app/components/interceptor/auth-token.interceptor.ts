import {HttpInterceptorFn} from '@angular/common/http';
import {AuthService} from "../services/auth/auth.service";
import {inject} from "@angular/core";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  if (authToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(clonedRequest);
  }
  return next(req);
};
