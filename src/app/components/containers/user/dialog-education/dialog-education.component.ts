import {Component, inject, model, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {Education} from "../../../model/education";
import {UserService} from "../../../services/user/user.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {StatusEnum} from "../../../model/status-enum";
import {AcademicDegreeEnum} from "../../../model/academic-degree-enum";

@Component({
  selector: 'app-dialog-education',
  standalone: true,
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    MatSelect,
    MatOption,
    AsyncPipe
  ],
  templateUrl: './dialog-education.component.html',
  styleUrl: './dialog-education.component.scss'
})
export class DialogEducationComponent implements OnInit {

  form!: FormGroup;
  readonly dialogRef = inject(MatDialogRef<DialogEducationComponent>);
  readonly data = inject<Education>(MAT_DIALOG_DATA);
  readonly education = model(this.data);
  status$: Observable<StatusEnum[]> | null = null;
  academicDegree$: Observable<AcademicDegreeEnum[]> | null = null;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.status$ = this.userService.loadEnumsStatus();
    this.academicDegree$ = this.userService.loadEnumsAcademicDegree();
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      status: this.formBuilder.group({
        cod: [this.data?.status.cod],
        description: [this.data?.status?.description],
      }),
      academicDegree: this.formBuilder.group({
        cod: [this.data?.academicDegree?.cod],
        description: [this.data?.academicDegree?.description],
      }),
      course: [this.data?.course],
      institution: [this.data?.institution],
      description: [this.data?.description],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onSave(): any {
    return this.form.valid ? this.form.value : null;
  }

  onSelectStatus(status: StatusEnum) {
    this.form.patchValue({
      status: {
        cod: status.cod,
        description: status.description
      }
    });
  }

  onSelectAcademicDegree(academic: AcademicDegreeEnum) {
    this.form.patchValue({
      academicDegree: {
        cod: academic.cod,
        description: academic.description
      }
    });
  }
}
