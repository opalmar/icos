import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';

import { AppContextService } from './app-context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	
	constructor(private actRoute: ActivatedRoute, private router: Router, private appContextService: AppContextService) {  
	}
	
	ngOnInit(): void {
		console.log('AppComponent ngOnInit');
		this.actRoute.queryParams.subscribe(params => {
						this.appContextService.setOrgToken(params['orgToken']);
						this.appContextService.setEventToken(params['eventToken']);
						console.log('Values of orgToken is: ' + params['orgToken']);
						console.log('Values of eventToken is: ' + params['eventToken']);
				}
		);
		console.log('AppComponent ngOnInit end');
   }
    
}
