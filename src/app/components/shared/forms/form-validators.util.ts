import {Validators} from "@angular/forms";
import {User} from "../../model/user";
import {loginFormValidators} from "./login-form-validators.util";

let nameMinSize = 3;
let nameMaxSize = 25;

export function formValidators(user: User | null) {
  return {
    ...loginFormValidators(user),
    name: [user?.name, [Validators.required, Validators.minLength(nameMinSize), Validators.maxLength(nameMaxSize)]],
    phone: [user?.phone, [Validators.required, Validators.pattern(/^\d{11}$/)]],
  }
}
