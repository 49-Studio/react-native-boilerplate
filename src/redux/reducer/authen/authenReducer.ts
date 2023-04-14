import { AnyAction } from '@reduxjs/toolkit';
import * as ActionType from 'action/authenAction';
import * as Models from 'models/User';

export interface AuthenState {
	user: Models.User;
	profile: Models.Profile | null;
	location: Models.Location | null;
	balance: number;
	balancePending: number;
	isGuestUser: boolean;
	currency: any;
	rateCurrency: number;
	is_onboard: boolean;
	bankAccount: any;
}
const userData: Models.User = {
	__v: 0,
	_id: '',
	blocked: false,
	confirmed: false,
	country_code: '',
	avatar: '',
	description: '',
	createdAt: '',
	email: '',
	id: '',
	name: '',
	phone: 0,
	provider: '',
	role: {
		__v: 0,
		_id: '',
		description: '',
		id: '',
		name: '',
		type: '',
	},
	updatedAt: '',
	username: '',
	lat: 0,
	long: 0,
	fcm_token: '',
	currency: '',
	stripe_account_id: '',
	bank_statement: '',
};

const initialState: AuthenState = {
	user: userData,
	location: null,
	profile: null,
	balance: 0,
	balancePending: 0,
	isGuestUser: false,
	currency: 'INR',
	rateCurrency: 1,
	is_onboard: false,
	bankAccount: null,
};

export const authenReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case ActionType.LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload,
			};

		case ActionType.GET_LOCATION:
			return {
				...state,
				location: action.payload,
			};
		case ActionType.SET_CURRENCY_RATE:
			return {
				...state,
				rateCurrency: action.payload,
			};
		case ActionType.GET_PROFILE_SUCCESS:
			return {
				...state,
				profile: action.payload,
			};
		case ActionType.GET_USER_BALANCE_SUCCESS:
			return {
				...state,
				balance: action.payload,
			};
		case ActionType.GET_USER_BALANCE_PENDING_SUCCESS:
			return {
				...state,
				balancePending: action.payload,
			};
		case ActionType.SET_GUEST_USER:
			return {
				...state,
				isGuestUser: action.payload,
			};
		case ActionType.CHANGE_CURRENCY_SUCCESS:
			return {
				...state,
				currency: action.payload,
			};
		case ActionType.CHECK_ACCOUNT_ON_BOARD_SUCCESS:
			return {
				...state,
				is_onboard: action.payload,
			};
		case ActionType.GET_BANK_ACCOUNT_SUCCESS:
			return {
				...state,
				bankAccount: action.payload,
			};
		case ActionType.LOG_OUT:
			return {
				...initialState,
			};
		default:
			return state;
	}
};
