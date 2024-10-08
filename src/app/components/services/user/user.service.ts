import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user";
import {Observable, tap} from "rxjs";
import {StatusEnum} from "../../model/status-enum";
import {AcademicDegreeEnum} from "../../model/academic-degree-enum";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
  }

  loadUserByLogin() {
    return this.http.get<User>(this.API_URL);
  }

  updateUser(user: User) {
    return this.http.put(`${this.API_URL}/${user.email}`, user).pipe()
  }

  loadEnumsStatus(): Observable<StatusEnum[]> {
    return this.http.get<StatusEnum[]>(`${this.API_URL}/enums/status`);
  }

  loadEnumsAcademicDegree() {
    return this.http.get<AcademicDegreeEnum[]>(`${this.API_URL}/enums/academicDegree`).pipe();
  }

  deleteExperience(email: string, experienceId: number) {
    return this.http.delete(`${this.API_URL}/${email}/experience/${experienceId}`);
  }

  deleteEducation(email: string, educationId: number) {
    return this.http.delete(`${this.API_URL}/${email}/education/${educationId}`);
  }
}
