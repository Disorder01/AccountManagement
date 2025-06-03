import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { AdministrationComponent } from './administration/administration.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { LoginComponent } from '../authentication/login/login.component';
import { AuthGuard } from './auth.guard';
import { RegistrationComponent } from '../authentication/registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'administration', component: AdministrationComponent, canActivate: [AuthGuard] },
  { path: 'new-account', component: CreateAccountComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserInfoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
