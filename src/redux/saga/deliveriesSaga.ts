import { PayloadAction } from '@reduxjs/toolkit';
import * as ActionType from 'action/deliveriesAction';
import deliveriesApi from 'api/deliveriesApi';
import { Loading } from 'components';
import _ from 'lodash';
import { CreateDeliveryPayload, ListDelivery, Review, ReviewPayload } from 'models';
import { goBack, navigate, naviPop } from 'navigationRef';
import { call, put, takeLatest } from 'redux-saga/effects';
import { SCREENNAME } from 'utils/constant';

//**********accept request/ create delivery*************** */
function* createDeliverySaga(action: PayloadAction<CreateDeliveryPayload>) {
	try {
		Loading.show();
		yield call(deliveriesApi.createDelivery, action.payload);
		goBack();
		navigate(SCREENNAME.REQUEST, { tab: 1 });
	} catch (error: any) {
		console.log(error, 'error create delivery');
		Loading.hide();
	} finally {
		Loading.hide();
	}
}

function* getListDeliverySaga() {
	try {
		const data: ListDelivery[] = yield call(deliveriesApi.getListDelivery);

		const obj = _.groupBy(data, (e) => e.status);

		const activeObj: any = {
			title: 'Active',
			data: [],
		};
		const pendingObj: any = {
			title: 'Pending',
			data: [],
		};
		const completedObj: any = {
			title: 'Completed',
			data: [],
		};

		// for (let key in obj) {
		// 	if (key === 'awaiting_request_confirmation') {
		activeObj.data.push(...data.filter((x) => x.status === 'awaiting_request_confirmation'));
		// } else if (
		// 	key === 'pending_delivery' ||
		// 	key === 'pending_review' ||
		// 	key === 'pending_revision'
		// ) {
		pendingObj.data.push(
			...data.filter((x) => x.status === 'pending_delivery'),
			...data.filter((x) => x.status === 'pending_review'),
			...data.filter((x) => x.status === 'pending_revision'),
		);
		// } else if (key === 'completed') {
		completedObj.data.push(...data.filter((x) => x.status === 'completed'));
		// 	}
		// }

		const finalList: any = [activeObj, pendingObj, completedObj];
		console.log(JSON.stringify(finalList), 'JSON');

		yield put(ActionType.getListDeliverySuccess(finalList));
	} catch (error: any) {
		console.log(error);
	}
}

//**********get detial delivery (my request)*************** */
function* getDetailDeliverySaga(action: PayloadAction<string>) {
	try {
		const response: ListDelivery[] = yield call(
			deliveriesApi.getDetailDeliveryByRequestId,
			action.payload,
		);
		yield put(ActionType.getDetailDeliverySuccess(response));
	} catch (error: any) {}
}

//**********get detial delivery (fullfil request)*************** */
function* getDetailDeliveryAcceptSaga(action: PayloadAction<string>) {
	try {
		const response: ListDelivery = yield call(deliveriesApi.getDetailDelivery, action.payload);
		yield put(ActionType.getDetailDeliveryAcceptSuccess(response));
	} catch (error: any) {}
}

//**********review User *************** */
function* reviewUserSaga(action: PayloadAction<ReviewPayload>) {
	try {
		Loading.show();
		const response: unknown = yield call(deliveriesApi.reviewUser, action.payload);
		naviPop(2);
	} catch (error: any) {
	} finally {
		Loading.hide();
	}
}
function* getReviewListSaga(action: PayloadAction<string>) {
	try {
		const response: Review = yield call(deliveriesApi.getReviewByUser, action.payload);
		yield put(ActionType.getReviewUserSuccess(response));
	} catch (error: any) {}
}
export default function* () {
	yield takeLatest(ActionType.CREATE_DELIVERY, createDeliverySaga);
	yield takeLatest(ActionType.GET_LIST_DELIVERY, getListDeliverySaga);
	yield takeLatest(ActionType.GET_DETAIL_DELIVERY, getDetailDeliverySaga);
	yield takeLatest(ActionType.GET_DETAIL_DELIVERY_ACCEPT, getDetailDeliveryAcceptSaga);
	yield takeLatest(ActionType.REVIEW_USER, reviewUserSaga);
	yield takeLatest(ActionType.GET_REVIEW_USER, getReviewListSaga);
}
