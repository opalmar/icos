import { UserAccount } from './user-account';

export class EventInfo {
	id: number;
	organization: Organization;
	token: string;
	termAndConditionsURL: string;
	newAccountNameInputType: number;
	newAccountAddressInputType: number;
	newAccountPhoneInputType: number;
	affiliationType: AffiliationType;
	online: Date;
	offline: Date;
	start: Date;
	end: Date;
	registrationDeadline: Date;
	name: string;
	description: string;
	contact: string;
}

export class AffiliationType {
	id: number;
	description: string;
	allowsUserEntries: boolean;
	mandatorySelection: boolean;
	ownerOrganizationId: number;
	privateCategory: boolean;
}

export class Organization {
	id: number;
	name: string;
	token: string;
	termAndConditionsURL: string;
	newAccountNameInputType: number;
	newAccountAddressInputType: number;
	newAccountPhoneInputType: number;
}

export class Affiliation {
	id: number;
	affiliationType: AffiliationType;
	name: string;
	sortOrder: number;
	logo: object;
}

export class CodeValue {
	id: number;
	code: string;
	value: string;
	sortOrder: number;
}

export class Category {
	id: number;
	eventInfo: EventInfo;
	code: string;
	description: string ;
	sortOrder: number;
	minPlayersPerTeam: number;
	maxPlayersPerTeam: number;
	maxNumberOfTeams: number;
	waitListMaxSize: number;
	teams: Team[];
}

export class TeamContact {
	account : UserAccount;
	role: string;
}

export class Player {
	identification: string;
	lastName: string;
	firstName: string;
	dateOfBirth: Date;
	jerseyNumber: number;	
	yearOfBirth: number;
}

export class Team {
	id: number;
	category : Category;
	name: string;
	comments: string;
	homeJerseyColor: string;
	homeStripColor: string;
	homeShortsColor: string;
	awayJerseyColor: string;
	awayStripColor: string;
	awayShortsColor: string;
	owner: UserAccount;
	ownerRole: string;
	teamStatus: string;
	contacts: TeamContact[];
	players: Player[];
}