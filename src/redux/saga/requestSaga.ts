import { PayloadAction } from '@reduxjs/toolkit';
import * as ActionType from 'action/requestAction';
import { getCategorySuccess } from 'action/requestAction';
import authApi from 'api/authApi';
import requestApi from 'api/requestApi';
import { uploadFilesApi } from 'api/uploadFilesApi';
import { Loading } from 'components';
import _ from 'lodash';
import {
	Category,
	CreateQuest,
	ItemListTransaction,
	ListRequest,
	ListTransactionPayload,
	ParamsFilterFavorite,
	ResponseType,
	UploadFilesResponse,
	User,
	WithdrawPayload,
} from 'models';
import { goBack, navigate, naviPop } from 'navigationRef';
import { Alert } from 'react-native';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { userSelector } from 'selector/authenSelector';
import { SCREENNAME } from 'utils/constant';
import { API_URL } from 'utils/https';
//**********get list category*************** */
function* getCategorySaga() {
	try {
		const response: Category[] = yield call(requestApi.getCategory);
		const sortArr = _.orderBy(response, ['name'], ['asc']);
		yield put(getCategorySuccess(sortArr));
	} catch (error: any) {
		return;
	}
}

//**********create request*************** */
function* createRequestSaga(action: PayloadAction<CreateQuest>) {
	try {
		Loading.show();
		const response: ResponseType = yield call(requestApi.createRequest, {
			...action.payload.data,
			stripe_checkout_id: action.payload.stripe_checkout_id,
		});
		if (action.payload?.amount !== 0) {
			let amount = +action.payload?.amount / 100;
			navigate(SCREENNAME.PAYMENT_RESULT, {
				type: 'success',
				money: amount || 0,
				name: (response as any)?.name,
				...action.payload,
			});
		} else {
			navigate(SCREENNAME.SEARCH);
		}
		yield put(ActionType.getListRequestAction());
	} catch (error: any) {
		if (action.payload?.amount !== 0) {
			navigate(SCREENNAME.PAYMENT_RESULT, {
				type: 'fail',
				money: action.payload?.totalAmount || 0,
			});
		} else {
			Alert.alert('Error', 'Create request error');
		}
	} finally {
		Loading.hide();
	}
}

//**********list transaction*************** */
function* getListTransactionSaga() {
	try {
		Loading.show();
		const userData: User = yield select(userSelector);

		const res: { data: ItemListTransaction[] } = yield call(requestApi.getListTransaction, {
			userId: userData.id,
		});
		yield put(ActionType.getListTransactionSuccess(res?.data?.reverse()));
	} catch (error: any) {
		return;
	} finally {
		Loading.hide();
	}
}

//**********filter list transaction*************** */
function* filterListTransactionSaga(action: PayloadAction<ListTransactionPayload>) {
	try {
		Loading.show();
		const res: { data: ItemListTransaction[] } = yield call(
			requestApi.getListTransaction,
			action.payload,
		);
		if (_.isEmpty(res?.data)) {
			Alert.alert('Error', 'Not found!');
		} else {
			yield put(ActionType.getListTransactionSuccess(res?.data));
			goBack();
		}
	} catch (error) {
		Alert.alert('Error', 'Not found!');
	} finally {
		Loading.hide();
	}
}

//**********edit request*************** */
function* editRequestSaga(action: PayloadAction<any>) {
	try {
		Loading.show();
		let data = {
			...action.payload.data,
		};
		if (!action.payload.image?.uri.includes(API_URL)) {
			const upload: UploadFilesResponse[] = yield call(
				uploadFilesApi.upload,
				action.payload.image,
			);
			data = {
				...action.payload.data,
				picture: [upload[0]?.id],
			};
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		yield call(requestApi.editRequest, data);
		yield put(ActionType.getListRequestAction());
		naviPop(2);
	} catch (error: any) {
		return;
	} finally {
		Loading.hide();
	}
}

//**********delete request*************** */
function* deleteRequestSaga(action: PayloadAction<any>) {
	try {
		Loading.show();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		yield call(requestApi.deleteRequest, action.payload);
		yield put(ActionType.getListRequestAction());
		naviPop(2);
	} catch (error: any) {
		return;
	} finally {
		Loading.hide();
	}
}

//**********get list request (Search)*************** */
function* getListRequestSaga() {
	try {
		const res: ListRequest[] = yield call(requestApi.getListRequest);
		const data = res.reverse() || [];
		// const obj = _.groupBy(data, (e) => e.status)

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
		// 	if (key === 'active') {
		activeObj.data.push(...data.filter((x) => x.status === 'active'));
		// } else if (key === 'pending') {
		pendingObj.data.push(...data.filter((x) => x.status === 'pending'));
		// } else if (key === 'completed') {
		completedObj.data.push(...data.filter((x) => x.status === 'completed'));
		// }
		// }

		const finalList: any = [activeObj, pendingObj, completedObj];
		yield put(ActionType.getListRequestSuccess(res));
		yield put(ActionType.getListMyRequestSuccess(finalList));
	} catch (error: any) {
		return;
	}
}

//**********filter favorite*************** */
function* filterFavoriteSaga(action: PayloadAction<ParamsFilterFavorite>) {
	try {
		Loading.show();
		const response: ListRequest[] = yield call(requestApi.filterFavorite, action.payload);
		yield put(ActionType.getListRequestSuccess(response?.reverse()));

		if (_.isEmpty(response)) {
			Alert.alert('Notice', 'Not found');
		} else {
			navigate(SCREENNAME.SEARCH, action.payload.screenParam);
		}
	} catch (error: any) {
		Alert.alert('Notice', 'Not found');
	} finally {
		Loading.hide();
	}
}

//**********search list request (Search)*************** */
function* searchRequestSaga(action: PayloadAction<any>) {
	try {
		const response: ListRequest[] = yield call(requestApi.searchRequest, action.payload);
		yield put(ActionType.getListRequestSuccess(response));
	} catch (error: any) {
		return;
	}
}

//**********get detail request*************** */
function* getDetailRequestSaga(action: any) {
	try {
		Loading.show();
		const response: ListRequest = yield call(requestApi.getDetailRequest, action.payload);
		yield put(ActionType.getDetailRequestSuccess(response));
		navigate(SCREENNAME.DETAIL_JOB);
	} catch (error: any) {
		return;
	} finally {
		Loading.hide();
	}
}

//**********withdraw*************** */
function* withdrawSaga(action: PayloadAction<WithdrawPayload>) {
	try {
		Loading.show();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const response: ResponseType = yield call(authApi.withdraw, action.payload);
		if (response?.message) {
			Alert.alert('Error', response?.message);
		} else {
			navigate(SCREENNAME.SUCCESS_WITHDRAW);
			Alert.alert(
				'Success',
				'Withdrawal Request is Successful. Check again to review your request',
			);
		}
	} catch (error: any) {
		Alert.alert('Error', error?.message);
	} finally {
		Loading.hide();
	}
}

export default function* () {
	yield takeLatest(ActionType.GET_CATEGORY, getCategorySaga);
	yield takeLatest(ActionType.CREATE_REQUEST, createRequestSaga);
	yield takeLatest(ActionType.EDIT_REQUEST, editRequestSaga);
	yield takeLatest(ActionType.GET_LIST_REQUEST, getListRequestSaga);
	yield takeLatest(ActionType.FILTER_FAVORITE, filterFavoriteSaga);
	yield takeLatest(ActionType.SEARCH_REQUEST, searchRequestSaga);
	yield takeLatest(ActionType.GET_DETAIL_REQUEST, getDetailRequestSaga);
	yield takeLatest(ActionType.DELETE_REQUEST, deleteRequestSaga);
	yield takeLatest(ActionType.GET_LIST_TRANSACTION, getListTransactionSaga);
	yield takeLatest(ActionType.FILTER_LIST_TRANSACTION, filterListTransactionSaga);
	yield takeLatest(ActionType.WITHDRAW, withdrawSaga);
}
