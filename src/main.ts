import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {importProvidersFrom} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {PreloadAllModules, provideRouter, withPreloading} from '@angular/router';
import {provideToastr} from "ngx-toastr";
import {AppComponent} from './app/app.component';
import {routes} from './app/app.routes';
import {authTokenInterceptor} from "./app/components/interceptor/auth-token.interceptor";
import {MatNativeDateModule} from "@angular/material/core";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, MatToolbarModule, MatNativeDateModule),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([authTokenInterceptor])),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
  ]
}).catch(err => console.error(err));
