import { Component, OnInit } from '@angular/core';

import { AppContextService } from '../app-context.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
	
	categories = [];
	category: number = 0;

	constructor(private appContext: AppContextService, private eventService: EventService) { }

	ngOnInit() {
		this.appContext.selectedNavOption = "teams";
		this.eventService.getEventInfo().subscribe(eventInfo => {this.eventService.currentEvent = eventInfo; 
															   this.eventService.getCategories(this.eventService.currentEvent.id).
																subscribe(categories => {this.categories = categories;});	
													});
	}
	
	categoryChanged(selectedCategory): void {
		
	}
	
	onRefresh(): void {
		
	}

}
