import { RootState } from 'models';

export const userSelector = (state: RootState) => state.authen.user;

export const isGuestUserSelector = (state: RootState) => state.authen.isGuestUser;

export const locationSelector = (state: RootState) => state.authen.location;

export const profileSelector = (state: RootState) => state.authen.profile;

export const balanceSelector = (state: RootState) => state.authen.balance || 0;

export const balancePendingSelector = (state: RootState) => state.authen.balancePending || 0;

export const rateCurrencySelector = (state: RootState) => state.authen.rateCurrency || 1;

export const isOnboardSelector = (state: RootState) => state.authen.is_onboard;

export const bankAccountSelector = (state: RootState) => state.authen.bankAccount || {};
