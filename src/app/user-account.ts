import { Affiliation } from './event-info';

export class UserAccount {
  id: number;
  email: string;
  affiliation: Affiliation;	
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phone: string;
  disabled: boolean;
  activationCode: string;
  activationCodeExpiry: Date;
  password: string;
  activated: boolean;
  lastLogin: Date; 

  isRegistered: boolean;
  isConvenor: boolean;
  isReferee:boolean;
  isAdmin: boolean;	
}