import { Component, OnInit } from '@angular/core';

import { AppContextService } from '../app-context.service';
import { UserAccountService } from '../user-account.service';
import { EventService } from '../event.service';
import { CodeValue }  from '../event-info';
import { Category }  from '../event-info';
import { Team }  from '../event-info';
import { TeamContact }  from '../event-info';
import { Player }  from '../event-info';
import { UserAccount }  from '../user-account';


@Component({
  selector: 'app-myteams',
  templateUrl: './myteams.component.html',
  styleUrls: ['./myteams.component.css']
})
export class MyteamsComponent implements OnInit {

	colors = [
		{"code":"#F0F8FF","name":"AliceBlue"},
		{"code":"#FAEBD7","name":"AntiqueWhite"},
		{"code":"#00FFFF","name":"Aqua"},
		{"code":"#7FFFD4","name":"Aquamarine"},
		{"code":"#F0FFFF","name":"Azure"},
		{"code":"#F5F5DC","name":"Beige"},
		{"code":"#FFE4C4","name":"Bisque"},
		{"code":"#000000","name":"Black"},
		{"code":"#FFEBCD","name":"BlanchedAlmond"},
		{"code":"#0000FF","name":"Blue"},
		{"code":"#8A2BE2","name":"BlueViolet"},
		{"code":"#A52A2A","name":"Brown"},
		{"code":"#DEB887","name":"BurlyWood"},
		{"code":"#5F9EA0","name":"CadetBlue"},
		{"code":"#7FFF00","name":"Chartreuse"},
		{"code":"#D2691E","name":"Chocolate"},
		{"code":"#FF7F50","name":"Coral"},
		{"code":"#6495ED","name":"CornflowerBlue"},
		{"code":"#FFF8DC","name":"Cornsilk"},
		{"code":"#DC143C","name":"Crimson"},
		{"code":"#00FFFF","name":"Cyan"},
		{"code":"#00008B","name":"DarkBlue"},
		{"code":"#008B8B","name":"DarkCyan"},
		{"code":"#B8860B","name":"DarkGoldenRod"},
		{"code":"#A9A9A9","name":"DarkGray"},
		{"code":"#A9A9A9","name":"DarkGrey"},
		{"code":"#006400","name":"DarkGreen"},
		{"code":"#BDB76B","name":"DarkKhaki"},
		{"code":"#8B008B","name":"DarkMagenta"},
		{"code":"#556B2F","name":"DarkOliveGreen"},
		{"code":"#FF8C00","name":"DarkOrange"},
		{"code":"#9932CC","name":"DarkOrchid"},
		{"code":"#8B0000","name":"DarkRed"},
		{"code":"#E9967A","name":"DarkSalmon"},
		{"code":"#8FBC8F","name":"DarkSeaGreen"},
		{"code":"#483D8B","name":"DarkSlateBlue"},
		{"code":"#2F4F4F","name":"DarkSlateGray"},
		{"code":"#2F4F4F","name":"DarkSlateGrey"},
		{"code":"#00CED1","name":"DarkTurquoise"},
		{"code":"#9400D3","name":"DarkViolet"},
		{"code":"#FF1493","name":"DeepPink"},
		{"code":"#00BFFF","name":"DeepSkyBlue"},
		{"code":"#696969","name":"DimGray"},
		{"code":"#696969","name":"DimGrey"},
		{"code":"#1E90FF","name":"DodgerBlue"},
		{"code":"#B22222","name":"FireBrick"},
		{"code":"#FFFAF0","name":"FloralWhite"},
		{"code":"#228B22","name":"ForestGreen"},
		{"code":"#FF00FF","name":"Fuchsia"},
		{"code":"#DCDCDC","name":"Gainsboro"},
		{"code":"#F8F8FF","name":"GhostWhite"},
		{"code":"#FFD700","name":"Gold"},
		{"code":"#DAA520","name":"GoldenRod"},
		{"code":"#808080","name":"Gray"},
		{"code":"#808080","name":"Grey"},
		{"code":"#008000","name":"Green"},
		{"code":"#ADFF2F","name":"GreenYellow"},
		{"code":"#F0FFF0","name":"HoneyDew"},
		{"code":"#FF69B4","name":"HotPink"},
		{"code":"#CD5C5C","name":"IndianRed "},
		{"code":"#4B0082","name":"Indigo "},
		{"code":"#FFFFF0","name":"Ivory"},
		{"code":"#F0E68C","name":"Khaki"},
		{"code":"#E6E6FA","name":"Lavender"},
		{"code":"#FFF0F5","name":"LavenderBlush"},
		{"code":"#7CFC00","name":"LawnGreen"},
		{"code":"#FFFACD","name":"LemonChiffon"},
		{"code":"#ADD8E6","name":"LightBlue"},
		{"code":"#F08080","name":"LightCoral"},
		{"code":"#E0FFFF","name":"LightCyan"},
		{"code":"#FAFAD2","name":"LightGoldenRodYellow"},
		{"code":"#D3D3D3","name":"LightGray"},
		{"code":"#D3D3D3","name":"LightGrey"},
		{"code":"#90EE90","name":"LightGreen"},
		{"code":"#FFB6C1","name":"LightPink"},
		{"code":"#FFA07A","name":"LightSalmon"},
		{"code":"#20B2AA","name":"LightSeaGreen"},
		{"code":"#87CEFA","name":"LightSkyBlue"},
		{"code":"#778899","name":"LightSlateGray"},
		{"code":"#778899","name":"LightSlateGrey"},
		{"code":"#B0C4DE","name":"LightSteelBlue"},
		{"code":"#FFFFE0","name":"LightYellow"},
		{"code":"#00FF00","name":"Lime"},
		{"code":"#32CD32","name":"LimeGreen"},
		{"code":"#FAF0E6","name":"Linen"},
		{"code":"#FF00FF","name":"Magenta"},
		{"code":"#800000","name":"Maroon"},
		{"code":"#66CDAA","name":"MediumAquaMarine"},
		{"code":"#0000CD","name":"MediumBlue"},
		{"code":"#BA55D3","name":"MediumOrchid"},
		{"code":"#9370DB","name":"MediumPurple"},
		{"code":"#3CB371","name":"MediumSeaGreen"},
		{"code":"#7B68EE","name":"MediumSlateBlue"},
		{"code":"#00FA9A","name":"MediumSpringGreen"},
		{"code":"#48D1CC","name":"MediumTurquoise"},
		{"code":"#C71585","name":"MediumVioletRed"},
		{"code":"#191970","name":"MidnightBlue"},
		{"code":"#F5FFFA","name":"MintCream"},
		{"code":"#FFE4E1","name":"MistyRose"},
		{"code":"#FFE4B5","name":"Moccasin"},
		{"code":"#FFDEAD","name":"NavajoWhite"},
		{"code":"#000080","name":"Navy"},
		{"code":"#FDF5E6","name":"OldLace"},
		{"code":"#808000","name":"Olive"},
		{"code":"#6B8E23","name":"OliveDrab"},
		{"code":"#FFA500","name":"Orange"},
		{"code":"#FF4500","name":"OrangeRed"},
		{"code":"#DA70D6","name":"Orchid"},
		{"code":"#EEE8AA","name":"PaleGoldenRod"},
		{"code":"#98FB98","name":"PaleGreen"},
		{"code":"#AFEEEE","name":"PaleTurquoise"},
		{"code":"#DB7093","name":"PaleVioletRed"},
		{"code":"#FFEFD5","name":"PapayaWhip"},
		{"code":"#FFDAB9","name":"PeachPuff"},
		{"code":"#CD853F","name":"Peru"},
		{"code":"#FFC0CB","name":"Pink"},
		{"code":"#DDA0DD","name":"Plum"},
		{"code":"#B0E0E6","name":"PowderBlue"},
		{"code":"#800080","name":"Purple"},
		{"code":"#663399","name":"RebeccaPurple"},
		{"code":"#FF0000","name":"Red"},
		{"code":"#BC8F8F","name":"RosyBrown"},
		{"code":"#4169E1","name":"RoyalBlue"},
		{"code":"#8B4513","name":"SaddleBrown"},
		{"code":"#FA8072","name":"Salmon"},
		{"code":"#F4A460","name":"SandyBrown"},
		{"code":"#2E8B57","name":"SeaGreen"},
		{"code":"#FFF5EE","name":"SeaShell"},
		{"code":"#A0522D","name":"Sienna"},
		{"code":"#C0C0C0","name":"Silver"},
		{"code":"#87CEEB","name":"SkyBlue"},
		{"code":"#6A5ACD","name":"SlateBlue"},
		{"code":"#708090","name":"SlateGray"},
		{"code":"#708090","name":"SlateGrey"},
		{"code":"#FFFAFA","name":"Snow"},
		{"code":"#00FF7F","name":"SpringGreen"},
		{"code":"#4682B4","name":"SteelBlue"},
		{"code":"#D2B48C","name":"Tan"},
		{"code":"#008080","name":"Teal"},
		{"code":"#D8BFD8","name":"Thistle"},
		{"code":"#FF6347","name":"Tomato"},
		{"code":"#40E0D0","name":"Turquoise"},
		{"code":"#EE82EE","name":"Violet"},
		{"code":"#F5DEB3","name":"Wheat"},
		{"code":"#FFFFFF","name":"White"},
		{"code":"#F5F5F5","name":"WhiteSmoke"},
		{"code":"#FFFF00","name":"Yellow"},
		{"code":"#9ACD32","name":"YellowGreen"}
	];
	
	teamCategory: number;
	maxPlayersPerTeam: number;
	minPlayersPerTeam: number;
	teamName: string = "";
	teamComments: string = "";
	
	homeJerseyColor:string = "";
	homeJerseyStripColor:string = "";
	homeShortsColor:string = "";
	awayJerseyColor:string = "";
	awayJerseyStripColor:string = "";
	awayShortsColor:string = "";
	teamOwner: UserAccount;
	teamOwnerRole: string;
	
	teamContact: UserAccount;
	teamContactRole: string;
	teamContacts: TeamContact[];
	contactAccountFound = false;
	
	teamPlayers: Player[];
	
	categories = [];
	teamsByCategory = [];
	selectedTeam:Team;
	
	isValidFormSubmitted = false;
	
	categoryErrorMessage: string = '';
	teamNameErrorMessage: string = '';
	ownerRoleErrorMessage: string = '';
	contactEmailMessage: string = '';
	contactLastNameMessage: string = '';
	contactFirstNameMessage: string = '';
	contactRoleMessage: string = '';
	playerNumberErrorMessage: string[];
	playerLastNameErrorMessage: string = "Missing last name";
	playerFirstNameErrorMessage: string = "Missing first name";
	playerIdentificationErrorMessage: string[];
	playerYearOfBirthErrorMessage: string = '';
	
	validCategory = true;
	validName = true;
	validOwnerRole = true;
	validContactEmail = true;
	validContactLastName = true;
	validContactFirstName = true;
	validContactRole = true;
	validPlayerNumber = [];
	validPlayerLastName = [];
	validPlayerFirstName = [];
	validPlayerIdentification = [];
	validPlayerYearOfBirth = [];
	
  constructor(private appContext: AppContextService, private eventService: EventService, private userAccountService: UserAccountService) { }

	ngOnInit() {
		this.appContext.selectedNavOption = "myteams";
		this.eventService.getEventInfo().subscribe(eventInfo => {this.eventService.currentEvent = eventInfo; 
															   this.eventService.getCategories(this.eventService.currentEvent.id).
																subscribe(categories => {this.categories = categories;
																						if (this.categories) {
																							for (let category of this.categories) {
																								if (category.teams && category.teams.length >= category.maxNumberOfTeams &&
																										category.teams.length < category.maxNumberOfTeams + category.waitListMaxSize) {
																									category.description = category.description + " (Wait list)";
																								} else if (category.teams && category.teams.length >= category.maxNumberOfTeams + category.waitListMaxSize) {
																									category.description = category.description + " (Full)";
																								}
																							} 
																						 }
																						});
																
																this.eventService.getTeams(this.eventService.currentEvent.id,this.userAccountService.sessionId, false).
																	subscribe(teamsByCategory => {	this.teamsByCategory = teamsByCategory;
																									if (teamsByCategory && teamsByCategory.length > 0 &&
																											teamsByCategory[0].teams && teamsByCategory[0].teams.length > 0) {
																										this.setSelectedTeam(teamsByCategory[0].teams[0]);
																									}
																								});

															});
	}
	
	private getEmptyAccount(): UserAccount {
		let userAccount: UserAccount = new UserAccount();
		userAccount.email = "";
		userAccount.lastName = "";
		userAccount.firstName = "";	
		return userAccount;
	}	
  
	categoryChanged(selectedCategory): void {
		this.teamCategory = selectedCategory;
		console.log("Category changed, got new value: " + this.teamCategory);
		this.categories.forEach((category) => {
			if (category.id == this.teamCategory) { 
				console.log("Max players: " + category.maxPlayersPerTeam);
				if (this.teamPlayers.length < category.maxPlayersPerTeam) {
					for (var i = this.teamPlayers.length; i < category.maxPlayersPerTeam; i++) {
						var player = new Player();
						this.teamPlayers.push(player);
					}
				} else if (this.teamPlayers.length > category.maxPlayersPerTeam) {
					var playersToRemove = this.teamPlayers.length - category.maxPlayersPerTeam;
					console.log("current players: " + this.teamPlayers.length + " - new: " + category.maxPlayersPerTeam);
					this.teamPlayers.splice(category.maxPlayersPerTeam);
				}	
				this.resetPlayersValidation(category.maxPlayersPerTeam);
			}
		});
	}
	
	resetPlayersValidation(maxPlayersPerTeam: number) {
		this.validPlayerNumber = [];
		this.validPlayerLastName = [];
		this.validPlayerFirstName = [];
		this.validPlayerIdentification = [];
		this.validPlayerYearOfBirth = [];
		for (var i = 0; i <  maxPlayersPerTeam; i++) {
			this.validPlayerNumber.push(true);
			this.validPlayerLastName.push(true);
			this.validPlayerFirstName.push(true);
			this.validPlayerIdentification.push(true);
			this.validPlayerYearOfBirth.push(true);
		}			
	}
  
	onClearContact(): void {
		console.log("called onClearContact");
		if (this.teamContact) {
			console.log("in");
			this.teamContact = this.getEmptyAccount();
			this.teamContactRole = "";
			this.contactEmailMessage = "";
			this.contactLastNameMessage = "";
			this.contactFirstNameMessage = "";
			this.contactRoleMessage = "";
			this.validContactEmail = true;
			this.validContactLastName = true;
			this.validContactFirstName = true;
			this.validContactRole = true;			
		}
	  
	}
  
	homeAlternateColor(): string {
	  if (this.homeJerseyStripColor === "") {
		  return this.homeJerseyColor;
	  } else {
		  return this.homeJerseyStripColor;
	  }
	}

	awayAlternateColor(): string {
		if (this.awayJerseyStripColor === "") {
		  return this.awayJerseyColor;
		} else {
		  return this.awayJerseyStripColor;
		}
	}
	
	setSelectedTeam(team: Team): void {
		this.selectedTeam = team;
		this.teamCategory = this.selectedTeam.category.id;
		this.maxPlayersPerTeam = this.selectedTeam.category.maxPlayersPerTeam;
		this.minPlayersPerTeam = this.selectedTeam.category.minPlayersPerTeam;
		this.teamName = this.selectedTeam.name;
		this.teamComments = this.selectedTeam.comments;
		this.homeJerseyColor = this.selectedTeam.homeJerseyColor;
		this.homeJerseyStripColor = this.selectedTeam.homeStripColor;
		this.homeShortsColor = this.selectedTeam.homeShortsColor;
		this.awayJerseyColor = this.selectedTeam.awayJerseyColor;
		this.awayJerseyStripColor = this.selectedTeam.awayStripColor;
		this.awayShortsColor = this.selectedTeam.awayShortsColor;								
		this.teamOwner = this.selectedTeam.owner;
		this.teamOwnerRole = this.selectedTeam.ownerRole;	
		this.teamContacts = this.selectedTeam.contacts;	
		if (this.teamContacts && this.teamContacts.length > 0) {
			this.teamContact = this.teamContacts[0].account;
			this.teamContactRole = this.teamContacts[0].role;
		} else {
			this.teamContact = this.getEmptyAccount();
			this.teamContactRole = "";
		}
		this.teamPlayers = this.selectedTeam.players;
		this.resetPlayersValidation(this.maxPlayersPerTeam);		
		if (this.teamPlayers) {
			console.log("Players found");
			for (let player of this.teamPlayers) {
				console.log("Next Player: " + player.dateOfBirth);
				if (player.dateOfBirth) {
					let birthDate = new Date(player.dateOfBirth);
					console.log("Year is: " + birthDate + " - " + birthDate.getFullYear()); 
					player.yearOfBirth = birthDate.getFullYear();
				}
			}
			if (this.teamPlayers.length < this.maxPlayersPerTeam) {
				for (var i = this.teamPlayers.length; i < this.maxPlayersPerTeam; i++) {
					var player = new Player();
					this.teamPlayers.push(player);
				}
			}
		} else {
			for (i=0; i < this.maxPlayersPerTeam; i++) {
				var player = new Player();
				this.teamPlayers.push(player);
			}
		}
	}
	
	onTeamSelection(teamId: number):void {
		if (this.teamsByCategory && this.teamsByCategory.length > 0) {
			for (let category of this.teamsByCategory) {
				if (category && category.teams && category.teams.length > 0) {
					for (let team of category.teams) {
						if (team && team.id == teamId) {
							this.setSelectedTeam(team);
							return;
						}
					}
				}
			}
		}
	}
	
	onClearPlayer(playerId: number): void {
		console.log("Removing: " + playerId);
		this.teamPlayers.splice(playerId,1);
		this.teamPlayers.push(new Player());
		
		this.validPlayerNumber.splice(playerId,1);
		this.validPlayerNumber.push(true);
		this.validPlayerLastName.splice(playerId,1);
		this.validPlayerLastName.push(true);
		this.validPlayerFirstName.splice(playerId,1);
		this.validPlayerFirstName.push(true);
		this.validPlayerIdentification.splice(playerId,1);
		this.validPlayerIdentification.push(true);
		this.validPlayerYearOfBirth.splice(playerId,1);
		this.validPlayerYearOfBirth.push(true);	

		this.playerNumberErrorMessage.splice(playerId,1);
		this.playerNumberErrorMessage.push("");
		this.playerIdentificationErrorMessage.splice(playerId,1);
		this.playerIdentificationErrorMessage.push("");
	}
	
	selfContact(): boolean {
		if (this.teamContact && this.teamContact.email == this.userAccountService.currentUser.email) {
			return true;
		} else {
			return false;
		}
	}
	
	onContactEmail(): void {
		console.log("onContactEmail");
		this.contactAccountFound = false;
		this.userAccountService.getAccount(this.teamContact.email).subscribe(userAccount => {
																				if (userAccount && userAccount.lastName && userAccount.firstName ) {
																					this.teamContact.lastName = userAccount.lastName;
																					this.teamContact.firstName = userAccount.firstName;
																					this.contactAccountFound = true;
																				}
												});
	}
	
	beforeDeadline(): boolean {
		console.log("beforeDeadline");
		let today = new Date().toLocaleString();
		let deadline = new Date(this.eventService.currentEvent.registrationDeadline).toLocaleString();
		console.log("today is:  " + today);
		console.log("Deadline: " + deadline);
		if (deadline > today) {
			return true;
		} else {
			return false;
		}
	}
	
	onAddTeam(): void {
		this.clearMessages();
		this.selectedTeam = new Team();
		this.teamCategory = 0;
		this.maxPlayersPerTeam = 0;
		this.minPlayersPerTeam = 0;
		this.teamName = "";
		this.teamComments = "";
		this.homeJerseyColor = "";
		this.homeJerseyStripColor = "";
		this.homeShortsColor = "";
		this.awayJerseyColor = "";
		this.awayJerseyStripColor = "";
		this.awayShortsColor = "";								
		this.teamOwner = this.userAccountService.currentUser;
		this.teamOwnerRole = "";	
		
		this.teamContact = new UserAccount();
		this.teamContactRole = "";
		this.teamContacts = [];	
		this.teamPlayers = [];
		this.resetPlayersValidation(0);	
	}
	
	onKey(field: string): void {
		switch (field) {
			case "teamCategory": {
				this.validCategory = true;
				break;
			}
			case "teamName": {
				this.validName = true;
				break;
			}	
			case "ownerRole": {
				this.validOwnerRole = true;
				break;
			}
			case "contactEmail": {
				this.validContactEmail = true;
				break;
			}	
			case "contactLastName": {
				this.validContactLastName = true;
				break;
			}	
			case "contactFirstName": {
				this.validContactFirstName = true;
				break;
			}			
			case "contactRole": {
				this.validContactRole = true;
				break;
			}	
		}
	}	

	onPlayerKey(field: string, i: number): void {
		switch (field) {
			case "number": {
				this.validPlayerNumber[i] = true;
				break;
			}
			case "lastName": {
				this.validPlayerLastName[i] = true;
				break;
			}	
			case "firstName": {
				this.validPlayerFirstName[i] = true;
				break;
			}
			case "identification": {
				this.validPlayerIdentification[i] = true;
				break;
			}	
			case "yearOfBirth": {
				this.validPlayerYearOfBirth[i] = true;
				break;
			}	
		}
	}	
	
	onSubmit(): void {
		this.validateInput();
		if (this.isValidFormSubmitted) {
			var team = new Team();

			if (this.selectedTeam) {
				team.id = this.selectedTeam.id;
				team.owner = this.selectedTeam.owner;
				team.teamStatus = this.selectedTeam.teamStatus;
			} else {
				team.id = 0;
				team.owner = this.userAccountService.currentUser;
				team.teamStatus = "";			
			}
			var category = new Category();
			category.id = this.teamCategory;
			team.category = category;
			team.name = this.teamName;
			team.comments = this.teamComments;
			team.homeJerseyColor = this.homeJerseyColor;
			team.homeStripColor = this.homeJerseyStripColor;
			team.homeShortsColor = this.homeShortsColor;
			team.awayJerseyColor = this.awayJerseyColor;
			team.awayStripColor = this.awayJerseyStripColor;
			team.awayShortsColor = this.awayShortsColor;
			team.ownerRole = this.teamOwnerRole
			team.contacts = this.teamContacts;
			team.players = this.teamPlayers;
			this.eventService.saveTeam(team, this.userAccountService.sessionId).subscribe(data => {console.log("OK, Saved")});			
		}
	}
		
	validateInput(): void {
		var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
		this.clearMessages();
		this.isValidFormSubmitted = true;
		if (this.teamCategory == 0) {
			this.categoryErrorMessage = "Please select category";
			this.validCategory = false;
			this.isValidFormSubmitted = false;			
		}
		if (!this.teamName || this.teamName.trim().length == 0) {
			this.teamNameErrorMessage = "Team name is mandatory";
			this.validName = false;
			this.isValidFormSubmitted = false;	
		}	
		if (!this.teamOwnerRole || this.teamOwnerRole.trim().length == 0) {
			this.ownerRoleErrorMessage = "Select role";
			this.validOwnerRole = false;
			this.isValidFormSubmitted = false;	
		}
		if (this.teamContact.email || this.teamContact.lastName || this.teamContact.firstName) {
			if (!this.teamContact.email) {
				this.contactEmailMessage = "Contact email is missing";
				this.validContactEmail = false;
				this.isValidFormSubmitted = false;	
			} else if (regMail.test(this.teamContact.email) == false) {
				this.contactEmailMessage = "Invalid email address";
				this.validContactEmail = false;
				this.isValidFormSubmitted = false;				
			}
			if (!this.teamContact.lastName) {
				this.contactLastNameMessage = "Last name is missing";
				this.validContactLastName = false;
				this.isValidFormSubmitted = false;	
			}
			if (!this.teamContact.firstName) {
				this.contactFirstNameMessage = "First name is missing";
				this.validContactFirstName = false;
				this.isValidFormSubmitted = false;	
			}
			if (!this.teamContactRole) {
				this.contactRoleMessage = "Select role";
				this.validContactRole = false;
				this.isValidFormSubmitted = false;	
			}	
			
		}
		if (this.teamPlayers) {
			for (var i = 0 ; i < this.teamPlayers.length; i++) {
				if (this.teamPlayers[i].jerseyNumber || this.teamPlayers[i].lastName || this.teamPlayers[i].firstName || 
						this.teamPlayers[i].identification || this.teamPlayers[i].yearOfBirth) {
					if (!this.teamPlayers[i].jerseyNumber) {
						this.playerNumberErrorMessage[i] = "Missing jersey number";						
						this.validPlayerNumber[i] = false;
						this.isValidFormSubmitted = false;	
					} else if (isNaN(this.teamPlayers[i].jerseyNumber)) {
						this.playerNumberErrorMessage[i] = "Enter a number";						
						this.validPlayerNumber[i] = false;
						this.isValidFormSubmitted = false;	
					}  else if (!this.isEntryUnique("playerNumber",i)) {
						this.playerNumberErrorMessage[i] = "Number must be unique";						
						this.validPlayerNumber[i] = false;
						this.isValidFormSubmitted = false;							
					}
					if (!this.teamPlayers[i].lastName) {	
						this.validPlayerLastName[i] = false;
						this.isValidFormSubmitted = false;	
					}	
					if (!this.teamPlayers[i].firstName) {	
						this.validPlayerFirstName[i] = false;
						this.isValidFormSubmitted = false;	
					}
					if (!this.teamPlayers[i].identification) {	
						this.playerIdentificationErrorMessage[i] = "Missing identification";
						this.validPlayerIdentification[i] = false;
						this.isValidFormSubmitted = false;	
					} else if (!this.isEntryUnique("identification",i)) {
						this.playerIdentificationErrorMessage[i] = "Identification must be unique";						
						this.validPlayerIdentification[i] = false;
						this.isValidFormSubmitted = false;							
					}
					if (!this.teamPlayers[i].yearOfBirth) {	
						this.playerYearOfBirthErrorMessage = "Missing year of birth";
						this.validPlayerYearOfBirth[i] = false;
						this.isValidFormSubmitted = false;	
					} else {
						var currentDate = new Date();
						if (isNaN(this.teamPlayers[i].yearOfBirth) || this.teamPlayers[i].yearOfBirth > currentDate.getFullYear() ||
								this.teamPlayers[i].yearOfBirth < currentDate.getFullYear() - 100) {
							this.playerYearOfBirthErrorMessage = "Enter a valid year of birth";					
							this.validPlayerYearOfBirth[i] = false;
							this.isValidFormSubmitted = false;	
						}
					}
				}
			}
		}
	}
	
	isEntryUnique(field: string, index: number): boolean {
		let count: number = 0;
		for (var i = 0; i < this.teamPlayers.length; i++) {
			if (field == "playerNumber" && this.teamPlayers[i].jerseyNumber == this.teamPlayers[index].jerseyNumber) {
				count++;
			}
			if (field == "identification" && this.teamPlayers[i].identification == this.teamPlayers[index].identification) {
				count++;
			}			
		}
		if (count > 1) {
			return false;
		} else {
			return true;
		}
	}
	
	clearMessages(): void {
		this.categoryErrorMessage = "";
		this.teamNameErrorMessage = "";
		this.ownerRoleErrorMessage = "";
		this.contactEmailMessage = "";
		this.contactLastNameMessage = "";
		this.contactFirstNameMessage = "";
		this.contactRoleMessage = "";
		this.playerNumberErrorMessage = [];
		this.playerIdentificationErrorMessage = [];
		for (let player of this.teamPlayers) {
			this.playerNumberErrorMessage.push("");
			this.playerIdentificationErrorMessage.push("");
		}
		this.contactAccountFound = false;
	
		this.validCategory = true;
		this.validName = true;
		this.validOwnerRole = true;
		this.validContactEmail = true;
		this.validContactLastName = true;
		this.validContactFirstName = true;
		this.validContactRole = true;	
		this.resetPlayersValidation(this.maxPlayersPerTeam);		
	}

	onDelete(): void {
		
	}	
}