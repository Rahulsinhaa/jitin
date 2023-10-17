import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {SecretsComponent} from "./secrets/secrets.component";
import {AuthGuard} from "./auth/auth";
import {ForgetPasswordComponent} from "./forget-password/forget-password.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'secrets', component:SecretsComponent,canActivate:[AuthGuard]},
  {path:'forgot-password', component:ForgetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
