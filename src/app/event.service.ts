import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { AppContextService } from './app-context.service';
import { EventInfo } from './event-info';
import { Affiliation } from './event-info';
import { CodeValue }  from './event-info';
import { Category }  from './event-info';
import { Team }  from './event-info';

import { ActionStatus } from './action-status';

@Injectable({
  providedIn: 'root'
})

export class EventService {
	
	currentEvent: EventInfo;
	httpOptions = {
		headers: new HttpHeaders({
		'Content-Type':  'application/json',
		})
	};

	constructor(private http: HttpClient, private appContext: AppContextService) { }

	getEventInfo(): Observable<EventInfo>  {	  
	  const url = `${this.appContext.getAppURL()}/event/getEvent?orgId=${this.appContext.getOrgToken()}&eventId=${this.appContext.getEventToken()}`;
	  return this.http.get<EventInfo>(url);
	}

	getAffiliations(): Observable<Affiliation[]>  {	  
	  const url = `${this.appContext.getAppURL()}/event/getAffiliations?orgId=${this.appContext.getOrgToken()}&eventId=${this.appContext.getEventToken()}`;
	  return this.http.get<Affiliation[]>(url);
	}

	getProvinces(): Observable<CodeValue[]>  {	  
	  const url = `${this.appContext.getAppURL()}/event/getProvinces?orgId=${this.appContext.getOrgToken()}&eventId=${this.appContext.getEventToken()}`;
	  return this.http.get<CodeValue[]>(url);
	}  

	getCategories(id: number): Observable<Category[]>  {	  
	  const url = `${this.appContext.getAppURL()}/event/getCategories?eventId=${id}`;
	  return this.http.get<Category[]>(url);
	} 

    getTeams(eventId: number, sessionId: string, adminFlag: boolean): Observable<Category[]>  {	  
	  const url = `${this.appContext.getAppURL()}/team/getTeamsByCategory?sessionId=${sessionId}&eventId=${eventId}&isAdmin=${adminFlag}`;
	  return this.http.get<Category[]>(url);
	}
	
	saveTeam(team: Team, sessionId: string) {
		const url = `${this.appContext.getAppURL()}/team/saveTeam?sessionId=${sessionId}&`;
		return this.http.post<Team>(url,team,this.httpOptions);
	}
}
