import {ChangeDetectionStrategy, Component, inject, model, OnInit} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatCheckbox} from "@angular/material/checkbox";
import {ProfessionalExperience} from "../../../model/professional-experience";

@Component({
  selector: 'app-dialog-experience',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatDialogClose,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatHint,
    MatSuffix,
    MatCheckbox
  ],
  templateUrl: './dialog-experience.component.html',
  styleUrl: './dialog-experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class DialogExperienceComponent implements OnInit {

  form!: FormGroup;
  readonly dialogRef = inject(MatDialogRef<DialogExperienceComponent>);
  readonly data = inject<ProfessionalExperience>(MAT_DIALOG_DATA);
  readonly education = model(this.data);

  constructor(
    private formBuilder: NonNullableFormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      position: [this.data?.position],
      company: [this.data?.company],
      description: [this.data?.description],
      startDate: [this.data?.startDate],
      endDate: [this.data?.endDate],
      isCurrent: [this.data?.isCurrent || false],
    });

    if(this.data?.isCurrent){
      this.form.get('endDate')?.disable();
    }

    this.form.get('isCurrent')!.valueChanges.subscribe((isCurrent: boolean) => {
      const endDateControl = this.form.get('endDate');
      if (isCurrent) {
        endDateControl?.disable();
        endDateControl?.reset();
      } else {
        endDateControl?.enable();
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): any {
    return this.form.valid ? this.form.value : null;
  }
}
