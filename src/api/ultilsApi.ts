import axiosClient from './axiosClient';

export const ultilsApi = {
	getTerm() {
		const url = '/term';
		return axiosClient.get(url);
	},
	getPolicy() {
		const url = '/policy';
		return axiosClient.get(url);
	},
	concurrencies() {
		const url = '/concurrencies';
		return axiosClient.get(url);
	},
	checkPromotion(amount: any, code: string) {
		const url = 'promotions/validate';
		return axiosClient.post(url, {
			amount,
			code,
		});
	},
	getStateIndia() {
		const url = '/states';
		return axiosClient.get(url);
	},
	getJobTitle() {
		const url = '/job-titles';
		return axiosClient.get(url);
	},
	exchangeCurrency(data: any) {
		const url = 'concurrencies/exchange';
		return axiosClient.post(url, {
			amount: data.amount,
			from: data.from,
			to: 'INR',
		});
	},
	exchangeCurrencyProfile(data: any) {
		const url = 'concurrencies/exchange';
		return axiosClient.post(url, {
			amount: 100,
			from: 'INR',
			to: data.to,
		});
	},
};
