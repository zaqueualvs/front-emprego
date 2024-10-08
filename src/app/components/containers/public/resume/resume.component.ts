import {Component} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {MatCard} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSelect, MatSelectChange} from "@angular/material/select";
import {MatToolbar} from "@angular/material/toolbar";
import {delay, Observable, tap} from "rxjs";
import {Category} from "../../../model/category";
import {UserPage} from "../../../model/user-page";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PublicUser} from "../../../model/public-user";
import {PublicService} from "../../../services/public/public.service";
import {ResumeCardComponent} from "../resume-card/resume-card.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCard,
    MatFormField,
    MatLabel,
    MatOption,
    MatPaginator,
    MatProgressSpinner,
    MatSelect,
    MatToolbar,
    ResumeCardComponent,
    MatButton,
    RouterLink
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  categories$: Observable<Category[]> | null = null;
  userPage$: Observable<UserPage> | null = null;

  selectedCategory: MatSelectChange | null = null;
  pageIndex = 0;
  pageSize = 8;

  constructor(
    private publicService: PublicService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.listAllUsers();
    this.categories$ = this.publicService.listAllCategories();
  }

  listUsersByCategory(event: MatSelectChange, pageEvent: PageEvent = {length: 0, pageIndex: 0, pageSize: 8}): void {
    this.selectedCategory = event;
    if (event.value) {
      this.userPage$ = this.publicService.listUsersByCategory(event.value, pageEvent.pageIndex, pageEvent.pageSize)
        .pipe(
          delay(600),
          tap(() => {
              this.pageIndex = pageEvent.pageIndex;
              this.pageSize = pageEvent.pageSize;
            }
          )
        );
    } else {
      this.listAllUsers();
    }
  }


  listAllUsers(pageEvent: PageEvent = {length: 0, pageIndex: 0, pageSize: 8}): void {
    this.selectedCategory = null;
    this.userPage$ = this.publicService.listAllUsers(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        delay(600),
        tap(() => {
            this.pageIndex = pageEvent.pageIndex;
            this.pageSize = pageEvent.pageSize;
          }
        )
      );
  }

  refresh(pageEvent: PageEvent) {
    if (this.selectedCategory) {
      this.listUsersByCategory(this.selectedCategory, pageEvent);
    } else {
      this.listAllUsers(pageEvent);
    }
  }

  onDetail(publicUser: PublicUser) {
    this.router.navigate(['detail', publicUser.id], {relativeTo: this.route})
  }
}
