import { Component, OnInit } from '@angular/core';

import { AppContextService } from '../app-context.service';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class FieldsComponent implements OnInit {

  constructor(private appContext: AppContextService) { }

  ngOnInit() {
	  this.appContext.selectedNavOption = "fields";
  }

}
