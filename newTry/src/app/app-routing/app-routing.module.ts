import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';


const routes: Routes = [
  //wenn in URL auch login steht, dann ist LoginComponent gemeint
  //wenn sign up steht, meine ich sign up komponente
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'landing-page', component: LandingPageComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
