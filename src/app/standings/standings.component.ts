import { Component, OnInit } from '@angular/core';

import { AppContextService } from '../app-context.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  constructor(private appContext: AppContextService) { }

  ngOnInit() {
	  this.appContext.selectedNavOption = "standings";
  }

}
