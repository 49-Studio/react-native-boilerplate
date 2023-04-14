import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_URL } from 'utils/https';
import InternetHelper from 'utils/InternetHelper';

let token = '';

export const setToken = (accessToken: string) => {
	token = accessToken;
};
// const getTokenStore = async () => {
// 	const tokenStore = await getStoreData(keyAsyncStorage.token);
// 	return tokenStore;
// };
export const getToken = () => token;

const axiosClient = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 30000,
});

axiosClient.interceptors.request.use(
	function (config: AxiosRequestConfig) {
		if (!InternetHelper.isConnect()) {
			Promise.reject('No internet connection');
			return;
		}
		if (config.headers === undefined) {
			config.headers = {
				'Content-Type': 'application/json',
			};
		}
		if (token !== '') {
			config.headers.Authorization = 'Bearer ' + token;
		}
		console.log(config.baseURL, config.url, config.data, 'body api');

		return config;
	},
	function (error: AxiosError) {
		return Promise.reject(error);
	},
);
// Add a response interceptor
axiosClient.interceptors.response.use(
	function (response: AxiosResponse) {
		// console.info(JSON.stringify(response.data, null, 2), response.config.url, 'response api');
		return response.data;
	},
	function (error: AxiosError) {
		console.error(
			JSON.stringify(error.response?.data, null, 2),
			error.response?.config.url,
			error,
			'err res',
		);
		/* Checking if the error message is 'Network Error' and if it is, it will show a toast. */
		// if (error['message'] === 'Network Error') {
		// Toast.show({ type: 'error', text1: 'Không có kết nối Internet.' })
		// }
		return Promise.reject(error.response?.data);
	},
);
export default axiosClient;
