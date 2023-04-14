import { RootState } from 'models';

export const listDeliverySelector = (state: RootState) => state.deliveries.listDelivery || [];

export const detailDeliverySelector = (state: RootState) => state.deliveries.detailDelivery;

export const detailDeliveryAcceptSelector = (state: RootState) =>
	state.deliveries.detailDeliveryAccept;

export const listReviewSelector = (state: RootState) => state.deliveries.listReview;
