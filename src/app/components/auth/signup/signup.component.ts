import {Component, OnInit, signal} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth/auth.service";
import {formValidators} from "../../shared/forms/form-validators.util";
import {FormValidationService} from "../../shared/forms/form-validation/form-validation.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatCard,
    MatToolbar,
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  form!: FormGroup;
  errorMessageEmail = signal('');
  errorMessagePassword = signal('');
  errorMessagePhone = signal('');
  errorMessageName = signal('');
  hide = signal(true);

  constructor(
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private formValidationService: FormValidationService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        ...formValidators(null),
        passwordConfirm: ['', [Validators.required]],
      }
    );
    this.formValidationService.setupControlWithErrorMessage(this.form, 'name', (controlName) => {
      this.formValidationService.updateErrorMessageNome(controlName, this.form);
      this.errorMessageName.set(<string>this.formValidationService.errorMessages.get(controlName));
    });
    this.formValidationService.setupControlWithErrorMessage(this.form, 'email', (controlName) => {
      this.formValidationService.updateErrorMessageEmail(controlName, this.form);
      this.errorMessageEmail.set(<string>this.formValidationService.errorMessages.get(controlName));
    });
    this.formValidationService.setupControlWithErrorMessage(this.form, 'phone', (controlName) => {
      this.formValidationService.updateErrorMessagePhone(controlName, this.form);
      this.errorMessagePhone.set(<string>this.formValidationService.errorMessages.get(controlName));
    });
    this.formValidationService.setupControlWithErrorMessage(this.form, 'password', (controlName) => {
      this.formValidationService.updateErrorMessagePassword(controlName, this.form);
      this.formValidationService.updateErrorMessagePasswordConfirm(controlName, 'passwordConfirm', this.form);
      this.errorMessagePassword.set(<string>this.formValidationService.errorMessages.get(controlName));
    });
  }

  onCreateAccount() {
    if (this.form.valid) {
      this.authService.create(this.form.value).subscribe({
        next: () => {
          this.toastr.success('Conta criada com sucesso','SUCESSO');
          this.onCancel();
        },
        error: (value) => {
          this.toastr.error('Ocorreu um erro ao criar conta', 'ERRO');
          console.log(value);
        }
      })
    }
  }

  onCancel() {
    this.router.navigate(['login']);
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
