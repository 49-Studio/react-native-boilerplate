import { AnyAction } from '@reduxjs/toolkit';
import { LOG_OUT } from 'action/authenAction';
import { GET_POLICY_SUCCESS, GET_TERM_SUCCESS } from 'action/ultilsAction';
import { Concurrencies, Policy, Term } from 'models/Ultils';

import { GET_CONCURRENCI_SUCCESS } from '../../action/ultilsAction';

export interface UltilsState {
	term: Term;
	policy: Policy;
	concurrencies: Concurrencies;
}
const initialState: UltilsState = {
	term: {
		_id: '',
		name: '',
		title: '',
		body: '',
		published_at: '',
		createdAt: '',
		updatedAt: '',
		__v: 0,
		id: '',
	},
	policy: {
		_id: '',
		name: '',
		title: '',
		body: '',
		published_at: '',
		createdAt: '',
		updatedAt: '',
		__v: 0,
		id: '',
	},
	concurrencies: {
		AUD: '',
		BGN: '',
		BRL: '',
		CAD: '',
		CHF: '',
		CNY: '',
		CZK: '',
		DKK: '',
		EUR: '',
		GBP: '',
		HKD: '',
		HRK: '',
		HUF: '',
		IDR: '',
		ILS: '',
		INR: '',
		ISK: '',
		JPY: '',
		KRW: '',
		MXN: '',
		MYR: '',
		NOK: '',
		NZD: '',
		PHP: '',
		PLN: '',
		RON: '',
		SEK: '',
		SGD: '',
		THB: '',
		TRY: '',
		USD: '',
		ZAR: '',
	},
};
export const ultisReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case GET_TERM_SUCCESS:
			return {
				...state,
				term: action.payload,
			};
		case GET_POLICY_SUCCESS:
			return {
				...state,
				policy: action.payload,
			};
		case GET_CONCURRENCI_SUCCESS:
			return {
				...state,
				concurrencies: action.payload,
			};
		case LOG_OUT:
			return {
				...initialState,
			};
		default:
			return state;
	}
};
