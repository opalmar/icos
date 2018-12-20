import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }      from './home/home.component';
import { SignupComponent }      from './signup/signup.component';
import { LoginComponent }      from './login/login.component';
import { SignoutComponent }      from './signout/signout.component';
import { TeamsComponent } from './teams/teams.component';
import { ConvenorComponent } from './convenor/convenor.component';
import { RefereeComponent } from './referee/referee.component';
import { AdminComponent } from './admin/admin.component';
import { MyteamsComponent } from './myteams/myteams.component';
import { FieldsComponent } from './fields/fields.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StandingsComponent } from './standings/standings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signout', component: SignoutComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'fields', component: FieldsComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'standings', component: StandingsComponent },	  
  { path: 'myteams', component: MyteamsComponent },
  { path: 'convenor', component: ConvenorComponent },
  { path: 'referee', component: RefereeComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}