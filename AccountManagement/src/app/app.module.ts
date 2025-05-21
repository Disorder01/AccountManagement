import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { OverviewComponent } from './overview/overview.component';
import { AdministrationComponent } from './administration/administration.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OverviewComponent,
    AdministrationComponent,
    CreateAccountComponent,
    UserInfoComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
