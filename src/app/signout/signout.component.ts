import { Component, OnInit } from '@angular/core';

import { UserAccountService } from '../user-account.service';
import { AppContextService } from '../app-context.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private userAccountService: UserAccountService, private appContext: AppContextService) { }

  ngOnInit() {
	  this.appContext.selectedNavOption = "signout";
	  this.appContext.startLoading();
	  this.userAccountService.signout().subscribe(
			actionStatus => {
				this.appContext.stopLoading();
			});
  }

}
