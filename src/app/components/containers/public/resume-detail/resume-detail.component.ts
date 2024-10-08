import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardAvatar} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {PublicUser} from "../../../model/public-user";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-resume-detail',
  standalone: true,
  imports: [
    DatePipe,
    MatButton,
    MatCard,
    MatToolbar,
    MatCardAvatar
  ],
  templateUrl: './resume-detail.component.html',
  styleUrl: './resume-detail.component.scss'
})
export class ResumeDetailComponent {
  publicUser!: PublicUser | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.publicUser = this.route.snapshot.data['publicUser'];
  }


  back() {
    this.router.navigate(['resumes']);
  }
}
