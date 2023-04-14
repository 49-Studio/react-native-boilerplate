import { createAction } from '@reduxjs/toolkit';
import { CreateDeliveryPayload, ListDelivery, Review, ReviewPayload } from 'models';

//*************CREATE_DELIVERY (accept request)*************** */
export const CREATE_DELIVERY = 'CREATE_DELIVERY';
export const createDeliveryAction = createAction<CreateDeliveryPayload>(CREATE_DELIVERY);

//*************GET_LIST_DELIVERY (list fullfil request & detail my request)*************** */
export const GET_LIST_DELIVERY = 'GET_LIST_DELIVERY';
export const getListDeliveryAction = createAction(GET_LIST_DELIVERY);

export const GET_LIST_DELIVERY_SUCCESS = 'GET_LIST_DELIVERY_SUCCESS';
export const getListDeliverySuccess = createAction<ListDelivery[]>(GET_LIST_DELIVERY_SUCCESS);

//*************GET DETEAIL DELIVERY*************** */
export const GET_DETAIL_DELIVERY = 'GET_DETAIL_DELIVERY';
export const getDetailDeliveryAction = createAction<string>(GET_DETAIL_DELIVERY);

export const GET_DETAIL_DELIVERY_SUCCESS = 'GET_DETAIL_DELIVERY_SUCCESS';
export const getDetailDeliverySuccess = createAction<ListDelivery[]>(GET_DETAIL_DELIVERY_SUCCESS);

//*************GET_DETAIL_DELIVERY_ACCEPT*************** */
export const GET_DETAIL_DELIVERY_ACCEPT = 'GET_DETAIL_DELIVERY_ACCEPT';
export const getDetailDeliveryAcceptAction = createAction<string>(GET_DETAIL_DELIVERY_ACCEPT);

export const GET_DETAIL_DELIVERY_ACCEPT_SUCCESS = 'GET_DETAIL_DELIVERY_ACCEPT_SUCCESS';
export const getDetailDeliveryAcceptSuccess = createAction<ListDelivery>(
	GET_DETAIL_DELIVERY_ACCEPT_SUCCESS,
);

//*************REVIEW_USER*************** */
export const REVIEW_USER = 'REVIEW_USER';
export const reviewUserAction = createAction<ReviewPayload>(REVIEW_USER);

export const GET_REVIEW_USER = 'GET_REVIEW_USER';
export const getReviewUserAction = createAction<string>(GET_REVIEW_USER);

export const GET_REVIEW_USER_SUCCESS = 'GET_REVIEW_USER_SUCCESS';
export const getReviewUserSuccess = createAction<Review>(GET_REVIEW_USER_SUCCESS);
