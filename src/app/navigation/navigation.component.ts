import { Component, OnInit } from '@angular/core';

import { UserAccount } from '../user-account';
import { UserAccountService } from '../user-account.service';
import { AppContextService } from '../app-context.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	appContext: AppContextService;

  constructor(private userAccountService: UserAccountService, appContext: AppContextService) { 
	this.appContext = appContext;
  }

  ngOnInit() {
  }
  
  isWaitingforServer():boolean {
	  return this.appContext.loading;
  }
  
  onLogin(email: string, pass: string): void {
	this.userAccountService.login(email,pass)
  }
  
  onSignout(): void {
	this.userAccountService.signout();
  }
  
  isUserLoggedin(): boolean {
	return this.userAccountService.currentUser != null;  
  }
  
  isAdminUser(): boolean {
	return this.userAccountService.currentUser != null && this.userAccountService.currentUser.isAdmin;  
  }
  
  isConvenorUser(): boolean {
	return this.userAccountService.currentUser != null && this.userAccountService.currentUser.isConvenor;  
  }  
  
  isRefereeUser(): boolean {
	return this.userAccountService.currentUser != null && this.userAccountService.currentUser.isReferee;  
  }  

}
