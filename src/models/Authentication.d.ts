import { ResponseType } from './AppModel';
import { User } from './User';

export interface LoginPayload {
	identifier: string;
	password: string;
}

export interface RegisterLocalPayload {
	username: string;
	email: string;
	password: string;
	name: string;
	phone: string;
	country_code: string;
}

export interface ChangePasswordPayload {
	identifier: string;
	password: string;
	newPassword: string;
}
export interface LoginResponse extends ResponseType {
	jwt: string;
	user: User;
}

export interface RegisterResponse {
	user: User;
}

export interface PhoneCode {
	_id: string;
	code: string;
	id: string;
	name: string;
}
