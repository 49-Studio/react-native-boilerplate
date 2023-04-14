import {
	GET_POLICY,
	GET_TERM,
	getConcurrenciesSuccess,
	getPolicySuccess,
	getTermSuccess,
} from 'action/ultilsAction';
import { ultilsApi } from 'api/ultilsApi';
import { Loading } from 'components';
import { Concurrencies, Policy, Term } from 'models/Ultils';
import { call, put, takeLatest } from 'redux-saga/effects';

import { GET_CONCURRENCI } from '../action/ultilsAction';

function* getListTermSaga() {
	try {
		Loading.show();
		const response: Term = yield call(ultilsApi.getTerm);
		yield put(getTermSuccess(response));
	} catch (error: any) {
	} finally {
		Loading.hide();
	}
}
function* getListPolicySaga() {
	try {
		Loading.show();
		const response: Policy = yield call(ultilsApi.getPolicy);
		yield put(getPolicySuccess(response));
	} catch (error: any) {
	} finally {
		Loading.hide();
	}
}
function* getConcurrenciesSaga() {
	try {
		const response: Concurrencies = yield call(ultilsApi.concurrencies);
		yield put(getConcurrenciesSuccess(response));
	} catch (error: any) {
	} finally {
	}
}
export default function* () {
	yield takeLatest(GET_TERM, getListTermSaga);
	yield takeLatest(GET_POLICY, getListPolicySaga);
	yield takeLatest(GET_CONCURRENCI, getConcurrenciesSaga);
}
