import { ListRequest } from './Request';

export interface User {
	rating?: number | string;
	avatar: string;
	description: string;
	confirmed: boolean;
	blocked: boolean;
	_id: string;
	username: string;
	email: string;
	name: string;
	phone: string | number | any;
	country_code: string;
	provider: string;
	createdAt: Date | string;
	updatedAt: Date | string;
	__v: number;
	role: {
		_id: string;
		name: string;
		description: string;
		type: string;
		__v: number;
		id: string;
	};
	lat: number;
	long: number;
	id: string;
	currency?: string;
	fcm_token: string;
	stripe_account_id: any;
	bank_statement: any;
	stripe_info?: any;
	back_identity_document?: any;
	front_identity_document?: any;
	bank_statement?: any;
}

export interface Profile {
	confirmed: boolean;
	blocked: boolean;
	_id: string;
	username: string;
	favoriteRequests: ListRequest[];
	email: string;
	name: string;
	phone: string | number;
	country_code: string;
	provider: string;
	createdAt: Date | string;
	updatedAt: Date | string;
	__v: number;
	role: {
		_id: string;
		name: string;
		description: string;
		type: string;
		__v: number;
		id: string;
	};
	lat: number;
	long: number;
	id: string;
	currency: string;
	fcm_token: string;
	back_identity_document?: any;
	front_identity_document?: any;
	bank_statement?: any;
	stripe_info: any;
}
export interface Location {
	coords: {
		accuracy: number;
		altitude: number;
		altitudeAccuracy: number;
		heading: number;
		latitude: number;
		longitude: number;
		speed: number;
	};
	mocked: boolean;
	provider: string;
	timestamp: number;
}

export interface Balance {
	data: {
		object: string;
		available: [
			{
				amount: number;
				currency: string;
				source_types: {
					card: number;
				};
			},
		];
		instant_available: [
			{
				amount: number;
				currency: string;
				source_types: {
					card: number;
				};
			},
		];
		livemode: boolean;
		pending: [
			{
				amount: number;
				currency: string;
				source_types: {
					card: number;
				};
			},
		];
	};
}
export interface LinkStripe {
	data: {
		object?: string;
		created?: number;
		expires_at?: number;
		url?: string;
		is_onboard?: boolean;
	};
}

interface FormCAStripe {
	business_url: string;
	business_description: string;
	business_phone: string;
	first_name: string;
	last_name: string;
	job: string;
	day_dob: string;
	month_dob: string;
	year_dob: string;
	address_1: string;
	address_2?: string;
	postal_code: string;
	city: string;
	state: string;
	phone: string;
	tax_number: string;
	iban: string;
	bank_holder_name: string;
	bank_number: string;
}
