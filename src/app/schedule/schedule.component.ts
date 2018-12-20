import { Component, OnInit } from '@angular/core';

import { AppContextService } from '../app-context.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private appContext: AppContextService) { }

  ngOnInit() {
	  this.appContext.selectedNavOption = "schedule";
  }

}
