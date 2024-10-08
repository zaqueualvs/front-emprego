import {Routes} from '@angular/router';
import {HomeComponent} from "./components/containers/home/home.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {SignupComponent} from "./components/auth/signup/signup.component";
import {authGuard} from "./components/guards/auth.guard";
import {PainelComponent} from "./components/containers/user/painel/painel.component";
import {ResumeComponent} from "./components/containers/public/resume/resume.component";
import {publicResolver} from "./components/resolver/public/public.resolver";
import {ResumeDetailComponent} from "./components/containers/public/resume-detail/resume-detail.component";
import {userResolver} from "./components/resolver/user/user.resolver";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'resumes', component: ResumeComponent},
  {path: 'resumes/detail/:id', component: ResumeDetailComponent, resolve: {publicUser: publicResolver}},
  {path: 'login', component: LoginComponent,},
  {path: 'login/signup', component: SignupComponent},
  {
    path: 'login/painel',
    component: PainelComponent,
    canActivate: [authGuard],
    resolve: {user: userResolver}
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
