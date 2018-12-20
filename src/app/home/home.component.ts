import { Component, OnInit } from '@angular/core';

import { UserAccount } from '../user-account';
import { UserAccountService } from '../user-account.service';
import { AppContextService } from '../app-context.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userAccountService: UserAccountService, private appContext: AppContextService) { }

  ngOnInit() {
	  this.appContext.selectedNavOption = "home";
  }
  
  isUserLoggedin(): boolean {
	return this.userAccountService.currentUser != null;  
  }  

}
