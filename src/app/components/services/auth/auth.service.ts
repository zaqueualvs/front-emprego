import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserLogin} from "../../model/user-login";
import {UserToken} from "../../model/user-token";
import {UserSignup} from "../../model/user-signup";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_AUTH = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
  }

  login(userLogin: UserLogin) {
    return this.http.post<UserToken>(`${this.API_AUTH}/login`, userLogin)
  }

  create(userSignup: UserSignup) {
    return this.http.post<string>(`${this.API_AUTH}/register`, userSignup);
  }

  getToken(): string | null {
    return sessionStorage.getItem("auth-token");
  }

  cleanToken(): void {
    sessionStorage.removeItem("auth-token");
  }
}
