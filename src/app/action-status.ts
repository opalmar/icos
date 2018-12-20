import { UserAccount } from './user-account';

export class ActionStatus {
  statusCode: number;
  errors: {field: string, message: string}[];
  warnings: {field: string, message: string}[];
  genericWarning: string;
  genericError: string;
}

export class SignStatus {
  statusCode: number;
  errors: {field: string, message: string}[];
  warnings: {field: string, message: string}[];
  genericWarning: string;
  genericError: string;
  sessionId: string;
  account: UserAccount;	
}