import { Component, OnInit } from '@angular/core';

import { UserAccount } from '../user-account';
import { ActionStatus } from '../action-status';
import { SignStatus } from '../action-status';

import { UserAccountService } from '../user-account.service';
import { AppContextService } from '../app-context.service';
import { EventService } from '../event.service';
import { EventInfo } from '../event-info';
import { Affiliation } from '../event-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	
	provinces = [];
	
	affiliations = [];	
	defaultAffiliation: Affiliation = { id: 0, affiliationType: null, name: 'Club Affiliation', sortOrder: 0, logo: null};
	
	enterAccountName: boolean = true;
	enterAccountAddress: boolean = true;
	enterAccountPhone: boolean = true;
	enterAffiliation: boolean = true;
	
	validateAccountName: boolean = true;
	validateAccountAddress: boolean = true;
	validateAccountPhone: boolean = true;
	validateAffiliation: boolean = false;
	allowNewAffiliations: boolean = true;
	
	
	termsAndConditionsURL: string = 'https://termsfeed.com/blog/sample-terms-and-conditions-template/#Download_Terms_and_Conditions_Template';

	awaitingActivationCode: boolean = false;
	email: string = '';
	firstName: string = '';
	lastName: string = '';
	address: string = '';
	city: string = '';
	provinceState: string = '';
	postalCode: string = '';
	phone: string = '';
	affiliation: number = 0;
	passwd: string = '';
	confirmPasswd: string = '';	
	activationCode: string = '';	
	captchaResponse: string = '';
	acceptConditions: boolean = false;
	
	partialClubSearch: string = '';
	partialClub: string = '';
	
	activationStatus: ActionStatus;
	requestActivationFeedbackMessage: string = '';
	activationCodeAttempts: number = 0;
	newActivationCodeMessage: string = 'Request new Activation Code';
	
	emailErrorMessage: string = '';
	firstNameErrorMessage: string = '';
	lastNameErrorMessage: string = '';
	addressErrorMessage: string = '';
	cityErrorMessage: string = '';
	postalCodeErrorMessage: string = '';
	phoneErrorMessage: string = '';
	recaptchaErrorMessage: string = '';
	activationCodeErrorMessage = "";
	passwdErrorMessage = "";
	validConfirmPasswdErrorMessage = "";	
	
	isValidFormSubmitted = false;
	validEmail = true;
	emailAlreadyActivated = false;
	validFirstName = true;
	validLastName = true;
	validAddress = true;
	validCity = true;
	validProvinceState = true;
	validPostalCode = true;
	validPhone = true;
	validAffiliation = true;
	validRecaptcha = true;
	//emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
	validActivationCode = true;
	validPasswd = true;
	validConfirmPasswd = true;

	constructor(private eventService: EventService, private userAccountService: UserAccountService, private appContext: AppContextService, private router: Router) { }

	ngOnInit() {
		// Set default values for selection lists
		this.provinceState = 'ON';
		this.affiliation = 0;
		console.log("signup ngOnInit");
		this.appContext.selectedNavOption = "signup";
		this.awaitingActivationCode = false;
		console.log("signup ngOnInit done");
		this.activationStatus = {statusCode: -1, errors: [], warnings: [], genericWarning: "", genericError: ""};
		
		// Get event information from server
		this.eventService.getEventInfo().subscribe(eventInfo => {this.eventService.currentEvent = eventInfo; 
																this.setupFormConfiguration(eventInfo); });
		this.eventService.getAffiliations().subscribe(affiliationsInfo => {
																		if (affiliationsInfo && affiliationsInfo.length > 0) {
																			this.affiliations.push(this.defaultAffiliation);
																			for (let aff of affiliationsInfo) {
																				this.affiliations.push(aff);
																			}
																		}
																	});
		
		this.eventService.getProvinces().subscribe(provincesInfo => {this.provinces = provincesInfo;});
		
																
																
	}
	
	setupFormConfiguration(eventInfo: EventInfo): void {
		this.enterAccountName = true;
		this.enterAccountAddress = true;
		this.enterAccountPhone = true;
		this.enterAffiliation = true;
	
		this.validateAccountName = true;
		this.validateAccountAddress = true;
		this.validateAccountPhone = true;
		this.validateAffiliation = false;
		this.allowNewAffiliations = false;

		if (eventInfo) {
			// 0: default value, enter mandatory field, 1: enter optional field, 2: field not captured
			if (eventInfo.newAccountNameInputType == 2) {this.enterAccountName = false;}
			if (eventInfo.newAccountAddressInputType == 2) {this.enterAccountAddress = false;}
			if (eventInfo.newAccountPhoneInputType == 2) {this.enterAccountPhone = false;}
			
			if (eventInfo.newAccountNameInputType > 0) {this.validateAccountName = false;}
			if (eventInfo.newAccountAddressInputType > 0) {this.validateAccountAddress = false;}
			if (eventInfo.newAccountPhoneInputType > 0) {this.validateAccountPhone = false;}
			// if affiliationType is null do not capture, otherwise capture and allow entries as per affiliationType.allowsUserEntries flag
			if (eventInfo.affiliationType == null) {
				this.enterAffiliation = false;
			} else {
				if (eventInfo.affiliationType.allowsUserEntries) {
					this.allowNewAffiliations = true;
				} 
				if (eventInfo.affiliationType.mandatorySelection) {
					this.validateAffiliation = true;
				}
			}
		}	
	}
	
	onKey(field: string): void {
		switch (field) {
			case "email": {
				this.validEmail = true;
				break;
			}
			case "firstName": {
				this.validFirstName = true;
				break;
			}
			case "lastName": {
				this.validLastName = true;
				break;
			}
			case "address": {
				this.validAddress = true;
				break;
			}
			case "city": {
				this.validCity = true;
				break;
			}
			case "provinceState": {
				this.validProvinceState = true;
				break;
			}
			case "postalCode": {
				this.validPostalCode = true;
				break;
			}
			case "phone": {
				this.validPhone = true;
				break;
			}
			case "affiliation": {
				this.validAffiliation = true;
				break;
			}	
		}
	}
	
	emailChanged(): void {
		this.userAccountService.getEmailStatus(this.email).subscribe(
			actionStatus => {	this.emailAlreadyActivated = false;
								if (actionStatus.statusCode == -1 || actionStatus.statusCode == 1) {
									this.validEmail = true;
								} else if (actionStatus.statusCode == 0) {
									this.emailAlreadyActivated = true;
									this.validEmail = false;
								} else if (actionStatus.statusCode == 2) {
									this.emailErrorMessage = "Email has been locked, please contact the administrator";
									this.validEmail = false;
								}
			});
	}
 
	onSignUp():void {
		this.appContext.startLoading();
		console.log("Here is sign up: " + this.email + "-" + this.passwd + "-" + this.confirmPasswd + "-" + this.activationCode);
		this.userAccountService.signUp(this.email,this.passwd,this.confirmPasswd,this.activationCode,"activate").subscribe(
			signStatus => {		if (signStatus.statusCode == 1) {
									this.userAccountService.currentUser = null;
									this.userAccountService.sessionId = null;	
									this.processActionResponse(signStatus,"signup");								
								} else {
									this.userAccountService.currentUser = signStatus.account;
									this.userAccountService.sessionId = signStatus.sessionId;
								}
								this.appContext.stopLoading();
			});
	}
	
	onRequestNewActivationCode():void {
		this.activationCodeAttempts++;
		if (this.activationCodeAttempts < 4) {
			this.submitRequestForNewActivationCode();
		} else if (this.activationCodeAttempts == 4) {
			this.submitRequestForNewActivationCode();
			this.newActivationCodeMessage = "Start Over";
		} else {
			this.router.navigate(['home']);
			this.activationCodeAttempts = 0;
			// Start over
		}
		
	}
	
	submitRequestForNewActivationCode(): void {
		this.appContext.startLoading();
		this.userAccountService.getAnotherActivationCode(this.email).subscribe(
				responseObject => {	if (responseObject) {
										if (responseObject.statusCode == 0) {
											this.awaitingActivationCode = true;
											this.requestActivationFeedbackMessage = "New Activation Code Generated";
										} else if (responseObject.genericError.length > 0) {
											this.awaitingActivationCode = false;
											this.requestActivationFeedbackMessage = responseObject.genericError;			
										} else if (responseObject.genericWarning.length > 0) {
											this.awaitingActivationCode = true;
											this.requestActivationFeedbackMessage = responseObject.genericWarning;	
										}
									}
									this.appContext.stopLoading();});
	}

	onRequestActivationCode():void {
		this.clearMessages("activation");
		
		console.log("onRequestActivationCode: " + this.email);
		console.log("Affiliation: " + this.affiliation);
		this.eventService.getEventInfo().subscribe(eventInfo => {this.eventService.currentEvent = eventInfo; console.log("URL:" + eventInfo.termAndConditionsURL); });

		
		var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
		this.isValidFormSubmitted = true;
		
		if (!this.email) {
			this.emailErrorMessage = "Please enter email address";
			this.validEmail = false;
			this.isValidFormSubmitted = false;			
		}
		if(regMail.test(this.email) == false) {
			this.emailErrorMessage = "Invalid email";
			this.validEmail = false;
			this.isValidFormSubmitted = false;
		}
		
		if (this.validateAccountName && this.firstName.length == 0) {
			this.firstNameErrorMessage = "Enter first name";
			this.validFirstName = false;
			this.isValidFormSubmitted = false;
		}
		if (this.validateAccountName && this.lastName.length == 0) {
			this.lastNameErrorMessage = "Enter last name";
			this.validLastName = false;
			this.isValidFormSubmitted = false;
		}
		if (this.validateAccountAddress && this.address.length == 0) {
			this.lastNameErrorMessage = "Enter address";
			this.validAddress = false;
			this.isValidFormSubmitted = false;
		}
		if (this.validateAccountAddress && this.city.length == 0) {
			this.cityErrorMessage = "Enter city";
			this.validCity = false;
			this.isValidFormSubmitted = false;
		}	
		if (this.validateAccountAddress && this.provinceState.length == 0) {
			this.validProvinceState = false;
			this.isValidFormSubmitted = false;
		}		
		if (this.validateAccountAddress && this.city.length == 0) {
			this.postalCodeErrorMessage = "Enter postal code";
			this.validPostalCode = false;
			this.isValidFormSubmitted = false;
		}	
		if (this.validateAccountPhone && this.phone.length == 0) {
			this.phoneErrorMessage = "Enter phone";
			this.validPhone = false;
			this.isValidFormSubmitted = false;
		}	

		if (this.validateAffiliation && (!this.affiliation || this.affiliation == 0 )) {
			this.validAffiliation = false;
			this.isValidFormSubmitted = false;
		}	
		if (this.isValidFormSubmitted) {
			this.appContext.startLoading();
			this.activationCodeAttempts = 1;
			
			this.userAccountService.getActivationCode(this.email,this.lastName,this.firstName,this.address,
											this.city,this.provinceState,this.postalCode,this.phone,this.affiliation,
											this.partialClubSearch,this.captchaResponse).subscribe(
													responseObject => {this.activationStatus = responseObject; 
																		this.processActionResponse(this.activationStatus,"activation");
																		this.appContext.stopLoading();
													});
		} 
	}	
	clearMessages(mode: string): void {
		if (mode === "activation") {
			this.emailErrorMessage = "";
			this.firstNameErrorMessage = "";
			this.lastNameErrorMessage = "";
			this.addressErrorMessage = "";
			this.cityErrorMessage = "";
			this.postalCodeErrorMessage = "";
			this.phoneErrorMessage = "";
			this.recaptchaErrorMessage = "";
			this.activationCodeErrorMessage = "";
			this.passwdErrorMessage = "";
			this.validConfirmPasswdErrorMessage = "";
		
			this.validEmail = true;
			this.validFirstName = true;
			this.validLastName = true
			this.validAddress = true;
			this.validCity = true;
			this.validProvinceState = true;
			this.validPostalCode = true;
			this.validPhone = true;
			this.validAffiliation = true;
			this.validRecaptcha = true;	
			this.validActivationCode = false;
			this.validPasswd = false;
			this.validConfirmPasswd = false;
		} else if (mode === "signup") {
			this.emailErrorMessage = "";
			this.activationCodeErrorMessage = "";
			this.passwdErrorMessage = "";
			this.validConfirmPasswdErrorMessage = "";
			this.validEmail = true;
			this.validActivationCode = true;	
			this.validPasswd = false;			
			this.validConfirmPasswd = false;			
		}
	}
	
	processActionResponse(actionStatus: ActionStatus, mode:string): void {
		this.clearMessages(mode);
		this.requestActivationFeedbackMessage = "";
		if (actionStatus) {
			if (mode === "activation") {
				if (actionStatus.statusCode == 0) {
					this.awaitingActivationCode = true;
					this.requestActivationFeedbackMessage = "Activation Code generated";
				} else if (actionStatus.genericError.length > 0) {
					this.awaitingActivationCode = false;
					this.requestActivationFeedbackMessage = actionStatus.genericError;			
				} else if (actionStatus.genericWarning.length > 0) {
					this.awaitingActivationCode = true;
					this.requestActivationFeedbackMessage = actionStatus.genericWarning;	
				}
			} else if (mode === "signup") {
				if (actionStatus.genericError.length > 0) {
					this.requestActivationFeedbackMessage = actionStatus.genericError;
				}
			}
			if (actionStatus.warnings && actionStatus.warnings.length) {
				for (let warning of actionStatus.warnings) {
					switch (warning.field) {
						case "email" : {
							this.validEmail = true;
							this.emailErrorMessage = warning.message;
							break;
						}
						case "firstName" : {
							this.validFirstName = true;
							this.firstNameErrorMessage = warning.message;
							break;
						}	
						case "lastName" : {
							this.validLastName = true;
							this.lastNameErrorMessage = warning.message;
							break;
						}
						case "address" : {
							this.validAddress = true;
							this.addressErrorMessage = warning.message;
							break;
						}
						case "city" : {
							this.validCity = true;
							this.cityErrorMessage = warning.message;
							break;
						}
						case "postalCode" : {
							this.validPostalCode = true;
							this.postalCodeErrorMessage = warning.message;
							break;
						}	
						case "phone" : {
							this.validPhone = true;
							this.phoneErrorMessage = warning.message;
							break;
						}
						case "recaptchaResponse" : {
							this.validRecaptcha = true;
							this.recaptchaErrorMessage = warning.message;
							break;
						}					
					}

				}
			}
			
			if (actionStatus.errors && actionStatus.errors.length) {
				for (let error of actionStatus.errors) {
					switch (error.field) {
						case "email" : {
							this.validEmail = false;
							this.emailErrorMessage = error.message;
							break;
						}
						case "firstName" : {
							this.validFirstName = false;
							this.firstNameErrorMessage = error.message;
							break;
						}	
						case "lastName" : {
							this.validLastName = false;
							this.lastNameErrorMessage = error.message;
							break;
						}
						case "address" : {
							this.validAddress = false;
							this.addressErrorMessage = error.message;
							break;
						}
						case "city" : {
							this.validCity = false;
							this.cityErrorMessage = error.message;
							break;
						}
						case "postalCode" : {
							this.validPostalCode = false;
							this.postalCodeErrorMessage = error.message;
							break;
						}	
						case "phone" : {
							this.validPhone = false;
							this.phoneErrorMessage = error.message;
							break;
						}						
						case "activationCode" : {
							this.validActivationCode = false;
							this.activationCodeErrorMessage = error.message;
							break;
						}
						case "passwd" : {
							this.validPasswd = false;
							this.passwdErrorMessage = error.message;
							break;
						}
						case "confirmPasswd" : {
							this.validConfirmPasswd = false;
							this.validConfirmPasswdErrorMessage = error.message;
							break;
						}
						
						case "recaptchaResponse" : {
							this.validRecaptcha = false;
							this.recaptchaErrorMessage = error.message;
							break;
						}					
					}
				}
			}		
		}
	}
	
	activationCodeRequested(): boolean {
		return this.awaitingActivationCode;
	}

	isUserLoggedIn(): boolean {
		return this.userAccountService.currentUser != null;
	}

	getLoggedInUserAccount(): string {
		return this.userAccountService.currentUser.email;
	} 
	
	resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response ${captchaResponse}:`);
		this.captchaResponse = `${captchaResponse}`
    }
	
	focusInAffiliation(e:any): void {
		console.log("In club: ");
		this.partialClubSearch = '';
	}
	
	focusOffAffiliation(e:any): void {
		console.log("Off club: " + this.partialClubSearch);
		if (this.partialClubSearch.length > 0) {
			let item = this.affiliations.find(i => i.name === this.partialClubSearch);
			console.log("Off club: before item");
			if (!item) {
				if (this.allowNewAffiliations) {
					console.log("Off club: not found, add");
					this.affiliations = [...this.affiliations,{id:-1, name:this.partialClubSearch}];
					this.affiliation = -1;
					console.log("Off club: not found, after: " + this.affiliation);
					console.log("Off club: affiliation: " + this.affiliations);
				} else {
					this.affiliation = 0;
				}
			}
		}
	}
	
	searchAffiliation(e:any): void {
		console.log("In search: " + e);
		this.partialClubSearch = e;
	}
	
	onAffiliationChange(e:any): void {
		console.log("In club change: " + e);
		this.partialClubSearch = '';
	}
	
	acceptTerms(event: any){
		this.acceptConditions = event.currentTarget.checked;
		console.log("acceptTerms status: " + this.acceptConditions);
	}
	
	isPasswordAcceptable(): boolean {
		if (!this.passwd) {
			return false;
		} else if (this.passwd.length < 8) {
			return false;
		} else {
			var matchedCase = new Array();
			matchedCase.push("[$@$!%*#?&]"); // Special Charector
			matchedCase.push("[A-Z]");      // Uppercase Alpabates
			matchedCase.push("[0-9]");      // Numbers
			matchedCase.push("[a-z]");     // Lowercase Alphabates

			// Check the conditions
			var ctr = 0;
			for (var i = 0; i < matchedCase.length; i++) {
				if (new RegExp(matchedCase[i]).test(this.passwd)) {
					ctr++;
				}
			}
			if (ctr < 4) {
				return false;
			} else {
				return true;
			}
		}
	}

}

