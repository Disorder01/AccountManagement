import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { AdministrationComponent } from './administration/administration.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'new-account', component: CreateAccountComponent },
  { path: 'user', component: UserInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
