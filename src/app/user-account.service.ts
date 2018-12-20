import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { AppContextService } from './app-context.service';
import { UserAccount } from './user-account';
import { ActionStatus } from './action-status';
import { SignStatus } from './action-status';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

   
  currentUser: UserAccount;
  sessionId: string;
  
  
  constructor(private http: HttpClient, private appContext: AppContextService) {}

  login(email: string, passwd: string): Observable<SignStatus>  {	  
	  const url = `${this.appContext.getAppURL()}/account/login?orgId=${this.appContext.getOrgToken()}&eventId=${this.appContext.getEventToken()}&email=${email}&password=${passwd}`;
	  return this.http.get<SignStatus>(url);
  }
  
   getEmailStatus(email: string): Observable<ActionStatus>  {	
	  const url = `${this.appContext.getAppURL()}/account/getEmailStatus?email=${email}`;
	  return this.http.get<ActionStatus>(url);
  }
  
    getAccount(email: string): Observable<UserAccount>  {	
		const url = `${this.appContext.getAppURL()}/account/getAccount?email=${email}`;
		return this.http.get<UserAccount>(url);
	} 
  
  getActivationCode(email: string, lastName: string, firstName: string, address: string,
						city: string, provinceState: string, postalCode: string, 
						phone: string, affiliationId: number, affiliationName: string, recaptcha: string): Observable<ActionStatus>  {	
	  const url = `${this.appContext.getAppURL()}/account/generateActivationCode?orgId=${this.appContext.getOrgToken()}&eventId=${this.appContext.getEventToken()}&email=${email}&lastName=${lastName}&firstName=${firstName}&address=${address}&city=${city}&provinceState=${provinceState}&postalCode=${postalCode}&phone=${phone}&affiliationId=${affiliationId}&affiliationName=${affiliationName}&mode=signup&recaptchaResponse=${recaptcha}`;
	  return this.http.get<ActionStatus>(url);
  }
  
  getAnotherActivationCode(email: string): Observable<ActionStatus>  {
	  const url = `${this.appContext.getAppURL()}/account/generateNewActivationCode?orgId=${this.appContext.getOrgToken()}&eventId=${this.appContext.getEventToken()}&email=${email}&mode=signup`;
	  return this.http.get<ActionStatus>(url);	  
  }
  
  getNewActivationCode(email: string): Observable<ActionStatus>  {
	  const url = `${this.appContext.getAppURL()}/account/generateNewActivationCode?orgId=${this.appContext.getOrgToken()}&eventId=${this.appContext.getEventToken()}&email=${email}&mode=login`;
	  return this.http.get<ActionStatus>(url);	  
  }  
  
  signUp(email: string, passwd: string, repasswd:string, activationCode: string, mode:string): Observable<SignStatus>  {
	  const url = `${this.appContext.getAppURL()}/account/signUp?orgId=${this.appContext.getOrgToken()}&eventId=${this.appContext.getEventToken()}&email=${email}&password=${passwd}&repassword=${repasswd}&activationCode=${activationCode}&mode=${mode}`;
	  console.log("URL: " + url);	  
	  return this.http.get<SignStatus>(url);	  
  }
  
  signout(): Observable<ActionStatus> {
	const url = `${this.appContext.getAppURL()}/account/signOut?orgId=${this.appContext.getOrgToken()}&eventId=${this.appContext.getEventToken()}&sessionId=${this.sessionId}`;
	this.currentUser = null; 
	this.sessionId = null;	
	return this.http.get<ActionStatus>(url);
  }  
  
  
}
