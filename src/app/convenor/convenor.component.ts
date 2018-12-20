import { Component, OnInit } from '@angular/core';

import { AppContextService } from '../app-context.service';

@Component({
  selector: 'app-convenor',
  templateUrl: './convenor.component.html',
  styleUrls: ['./convenor.component.css']
})
export class ConvenorComponent implements OnInit {

  constructor(private appContext: AppContextService) { }

  ngOnInit() {
	  this.appContext.selectedNavOption = "convenor";
  }

}
