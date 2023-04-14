import { createAction } from '@reduxjs/toolkit';
import {
	Category,
	CreateQuest,
	ItemListTransaction,
	ListRequest,
	ListTransactionPayload,
	ParamsFilterFavorite,
	WithdrawPayload,
} from 'models';

//**************list request *********************/
export const GET_LIST_REQUEST = 'GET_LIST_REQUEST';
export const getListRequestAction = createAction(GET_LIST_REQUEST);

export const GET_LIST_REQUEST_SUCCESS = 'GET_LIST_REQUEST_SUCCESS';
export const getListRequestSuccess = createAction<ListRequest[]>(GET_LIST_REQUEST_SUCCESS);

export const GET_LIST_MY_REQUEST_SUCCESS = 'GET_LIST_MY_REQUEST_SUCCESS';
export const getListMyRequestSuccess = createAction<ListRequest[]>(GET_LIST_MY_REQUEST_SUCCESS);
//**************filter favorite *********************/
export const FILTER_FAVORITE = 'FILTER_FAVORITE';
export const filterFvoriteAction = createAction<ParamsFilterFavorite>(FILTER_FAVORITE);

export const GET_LIST_FAVORITE_SUCCESS = 'GET_LIST_FAVORITE_SUCCESS';
export const getListFavoriteSuccess = createAction<ListRequest[]>(GET_LIST_FAVORITE_SUCCESS);

//**************search list request *********************/
export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const searchRequestAction = createAction<any>(SEARCH_REQUEST);

/**************get detail request *********************/
export const GET_DETAIL_REQUEST = 'GET_DETAIL_REQUEST';
export const getDetailRequestAction = createAction<string>(GET_DETAIL_REQUEST);

export const GET_DETAIL_REQUEST_SUCCESS = 'GET_DETAIL_REQUEST_SUCCESS';
export const getDetailRequestSuccess = createAction<ListRequest>(GET_DETAIL_REQUEST_SUCCESS);

//**************create request *********************/
export const CREATE_REQUEST = 'CREATE_REQUEST';
export const createRequestAction = createAction<CreateQuest | any>(CREATE_REQUEST);

//**************edit request *********************/
export const EDIT_REQUEST = 'EDIT_REQUEST';
export const editRequestAction = createAction<CreateQuest>(EDIT_REQUEST);

//**************delete request *********************/
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const deleteRequestAction = createAction<string>(DELETE_REQUEST);

//**************CATEGORY *********************/
export const GET_CATEGORY = 'GET_CATEGORY';
export const getCategoryAction = createAction(GET_CATEGORY);

export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const getCategorySuccess = createAction<Category[]>(GET_CATEGORY_SUCCESS);

//**************LIST_TRANSACTION *********************/
export const GET_LIST_TRANSACTION = 'GET_LIST_TRANSACTION';
export const getListTransactionAction = createAction(GET_LIST_TRANSACTION);

export const GET_LIST_TRANSACTION_SUCCESS = 'GET_LIST_TRANSACTION_SUCCESS';
export const getListTransactionSuccess = createAction<ItemListTransaction[]>(
	GET_LIST_TRANSACTION_SUCCESS,
);

//**************FILTER_TRANSACTION *********************/
export const FILTER_LIST_TRANSACTION = 'FILTER_LIST_TRANSACTION';
export const filterTransactionAction =
	createAction<ListTransactionPayload>(FILTER_LIST_TRANSACTION);

//**************WITHDRAW *********************/
export const WITHDRAW = 'WITHDRAW';
export const withdrawAction = createAction<WithdrawPayload>(WITHDRAW);
