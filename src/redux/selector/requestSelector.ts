import { RootState } from 'models';

export const categorySelector = (state: RootState) => state.request.category;

export const listRequestSelector = (state: RootState) => state.request.request;

export const listFavoriteSelector = (state: RootState) => state.request.favorite;

export const detailRequestSelector = (state: RootState) => state.request.detailRequest;

export const myRequestSelector = (state: RootState) => state.request.myRequest;

export const listTransactionSelector = (state: RootState) => state.request.listTransaction;
