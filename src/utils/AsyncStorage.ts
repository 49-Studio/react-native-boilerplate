import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty } from 'lodash';

import { parseJson } from './function';

export const keyAsyncStorage = {
	isFirstOpenedApp: '@isFirstOpenApp',
	isLogedIn: '@isLogedIn',
	rate: '@Rate',
	onboarding: 'onboarding',
	authToken: 'authToken',
	profile: 'profile',
};

export const storeData = async (key: string, value: any) => {
	console.log(key, value);
	try {
		const storeValue = typeof value === 'object' ? JSON.stringify(value) : value;
		await AsyncStorage.setItem(key, storeValue);
	} catch (e) {
		// saving error
	}
};

export const getStoreData = async (key: string) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			let storeVallue;
			try {
				storeVallue = JSON.parse(value);
			} catch (error) {
				storeVallue = value;
			}
			return storeVallue;
		} else return null;
	} catch (e) {
		// error reading value
	}
};
export const getMultiData = async (key: string[]) => {
	try {
		const values = await AsyncStorage.multiGet(key);
		if (!isEmpty(values)) {
			return values.map((item) => parseJson(item?.[1]));
		}
		return [];
	} catch (e) {
		return [];
	}
};
export const removeStoreData = async (key: string) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (e) {
		// remove error
	}
};

export const removeMultiStoreData = async (key: string[]) => {
	try {
		await AsyncStorage.multiRemove(key);
	} catch (e) {
		// remove error
	}
};

export const clearAllStoreData = async () => {
	try {
		await AsyncStorage.clear();
	} catch (e) {
		// clear error
	}
};
