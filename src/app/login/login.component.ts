import { Component, OnInit } from '@angular/core';

import { UserAccount } from '../user-account';
import { SignStatus } from '../action-status';
import { ActionStatus } from '../action-status';
import { UserAccountService } from '../user-account.service';
import { AppContextService } from '../app-context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	awaitingActivationCode: boolean = false;
	forgotPasswordFlag: boolean;
	email: string = '';
	passwd: string = '';
	confirmPasswd: string = '';	
	activationCode: string = '';	
  
	emailErrorMessage: string = '';
	activationCodeErrorMessage = "";
	passwdErrorMessage = "";
	validConfirmPasswdErrorMessage = "";	
	
	validEmail = true;
	validActivationCode = true;
	validPasswd = true;
	validConfirmPasswd = true;  
	
	loginStatus: number = 0;
	changePasswordStatus: number = 0;
	feedbackMessage: string = '';
	
	activationStatus: ActionStatus;
	requestActivationFeedbackMessage: string = '';
	activationCodeAttempts: number = 0;
	updatePasswordAttempts: number = 0;
	activationCodeButtonText: string = 'Request new Activation Code';
	updatePasswordButtonText:string = 'Update password and Log in';

  constructor(private userAccountService: UserAccountService, private appContext: AppContextService, private router: Router) { }

  ngOnInit() {
	this.appContext.selectedNavOption = "login";
	this.forgotPasswordFlag = false;
	this.activationStatus = {statusCode: -1, errors: [], warnings: [], genericWarning: "", genericError: ""};
	this.awaitingActivationCode = false;
	console.log('LoginComponent ngOnInit');
  }
  
	onLogin():void {
		var isValidFormSubmitted = true;
		var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;

		if (!this.email) {
			this.emailErrorMessage = "Please enter email address";
			this.validEmail = false;
			isValidFormSubmitted = false;			
		}
		if(regMail.test(this.email) == false) {
			this.emailErrorMessage = "Invalid email";
			this.validEmail = false;
			isValidFormSubmitted = false;
		}
		if (!this.passwd) {
			this.passwdErrorMessage = "Enter password";
			this.validPasswd = false;
			isValidFormSubmitted = false;		
		}

		if (isValidFormSubmitted) {
			this.appContext.startLoading();
			this.userAccountService.login(this.email,this.passwd).subscribe(
				signStatus => {		if (signStatus.statusCode == 1) {
										this.userAccountService.currentUser = null;
										this.userAccountService.sessionId = null;	
										this.processActionResponse(signStatus,"login");								
									} else {
										this.userAccountService.currentUser = signStatus.account;
										this.userAccountService.sessionId = signStatus.sessionId;
									}
									this.appContext.stopLoading();
				});
		}
  }
  
	onForgotPassword():void {
		this.forgotPasswordFlag = !this.forgotPasswordFlag;
	}

	isForgotPasswordMode():boolean {
		return this.forgotPasswordFlag;
	}

	isUserLoggedIn(): boolean {
		return this.userAccountService.currentUser != null;
	}

	getLoggedInUserAccount(): string {
		return this.userAccountService.currentUser.email;
	} 

	activationCodeRequested(): boolean {
		return this.awaitingActivationCode;
	}  
  
	onKey(field: string): void {
		switch (field) {
			case "email": {
				this.validEmail = true;
				break;
			}
		}
	}
	
	emailChanged(): void {
		this.userAccountService.getEmailStatus(this.email).subscribe(
			actionStatus => {	if (actionStatus.statusCode == -1 || actionStatus.statusCode == 1) {
									this.emailErrorMessage = "Email not found";
									this.validEmail = false;
								} else if (actionStatus.statusCode == 0) {
									this.validEmail = true;
								} else if (actionStatus.statusCode == 2) {
									this.emailErrorMessage = "Email has been locked, please contact the administrator";
									this.validEmail = false;
								}
			});
	}  
  
	clearMessages(): void {
		this.emailErrorMessage = "";
		this.activationCodeErrorMessage = "";
		this.passwdErrorMessage = "";
		this.validConfirmPasswdErrorMessage = "";
		this.validEmail = true;
		this.validActivationCode = true;	
		this.validPasswd = false;			
		this.validConfirmPasswd = false;	
		this.loginStatus = 0;	
		this.changePasswordStatus = 0;
	}  
  
	processActionResponse(actionStatus: SignStatus, mode: string): void {
		this.clearMessages();
		if (actionStatus) {
			if (actionStatus.genericError.length > 0) {
				this.feedbackMessage = actionStatus.genericError;	
				if ("login" === mode) {
					this.loginStatus = 1;
				} else {
					this.changePasswordStatus = 1;
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
					}
				}
			}		
		}
	}  
	
	onRequestNewActivationCode():void {
		this.activationCodeAttempts++;
		if (this.activationCodeAttempts < 4) {
			this.submitRequestForNewActivationCode();
		} else if (this.activationCodeAttempts == 4) {
			this.submitRequestForNewActivationCode();
			this.activationCodeButtonText = "Start Over";
		} else {
			this.router.navigate(['home']);
			this.activationCodeAttempts = 0;
			// Start over
		}
	}
	
	submitRequestForNewActivationCode(): void {
		this.appContext.startLoading();
		this.userAccountService.getNewActivationCode(this.email).subscribe(
				actionStatus => {	this.activationStatus = actionStatus;
									if (actionStatus) {
										if (actionStatus.statusCode == 0) {
											this.awaitingActivationCode = true;
											this.requestActivationFeedbackMessage = "New Activation Code Generated";
										} else if (actionStatus.genericError.length > 0) {
											this.awaitingActivationCode = false;
											this.requestActivationFeedbackMessage = actionStatus.genericError;	
											if (actionStatus.errors && actionStatus.errors.length) {
												for (let error of actionStatus.errors) {
													switch (error.field) {
														case "email" : {
															this.validEmail = false;
															this.emailErrorMessage = error.message;
															break;
														}								
													}
												}
											}											
										} else if (actionStatus.genericWarning.length > 0) {
											this.awaitingActivationCode = true;
											this.requestActivationFeedbackMessage = actionStatus.genericWarning;	
										}
									}
									this.appContext.stopLoading();
								});
	}

	onResetPassword():void {
		this.updatePasswordAttempts++;
		if (this.updatePasswordAttempts < 4) {
			this.submitRequestForPasswordUpdate();
		} else if (this.updatePasswordAttempts == 4) {
			this.submitRequestForPasswordUpdate();
			this.updatePasswordButtonText = "Start Over";
		} else {
			this.router.navigate(['home']);
			this.updatePasswordAttempts = 0;
			// Start over
		}
	}
	
	submitRequestForPasswordUpdate(): void {
		this.appContext.startLoading();
		console.log("Here is reset password: " + this.email + "-" + this.passwd + "-" + this.confirmPasswd + "-" + this.activationCode);
		this.userAccountService.signUp(this.email,this.passwd,this.confirmPasswd,this.activationCode,"updatePassword").subscribe(
			signStatus => {		if (signStatus.statusCode == 1) {
									this.userAccountService.currentUser = null;
									this.userAccountService.sessionId = null;	
									this.processActionResponse(signStatus,"resetPassword");								
								} else {
									this.userAccountService.currentUser = signStatus.account;
									this.userAccountService.sessionId = signStatus.sessionId;
								}
								this.appContext.stopLoading();
			});		
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
