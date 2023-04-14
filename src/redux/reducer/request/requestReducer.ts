import { AnyAction } from '@reduxjs/toolkit';
import { LOG_OUT } from 'action/authenAction';
import * as ActionType from 'action/requestAction';
import * as Models from 'models/Request';

export interface RequestState {
	category: Models.Category[];
	request: Models.ListRequest[];
	detailRequest: Models.ListRequest;
	favorite: Models.ListRequest[];
	listTransaction: Models.ItemListTransaction[];
	myRequest: any[];
}

const initialState: RequestState = {
	category: [],
	request: [],
	myRequest: [],
	detailRequest: {
		id: '',
		name: '',
		description: '',
		picture: [
			{
				id: '',
				name: '',
				alternativeText: '',
				caption: '',
				width: 0,
				height: 0,
				formats: {},
				hash: '',
				ext: '',
				mime: '',
				size: 0,
				url: '',
				previewUrl: '',
				provider: '',
				provider_metadata: {},
				related: '',
				created_by: '',
				updated_by: '',
			},
		],
		type: '',
		deadline: '',
		duration: 0,
		categories: [
			{
				id: '',
				name: '',
				is_feature: false,
				created_by: '',
				updated_by: '',
			},
		],
		budget: 0,
		is_shared: false,
		is_favorite: false,
		owner: {
			id: '',
			username: '',
			email: '',
			provider: '',
			password: '',
			resetPasswordToken: '',
			confirmationToken: '',
			confirmed: false,
			blocked: false,
			role: '',
			name: '',
			phone: '',
			country_code: '',
			lat: 0,
			long: 0,
			rating: 0,
			created_by: '',
			updated_by: '',
		},
		status: '',
		lat: 0,
		long: 0,
		address: '',
		only_visbile_within_50km: false,
		accept_first_request: false,
		createdAt: '',
		updatedAt: '',
		viewer: 0,
		delivery_time: 0,
	},
	favorite: [],
	listTransaction: [],
};

export const requestReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case ActionType.GET_CATEGORY_SUCCESS:
			return {
				...state,
				category: action.payload,
			};
		case ActionType.GET_LIST_REQUEST_SUCCESS:
			return {
				...state,
				request: action.payload,
			};
		case ActionType.GET_LIST_MY_REQUEST_SUCCESS:
			return {
				...state,
				myRequest: action.payload,
			};
		case ActionType.GET_LIST_FAVORITE_SUCCESS:
			return {
				...state,
				favorite: action.payload,
			};
		case ActionType.GET_DETAIL_REQUEST_SUCCESS:
			return {
				...state,
				detailRequest: action.payload,
			};
		case ActionType.GET_LIST_TRANSACTION_SUCCESS:
			return {
				...state,
				listTransaction: action.payload,
			};
		case LOG_OUT:
			return {
				...initialState,
			};
		default:
			return state;
	}
};
