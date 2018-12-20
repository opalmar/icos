import { Component, OnInit } from '@angular/core';

import { AppContextService } from '../app-context.service';

@Component({
  selector: 'app-referee',
  templateUrl: './referee.component.html',
  styleUrls: ['./referee.component.css']
})
export class RefereeComponent implements OnInit {

  constructor(private appContext: AppContextService) { }

  ngOnInit() {
	  this.appContext.selectedNavOption = "referee";
  }

}
