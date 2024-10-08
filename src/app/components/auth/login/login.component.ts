import {Component, OnInit, signal} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {MatFormFieldModule, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth/auth.service";
import {FormValidationService} from "../../shared/forms/form-validation/form-validation.service";
import {loginFormValidators} from "../../shared/forms/login-form-validators.util";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatFormFieldModule,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    MatToolbar,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {

  form!: FormGroup;
  errorMessageEmail = signal('');
  errorMessagePassword = signal('');

  hide = signal(true);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private formValidationService: FormValidationService
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      ...loginFormValidators(null)
    });

    this.formValidationService.setupControlWithErrorMessage(this.form, 'email', (controlName) => {
      this.formValidationService.updateErrorMessageEmail(controlName, this.form);
      this.errorMessageEmail.set(<string>this.formValidationService.errorMessages.get(controlName));
    });
    this.formValidationService.setupControlWithErrorMessage(this.form, 'password', (controlName) => {
      this.formValidationService.updateErrorMessagePassword(controlName, this.form);
      this.errorMessagePassword.set(<string>this.formValidationService.errorMessages.get(controlName));
    })
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (response) => {
          sessionStorage.setItem("auth-token", response.token);
          this.toastr.success('Login feito com sucesso', 'SUCESSO');
          this.router.navigate(['painel'], {relativeTo: this.route});
        },
        error: () => this.toastr.error('email ou senha estão incorretos', 'ERRO')
      })
    }
  }

  back() {
    this.router.navigate(['']);
  }

  onCreateAccount() {
    this.router.navigate(['signup'], {relativeTo: this.route});
  }
}
