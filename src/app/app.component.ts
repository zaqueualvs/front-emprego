import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "./components/services/auth/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {authTokenInterceptor} from "./components/interceptor/auth-token.interceptor";
import {UserService} from "./components/services/user/user.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatToolbar, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[
    AuthService,
    UserService,{
    provide: HTTP_INTERCEPTORS,
      useValue: authTokenInterceptor,
      multi: true
    }
  ]
})
export class AppComponent {
  title = 'Conexão multi serviço';
}
