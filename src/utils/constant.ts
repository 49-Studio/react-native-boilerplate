import { RequestParams } from 'models';
import Config from 'react-native-config';
export const DYNAMIC_LINK = Config.DYNAMIC_LINK;
export const STACKNAME = {
	AUTHENTICATION: 'AUTHENTICATIONSTACK',
	HOME: 'HOMESTACK',
};
export const SCREENNAME = {
	//authen stack
	WELCOME: 'WELCOME',
	LOGIN: 'LOGIN',
	CONGRAT: 'CONGRAT',
	PHONE: 'PHONE',
	VERIFICATION: 'VERIFICATION',
	FORGOTPASSWORD: 'FORGOTPASSWORD',
	VERIFIRESETPASSWORD: 'VERIFIRESETPASSWORD',
	NEWPASSWORD: 'NEWPASSWORD',
	//home stack
	HOME: 'HOME',

	SEARCH: 'SEARCH',
	DETAIL_JOB: 'DETAIL_JOB',

	//
	FAVOURITE: 'FAVOURITE',
	FILTER_JOB: 'FILTER_JOB',
	//
	CREATE_REQUEST: 'CREATE_REQUEST',
	PAYMENT: 'PAYMENT',
	PAYMENT_RESULT: 'PAYMENT_RESULT',
	LOCATION: 'LOCATION',

	//
	REQUEST: 'REQUEST',
	MY_REQUEST: 'MY_REQUEST',
	EDIT_REQUEST: 'EDIT_REQUEST',
	FULFIL_REQUEST: 'FULFIL_REQUEST',
	DETAIL_REQUEST: 'DETAIL_REQUEST',
	MESSAGING_REQUEST: 'MESSAGING_REQUEST',
	MESSAGING_ACCEPT: 'MESSAGING_ACCEPT',
	RATING_VIEW: 'RATING_VIEW',
	RATING_VIEW_REQUESTER: 'RATING_VIEW_REQUESTER',
	VIDEO_CALL: 'VIDEO_CALL',
	PLAY_BACK_VIDEO: 'PLAY_BACK_VIDEO',
	//
	PROFILE: 'PROFILE',
	PROFILE_ANOTHER: 'PROFILE_ANOTHER',
	CROP_IMAGE: 'CROP_IMAGE',
	CHANGE_IMAGE: 'CHANGE_IMAGE',
	SETTING: 'SETTING',
	PRIVACY_POLICY: 'PRIVACY_POLICY',
	TERM_OF_SERVICE: 'TERM_OF_SERVICE',
	CHANGE_MOBILE_NUMBER: 'CHANGE_MOBILE_NUMBER',
	VERIFY_CODE_CHANGE_PHONE_NUMBER: 'VERIFY_CODE_CHANGE_PHONE_NUMBER',
	SUCCESS_CHANGE_PHONE_NUMBER: 'SUCCESS_CHANGE_PHONE_NUMBER',
	CHANGE_PASSWORD: 'CHANGE_PASSWORD',
	CHANGE_CURRENCY: 'CHANGE_CURRENCY',
	//WALLET
	MY_WALLET: 'MY_WALLET',
	WITHDRAW: 'WITHDRAW',
	SUCCESS_WITHDRAW: 'SUCCESS_WITHDRAW',
	VERIFY_CODE_TO_TRANFER: 'VERIFY_CODE_TO_TRANFER',
	SORT_TRANSACTION: 'SORT_TRANSACTION',

	//STRIPE
	CREATE_ACCOUNT_STRIPE: 'CREATE_ACCOUNT_STRIPE',
	UPDATE_ACCOUNT_STRIPE: 'UPDATE_ACCOUNT_STRIPE',
	PAYMENT_STRIPE: 'PAYMENT_STRIPE',
	FROM_STRIPE: 'FROM_STRIPE',
};

export const paramsRequest: RequestParams = {
	id: '',
	location: '',
	coordinate: {
		latitude: 0,
		longitude: 0,
	},
	type: '',
	category: '',
	image: {
		uri: '',
		imageName: '',
	},
	duration: 0,
	period: 0,
	deliveryTime: 0,
	budget: 0,
	description: '',
	share: false,
	acceptVendor: false,
	only_visbile_within_50km: false,
	status: '',
};
export const userInfo = {
	tokenFCM: '',
};

export const MAX_PERIOD = 11;
