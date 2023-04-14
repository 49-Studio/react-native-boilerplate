/* eslint-disable unused-imports/no-unused-vars */
import { PayloadAction } from '@reduxjs/toolkit';
import {
	CHANGE_PASSWORD,
	CHECK_ACCOUNT_ON_BOARD,
	CREATE_ACCOUNT_STRIPE,
	createAccountOnboardSuccess,
	DELETE_AVATAR,
	GET_BANK_ACCOUNT,
	GET_PROFILE,
	GET_USER_BALANCE,
	getBankAccountSuccess,
	getProfileSuccess,
	getUserBalancePendingSuccess,
	getUserBalanceSuccess,
	LOGIN,
	LOGIN_APPLE,
	LOGIN_FACEBOOK,
	LOGIN_GOOGLE,
	LOGIN_GUEST,
	loginSuccess,
	REGISTER,
	setCurencyRate,
	setGuestUserAction,
	UPDATE_AVATAR,
	UPDATE_BACK_CARD,
	UPDATE_BANK_STATEMENT,
	UPDATE_FRONT_CARD,
	UPDATE_PROFILE,
} from 'action/authenAction';
import { getListFavoriteSuccess } from 'action/requestAction';
import authApi from 'api/authApi';
import { setToken } from 'api/axiosClient';
import { ultilsApi } from 'api/ultilsApi';
import { uploadFilesApi } from 'api/uploadFilesApi';
import { Loading } from 'components';
import { getDeviceToken } from 'config/Notification';
import {
	Balance,
	ChangePasswordPayload,
	LinkStripe,
	LoginPayload,
	Profile,
	ResponseType,
	UploadFilesResponse,
	User,
} from 'models';
import { LoginResponse, RegisterLocalPayload, RegisterResponse } from 'models/Authentication';
import { goBack, navigate } from 'navigationRef';
import { Alert } from 'react-native';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { modalChangePasswordRef } from 'screens/profile/ChangePassword';
import { userSelector } from 'selector/authenSelector';
import { keyAsyncStorage, removeStoreData, storeData } from 'utils/AsyncStorage';
import { SCREENNAME } from 'utils/constant';

//set rate currency
function* setRateCurrencySaga(response: any) {
	const changeCurrencyRate: unknown = yield call(ultilsApi.exchangeCurrencyProfile, {
		to: response.user?.currency,
	});
	const rate = changeCurrencyRate?.rates?.[response.user?.currency] || 0;
	yield put(setCurencyRate(rate / 100));
}

///////////log in////////////////////////
function* loginSaga(action: PayloadAction<LoginPayload>) {
	try {
		Loading.show();
		const response: LoginResponse = yield call(authApi.login, action.payload);
		if (response?.jwt) {
			setToken(response?.jwt);
			yield setRateCurrencySaga(response);
			yield put(loginSuccess(response.user));
			yield put(setGuestUserAction(false));
			navigate(SCREENNAME.CONGRAT, { type: 'login' });
			storeData(keyAsyncStorage.isLogedIn, action?.payload);
			storeData(keyAsyncStorage.authToken, response.jwt);
			storeData(keyAsyncStorage.profile, response.user);
		}
	} catch (error: any) {
		Loading.hide();
		if (error?.message) {
			Alert.alert('Login Invalid', `${error?.message?.[0]?.messages[0]?.message}`);
			removeStoreData(keyAsyncStorage.isLogedIn);
		}
	} finally {
		Loading.hide();
	}
}
function* loginGoogleSaga(action: PayloadAction<LoginPayload>) {
	try {
		Loading.show();
		const response: LoginResponse = yield call(authApi.loginGoogle, action.payload);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const FCM_TOKEN: string = yield getDeviceToken();
		if (response?.jwt) {
			setToken(response?.jwt);
			yield setRateCurrencySaga(response);
			yield put(loginSuccess(response.user));
			storeData(keyAsyncStorage.profile, response?.user);
			storeData(keyAsyncStorage.authToken, response?.jwt);
		}
		yield put(setGuestUserAction(false));
		navigate(SCREENNAME.CONGRAT, { type: 'login' });
	} catch (error: any) {
		if (error?.message) {
			Alert.alert('Login Invalid', `${error?.message[0]?.messages[0]?.message}`);
		}
	} finally {
		Loading.hide();
	}
}
function* loginFacebookSaga(action: PayloadAction<LoginPayload>) {
	try {
		Loading.show();
		const response: LoginResponse = yield call(authApi.loginFacebook, action.payload);
		yield getDeviceToken();
		if (response?.jwt) {
			setToken(response?.jwt);
			yield setRateCurrencySaga(response);
			yield put(loginSuccess(response.user));
			storeData(keyAsyncStorage.authToken, response.jwt);
			storeData(keyAsyncStorage.profile, response.user);
		}
		yield put(setGuestUserAction(false));
		navigate(SCREENNAME.CONGRAT, { type: 'login' });
	} catch (error: any) {
		if (error?.message) {
			Alert.alert('Login Invalid', `${error?.message[0]?.messages[0]?.message}`);
		}
	} finally {
		Loading.hide();
	}
}
function* loginAppleSaga(action: PayloadAction<LoginPayload>) {
	try {
		Loading.show();
		const response: LoginResponse = yield call(authApi.loginApple, action.payload);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const FCM_TOKEN: string = yield getDeviceToken();
		if (response?.jwt) {
			setToken(response?.jwt);
			yield setRateCurrencySaga(response);
			yield put(loginSuccess(response.user));
			storeData(keyAsyncStorage.authToken, response?.jwt);
			storeData(keyAsyncStorage.profile, response?.user);
		}
		yield put(setGuestUserAction(false));
		navigate(SCREENNAME.CONGRAT, { type: 'login' });
	} catch (error: any) {
		if (error?.message) {
			Alert.alert('Login Invalid', `${error?.message[0]?.messages[0]?.message}`);
		}
	} finally {
		Loading.hide();
	}
}
//////////////////////////////////
function* loginGuestSaga() {
	try {
		Loading.show();
		const response: LoginResponse = yield call(authApi.loginGuest);
		if (response?.jwt) {
			setToken(response?.jwt);
		}
		yield put(setGuestUserAction(true));
		navigate(SCREENNAME.CONGRAT, { type: 'login' });
	} catch (error: any) {
	} finally {
		Loading.hide();
	}
}
////////////register///////////////////////
function* registerSaga(action: PayloadAction<RegisterLocalPayload>) {
	try {
		Loading.show();
		const response: RegisterResponse = yield call(authApi.register, action.payload);
		yield put(setGuestUserAction(false));
		navigate(SCREENNAME.CONGRAT, { type: 'register' });
	} catch (error: any) {
		console.log(error);
	} finally {
		Loading.hide();
	}
}

//////////////Get proflie user/////////////////////
function* getUserProfileSaga() {
	try {
		const user: User = yield select(userSelector);
		const profileById: Profile = yield call(authApi.getProfileId, user._id);
		yield put(getProfileSuccess(profileById));
		yield put(getListFavoriteSuccess(profileById.favoriteRequests || []));
	} catch (error: any) {
		console.log(error);
	}
}

/////////////Update user profile//////////////////////
function* updateUserProfileSaga(action: PayloadAction<Profile | any>) {
	try {
		Loading.show();
		const response: Profile = yield call(authApi.updateProfile, action.payload);
		const user: User = yield select(userSelector);
		if (action.payload?.currency) {
			const changeCurrencyRate: unknown = yield call(ultilsApi.exchangeCurrencyProfile, {
				to: action.payload.currency,
			});
			const rate = changeCurrencyRate?.rates?.[action.payload?.currency] || 0;
			yield put(setCurencyRate(rate / 100));
		}
		yield put(loginSuccess({ ...user, ...action.payload }));
		!action.payload?.stayHere && goBack();
	} catch (error: any) {
		Alert.alert('Error', 'Update profile error');
	} finally {
		Loading.hide();
	}
}

/////////////Update user avatar//////////////////////
function* updateAvatarSaga(action: PayloadAction<any>) {
	try {
		const user: User = yield select(userSelector);
		const upload: UploadFilesResponse[] = yield call(uploadFilesApi.upload, action.payload);
		const response: Profile = yield call(authApi.updateProfile, {
			id: user.id,
			avatar: upload[0]?.url,
		});
		yield put(loginSuccess({ ...user, avatar: upload[0]?.url }));
	} catch (error: any) {
		Alert.alert('Error', 'Update profile error');
	}
}
function* updateFrontImageSaga(action: PayloadAction<any>) {
	try {
		const user: User = yield select(userSelector);
		const upload: UploadFilesResponse[] = yield call(uploadFilesApi.upload, action.payload);
		const response: Profile = yield call(authApi.updateProfile, {
			id: user.id,
			front_identity_document: upload?.[0]?.id,
		});
	} catch (error: any) {
		Alert.alert('Error', 'Update front card error');
	}
}
function* updateBackImageSaga(action: PayloadAction<any>) {
	try {
		const user: User = yield select(userSelector);
		const upload: UploadFilesResponse[] = yield call(uploadFilesApi.upload, action.payload);
		const response: Profile = yield call(authApi.updateProfile, {
			id: user.id,
			back_identity_document: upload?.[0]?.id,
		});
	} catch (error: any) {
		Alert.alert('Error', 'Update back card error');
	}
}
/////////////delete user avatar//////////////////////
function* deleteAvatarSaga() {
	try {
		const user: User = yield select(userSelector);
		const response: Profile = yield call(authApi.updateProfile, {
			id: user.id,
			avatar: '',
		});
		yield put(loginSuccess({ ...user, avatar: '' }));
	} catch (error: any) {
		Alert.alert('Error', 'Update profile error');
	}
}

/////////////change Password//////////////////////
function* changePasswordSaga(action: PayloadAction<ChangePasswordPayload>) {
	try {
		Loading.show();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const response: ResponseType = yield call(authApi.changePassword, action.payload);
		modalChangePasswordRef.current.open();
	} catch (error: any) {
		Alert.alert('Error', error?.data?.message);
	} finally {
		Loading.hide();
	}
}

/////////////User Balance//////////////////////
function* getUserBalanceSaga(action: PayloadAction<string>) {
	try {
		const response: Balance = yield call(authApi.getUserBalance);
		yield put(getUserBalanceSuccess(response.data.available?.[0].amount));
		yield put(getUserBalancePendingSuccess(response.data?.pending?.[0].amount));
	} catch (error: any) {
		console.log(error);
	}
}
// stripe
function* createAccountStripeSaga() {
	try {
		Loading.show();
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const response: LinkStripe = yield call(authApi.createStripeAccount);
		if (response.data.url !== '') {
			navigate(SCREENNAME.CREATE_ACCOUNT_STRIPE, { data: response });
		}
	} catch (error: any) {
		Loading.hide();
	} finally {
		Loading.hide();
	}
}

function* updateBankStatementSaga(action: PayloadAction<any>) {
	try {
		const user: User = yield select(userSelector);
		const upload: any[] = yield call(uploadFilesApi.upload, action.payload);
		const response: Profile = yield call(authApi.updateProfile, {
			id: user.id,
			bank_statement: upload?.[0]?.id,
		});
	} catch (error: any) {
		Alert.alert('Error', 'Update file error!');
	}
}

function* checkIsOnboardSaga() {
	try {
		const response: ResponseType = yield call(authApi.createStripeAccount);
		if (response.data.is_onboard) {
			yield put(createAccountOnboardSuccess(response.data.is_onboard));
		}
	} catch (error) {
		console.log(error);
	}
}
function* getBankAccountSaga() {
	try {
		const response: ResponseType = yield call(authApi.getBankAccount);
		yield put(getBankAccountSuccess(response));
	} catch (error) {
		console.log(error);
	}
}
export default function* () {
	yield takeLatest(LOGIN, loginSaga);
	yield takeLatest(LOGIN_GOOGLE, loginGoogleSaga);
	yield takeLatest(LOGIN_FACEBOOK, loginFacebookSaga);
	yield takeLatest(LOGIN_APPLE, loginAppleSaga);
	yield takeLatest(LOGIN_GUEST, loginGuestSaga);
	yield takeLatest(REGISTER, registerSaga);
	yield takeLatest(GET_PROFILE, getUserProfileSaga);
	yield takeLatest(UPDATE_PROFILE, updateUserProfileSaga);
	yield takeLatest(UPDATE_AVATAR, updateAvatarSaga);
	yield takeLatest(DELETE_AVATAR, deleteAvatarSaga);
	yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
	yield takeLatest(GET_USER_BALANCE, getUserBalanceSaga);
	yield takeLatest(CREATE_ACCOUNT_STRIPE, createAccountStripeSaga);
	yield takeLatest(UPDATE_FRONT_CARD, updateFrontImageSaga);
	yield takeLatest(UPDATE_BACK_CARD, updateBackImageSaga);
	yield takeLatest(UPDATE_BANK_STATEMENT, updateBankStatementSaga);
	yield takeLatest(CHECK_ACCOUNT_ON_BOARD, checkIsOnboardSaga);
	yield takeLatest(GET_BANK_ACCOUNT, getBankAccountSaga);
}
