import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-security/auth/login.component';
// import { RegistroComponent } from './user-security/auth/registro.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  // {path:'registro', component: RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
