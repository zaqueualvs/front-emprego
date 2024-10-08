import {DestroyRef, inject, Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  private destroyRef = inject(DestroyRef);
  errorMessages: Map<string, string> = new Map();

  setupControlWithErrorMessage(
    form: FormGroup,
    controlName: string,
    updateErrorMessageFn: (controlName: string) => void
  ): void {

    const control = form.get(controlName);
    if (control) {
      merge(control.statusChanges, control.valueChanges)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => updateErrorMessageFn(controlName));
    }
  }

  updateErrorMessageEmail(controlName: string, form: FormGroup) {
    const emailControl = form.get(controlName);
    if (emailControl?.hasError('required')) {
      this.errorMessages.set(controlName, 'Vocẽ deve inserir um email')
    } else if (emailControl?.hasError('email')) {
      this.errorMessages.set(controlName, 'Não é um email valido')
    } else {
      this.errorMessages.set(controlName, '')
    }
  }

  updateErrorMessageNome(controlName: string, form: FormGroup) {
    const nameControl = form.get(controlName);
    if (nameControl?.hasError('required')) {
      this.errorMessages.set(controlName, 'Vocẽ deve inserir seu nome')
    } else if (nameControl?.hasError('maxlength')) {
      this.errorMessages.set(controlName, 'Total de caracteres ultrapassou')
    } else if (nameControl?.hasError('minlength')) {
      this.errorMessages.set(controlName, 'Total de caracteres inferior')
    } else {
      this.errorMessages.set(controlName, '')
    }
  }

  updateErrorMessagePhone(controlName: string, form: FormGroup) {
    const phoneControl = form.get(controlName);
    if (phoneControl?.hasError('required')) {
      this.errorMessages.set(controlName, 'Vocẽ deve inserir seu telefone')
    } else if (phoneControl?.hasError('pattern')) {
      this.errorMessages.set(controlName, 'O campo telefone deve ter 11 dígitos.')
    } else {
      this.errorMessages.set(controlName, '')
    }
  }

  updateErrorMessagePassword(controlName: string, form: FormGroup) {
    const passwordControl = form.get(controlName);
    if (passwordControl?.hasError('minlength')) {
      this.errorMessages.set(controlName, 'Senha inferior ao tamanho');
    } else {
      this.errorMessages.set(controlName, '');
    }
  }

}
