import { NgxCaptchaModule } from 'ngx-captcha';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';


import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SignupComponent } from './signup/signup.component';
import { SignoutComponent } from './signout/signout.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { TeamsComponent } from './teams/teams.component';
import { ConvenorComponent } from './convenor/convenor.component';
import { RefereeComponent } from './referee/referee.component';
import { AdminComponent } from './admin/admin.component';
import { MyteamsComponent } from './myteams/myteams.component';
import { FieldsComponent } from './fields/fields.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StandingsComponent } from './standings/standings.component';
import { OnlyNumberDirective } from './only-number.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SignupComponent,
    SignoutComponent,
    LoginComponent,
    HomeComponent,
    TeamsComponent,
    ConvenorComponent,
    RefereeComponent,
    AdminComponent,
    MyteamsComponent,
    FieldsComponent,
    ScheduleComponent,
    StandingsComponent,
    OnlyNumberDirective
  ],
  imports: [
    BrowserModule,
	FormsModule,
	AppRoutingModule,
	HttpClientModule,
	NgxCaptchaModule,
	NgSelectModule
  ],
  providers: [NgxCaptchaModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
