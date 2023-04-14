import { ChangePasswordPayload, LoginPayload, Profile } from 'models';

import axiosClient from './axiosClient';

const authApi = {
	login(data: LoginPayload) {
		const url = '/auth/local';
		return axiosClient.post(url, data);
	},
	loginGoogle(data: any) {
		const url = '/auth/google';
		return axiosClient.post(url, data);
	},
	loginFacebook(data: any) {
		const url = '/auth/facebook';
		return axiosClient.post(url, data);
	},
	loginApple(data: any) {
		const url = '/auth/apple';
		return axiosClient.post(url, data);
	},
	loginGuest() {
		const url = '/auth/guest';
		return axiosClient.post(url);
	},

	register(data: any) {
		const url = '/auth/local/register';
		return axiosClient.post(url, data);
	},

	getCountryCode() {
		const url = '/country-codes?_limit=300';
		return axiosClient.get(url);
	},

	getProfileId(id: string) {
		const url = `/users/${id}`;
		return axiosClient.get(url);
	},

	updateProfile(data: Profile | any) {
		const url = `/users/${data?.id}`;
		return axiosClient.put(url, data);
	},
	withdraw(data: any) {
		const url = '/users/withdraw';
		return axiosClient.post(url, data);
	},
	forgetPassword(email: string) {
		const url = '/auth/forgot-password';
		return axiosClient.post(url, { email: email });
	},

	changePassword(data: ChangePasswordPayload) {
		const url = 'users/changePassword';
		return axiosClient.post(url, data);
	},

	deleteAccount(id: string) {
		const url = `/users/${id}`;
		return axiosClient.delete(url);
	},
	getUserBalance() {
		const url = 'users/me/balance';
		return axiosClient.get(url);
	},

	sendOtp(phone: string) {
		const url = 'otp/send';
		return axiosClient.post(url, {
			to: phone,
		});
	},
	verifyOtp(data: any) {
		const url = 'otp/verify';
		return axiosClient.post(url, {
			to: data.phone,
			code: data.code,
		});
	},
	resetPassword(data: any) {
		const url = 'auth/reset-password';
		return axiosClient.post(url, data);
	},
	createStripeAccount() {
		const url = '/users/me/stripe';
		return axiosClient.post(url);
	},
	updateStripeAccount2(data: any) {
		const url = '/users/me/stripe';
		return axiosClient.put(url, data);
	},
	updateStripeAccount() {
		const url = '/users/me/stripe?update=true';
		return axiosClient.post(url);
	},
	getBankAccount() {
		const url = '/bank-accounts/me';
		return axiosClient.get(url);
	},
};
export default authApi;
