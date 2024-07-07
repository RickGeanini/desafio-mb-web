// ENUMS
import { EPersonType } from '@enums/registration';

export interface IRegisterPayload {
	date: string;
	document: string;
	email: string;
	name: string;
	password: string;
	person_type: EPersonType;
	phone: string;
}
