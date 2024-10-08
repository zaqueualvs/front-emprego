import {ResolveFn} from '@angular/router';
import {User} from "../../model/user";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {UserService} from "../../services/user/user.service";

export const userResolver: ResolveFn<User | null> = (route, state) => {
  const service = inject(UserService);

  return new Observable<User | null>((observer) => {
    service.loadUserByLogin().subscribe({
      next: (value) => {
        observer.next(value);
        observer.complete();
      },
      error: (err) => {
        observer.error(err);
        console.error('Erro ao carregar usuário:', err);
      }
    });
  });
};
