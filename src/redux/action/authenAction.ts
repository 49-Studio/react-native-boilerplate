import { createAction } from '@reduxjs/toolkit';
import { Location, LoginPayload, Profile, RegisterLocalPayload, User } from 'models';

//*************LOGIN*************** */
export const LOGIN = 'LOGIN';
export const loginAction = createAction<LoginPayload>(LOGIN);

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = createAction<User>(LOGIN_SUCCESS);

//*************LOGIN_GOOGLE*************** */
export const LOGIN_GOOGLE = 'LOGIN_GOOGLE';
export const loginGoogleAction = createAction<any>(LOGIN_GOOGLE);

//*************LOGIN_GOOGLE*************** */
export const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
export const loginFacebookAction = createAction<any>(LOGIN_FACEBOOK);

//*************LOGIN_APPLE*************** */
export const LOGIN_APPLE = 'LOGIN_APPLE';
export const loginAppleAction = createAction<any>(LOGIN_APPLE);

//*************LOGIN_GUEST*************** */
export const LOGIN_GUEST = 'LOGIN_GUEST';
export const loginGuestAction = createAction(LOGIN_GUEST);

export const SET_GUEST_USER = 'SET_GUEST_USER';
export const setGuestUserAction = createAction<boolean>(SET_GUEST_USER);

//*************REGISTER*************** */
export const REGISTER = 'REGISTER';
export const registerAction = createAction<RegisterLocalPayload>(REGISTER);

//*************GET_PROFILE*************** */
export const GET_PROFILE = 'GET_PROFILE';
export const getProfileAction = createAction(GET_PROFILE);

export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const getProfileSuccess = createAction<Profile>(GET_PROFILE_SUCCESS);

export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const getUserByIdAction = createAction<any>(GET_USER_BY_ID);

export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const getUserByIdSuccess = createAction(GET_USER_BY_ID_SUCCESS);

//***********GET_LOCATION***************** */
export const GET_LOCATION = 'GET_LOCATION';
export const getLocationAction = createAction<Location | any>(GET_LOCATION);

//************UPDATE_PROFILE*****************/
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const updateProfileAction = createAction<any>(UPDATE_PROFILE);

//************UPDATE_AVATAR*****************/
export const UPDATE_AVATAR = 'UPDATE_AVATAR';
export const updateAvatarAction = createAction<any>(UPDATE_AVATAR);

//************UPDATE_FRONT_CARD*****************/
export const UPDATE_FRONT_CARD = 'UPDATE_FRONT_CARD';
export const updateFrontCardAction = createAction<any>(UPDATE_FRONT_CARD);

//************UPDATE_BACK_CARD*****************/
export const UPDATE_BACK_CARD = 'UPDATE_BACK_CARD';
export const updateBackCardAction = createAction<any>(UPDATE_BACK_CARD);

//************UPDATE_FRONT_CARD*****************/
export const UPDATE_BANK_STATEMENT = 'UPDATE_BANK_STATEMENT';
export const updateBankStatementAction = createAction<any>(UPDATE_BANK_STATEMENT);

//************DELETE_AVATAR*****************/
export const DELETE_AVATAR = 'DELETE_AVATAR';
export const deleteAvatarAction = createAction(DELETE_AVATAR);

//************CHANGE_PASSWORD**************** */
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const changePasswordAction = createAction<any>(CHANGE_PASSWORD);

//**************************** */
export const LOG_OUT = 'LOG_OUT';
export const logOutAction = createAction(LOG_OUT);

//*************GET_USER_BALANCE*************** */
export const GET_USER_BALANCE = 'GET_USER_BALANCE';
export const getUserBalanceAction = createAction<string>(GET_USER_BALANCE);

export const GET_USER_BALANCE_SUCCESS = 'GET_USER_BALANCE_SUCCESS';
export const GET_USER_BALANCE_PENDING_SUCCESS = 'GET_USER_BALANCE_PENDING_SUCCESS';

export const getUserBalanceSuccess = createAction<number>(GET_USER_BALANCE_SUCCESS);
export const getUserBalancePendingSuccess = createAction<any>(GET_USER_BALANCE_PENDING_SUCCESS);

//*************CHANGE_CURRENCY*************** */
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';
export const changeCurrencyAction = createAction<any>(CHANGE_CURRENCY);

export const CHANGE_CURRENCY_SUCCESS = 'CHANGE_CURRENCY_SUCCESS';
export const changeCurrencySuccess = createAction<any>(CHANGE_CURRENCY_SUCCESS);

export const SET_CURRENCY_RATE = 'SET_CURRENCY_RATE';
export const setCurencyRate = createAction<number>(SET_CURRENCY_RATE);

export const CREATE_ACCOUNT_STRIPE = 'CREATE_ACCOUNT_STRIPE';
export const createAccountStripeAction = createAction(CREATE_ACCOUNT_STRIPE);

export const CHECK_ACCOUNT_ON_BOARD = 'CHECK_ACCOUNT_ON_BOARD';
export const CHECK_ACCOUNT_ON_BOARD_SUCCESS = 'CHECK_ACCOUNT_ON_BOARD_SUCCESS';
export const createAccountOnboardAction = createAction(CHECK_ACCOUNT_ON_BOARD);
export const createAccountOnboardSuccess = createAction<any>(CHECK_ACCOUNT_ON_BOARD_SUCCESS);

export const GET_BANK_ACCOUNT = 'GET_BANK_ACCOUNT';
export const GET_BANK_ACCOUNT_SUCCESS = 'GET_BANK_ACCOUNT_SUCCESS';
export const getBankAccountAction = createAction(GET_BANK_ACCOUNT);
export const getBankAccountSuccess = createAction<any>(GET_BANK_ACCOUNT_SUCCESS);
