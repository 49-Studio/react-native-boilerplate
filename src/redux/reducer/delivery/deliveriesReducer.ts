import { AnyAction } from '@reduxjs/toolkit';
import { LOG_OUT } from 'action/authenAction';
import * as ActionType from 'action/deliveriesAction';
import { ListDelivery, Review } from 'models';

export interface DeliveriesState {
	listDelivery: any[];
	detailDelivery: ListDelivery[];
	listReview: Review[];
	detailDeliveryAccept?: ListDelivery;
}

const initialState: DeliveriesState = {
	listDelivery: [],
	detailDelivery: [],
	detailDeliveryAccept: undefined,
	listReview: [],
};

export const deliveriesReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case ActionType.GET_LIST_DELIVERY_SUCCESS:
			return {
				...state,
				listDelivery: action.payload,
			};
		case ActionType.GET_DETAIL_DELIVERY_SUCCESS:
			return {
				...state,
				detailDelivery: action.payload,
			};
		case ActionType.GET_DETAIL_DELIVERY_ACCEPT_SUCCESS:
			return {
				...state,
				detailDeliveryAccept: action.payload,
			};
		case ActionType.GET_REVIEW_USER_SUCCESS:
			return {
				...state,
				listReview: action.payload,
			};
		case LOG_OUT:
			return {
				...initialState,
			};
		default:
			return state;
	}
};
