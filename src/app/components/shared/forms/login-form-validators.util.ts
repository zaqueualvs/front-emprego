import {Validators} from "@angular/forms";
import {User} from "../../model/user";

let passwordMinSize = 5;

export function loginFormValidators(user: User | null) {

  return {
    email: [user?.email, [Validators.required, Validators.email]],
    password: ['', user ? null : [Validators.required, Validators.minLength(passwordMinSize)]],
  };
}
