import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AppContextService {
	private orgToken: string;
	private eventToken: string;
	
	private appUrl = 'https://sportstour.herokuapp.com/';  // URL to web api
	
	selectedNavOption = "home";
	
	loading: boolean = false;

	constructor() { }
	
	getAppURL(): string {
		return this.appUrl;
	}
	
	setOrgToken(token: string): void {
		if (!this.orgToken || this.orgToken.length == 0) {
			console.log("Setting org token to: " + token);
			this.orgToken = token;
		} else {
			console.log("Setter called but org token already: " + this.orgToken);
		}
	}
	
	getOrgToken(): string {
		console.log("Returning org token to: " + this.orgToken);
		return this.orgToken;
	}
	
	setEventToken(token: string): void {
		if (!this.eventToken || this.eventToken.length == 0) {
			console.log("Setting event token to: " + token);
			this.eventToken = token;
		} else {
			console.log("Setter called but event token already: " + this.eventToken);
		}
		
	}
	
	getEventToken(): string {
		console.log("Returning event token: " + this.eventToken);
		return this.eventToken;
	}	
	
	startLoading(): void {
		this.loading = true;
	}
	
	stopLoading(): void {
		this.loading = false;
	}	
}
