import { ResolveFn } from '@angular/router';
import {PublicUser} from "../../model/public-user";
import {inject} from "@angular/core";
import {Observable, of} from "rxjs";
import {PublicService} from "../../services/public/public.service";

export const publicResolver:  ResolveFn<PublicUser | null> = (route, state) => {
  const service = inject(PublicService);
  if (route.params && route.params['id']) {
    return new Observable<PublicUser | null>((observer) => {
      service.findUserById(route.params['id']).subscribe({
        next: (value) => {
          observer.next(value);
          observer.complete();
        },
        error: (err) => {
          console.error(err);
        }
      })
    })
  }
  return of(null);
};
