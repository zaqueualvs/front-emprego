import {Component} from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {ActivatedRoute, Router} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatToolbar,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  onFindAllResumes() {
    this.router.navigate(['resumes'], {relativeTo: this.route});
  }

  onLogin() {
    this.router.navigate(['login'], {relativeTo: this.route});
  }
}
