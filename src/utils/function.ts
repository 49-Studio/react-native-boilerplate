import { getLocationAction } from 'action/authenAction';
import moment from 'moment';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import RNSettings from 'react-native-settings';

import store from '../redux/store';

export const convertNumber = (score: number | string = 0) => {
	if (score > 999) return score;
	const re = /\B(?=(\d{3})+(?!\d))/g;
	return score?.toString()?.replace(re, ',') || 0;
};

export function capitalize(str = ''): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export const phoneCodeNumber = (code: string, phone: string) => {
	return phone?.charAt(0) == '0' ? code + phone.substring(1) : code + phone;
};

export const dateFromNow = (date: string | Date) => {
	let timeAgo = '';
	let ms_Min = 60 * 1000; // milliseconds in Minute
	let ms_Hour = ms_Min * 60; // milliseconds in Hour
	let ms_Day = ms_Hour * 24; // milliseconds in day
	let ms_week = ms_Day * 7; // milliseconds in week
	let ms_Mon = ms_Day * 30; // milliseconds in Month
	let ms_Yr = ms_Day * 365; // milliseconds in Year
	const now = moment.utc();
	let end = moment(date);
	let diff = now.diff(end, 'milliseconds');
	if (diff < ms_Min) {
		timeAgo = 'just now';
	} else if (diff < ms_Hour) {
		timeAgo = Math.round(diff / ms_Min) + ' minute ago';
	} else if (diff < ms_Day) {
		timeAgo = Math.round(diff / ms_Hour) + ' hour ago';
	} else if (diff < ms_week) {
		timeAgo = Math.round(diff / ms_Day) + ' day ago';
	} else if (diff < ms_Mon) {
		timeAgo = Math.round(diff / ms_week) + ' week ago';
	} else if (diff < ms_Yr) {
		timeAgo = Math.round(diff / ms_Mon) + ' month ago';
	} else {
		timeAgo = Math.round(diff / ms_Yr) + ' year ago';
	}

	return timeAgo;
};
// format time
export const timeConvert = (num: any) => {
	let hours = num / 60;
	let rhours = Math.floor(hours);
	let minutes = (hours - rhours) * 60;
	let rminutes = Math.round(minutes);
	return rhours + ' hours ' + rminutes + ' minutes.';
};

export async function writeStoragePermission() {
	if (Platform.OS === 'android') {
		const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

		const hasPermission = await PermissionsAndroid.check(permission);
		if (hasPermission) {
			return true;
		}

		const status = await PermissionsAndroid.request(permission);
		return status === 'granted';
	}
}

export const getCurrentLatLong = async () => {
	if (Platform.OS === 'ios') {
		requestMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE])
			.then((status) => {
				//check if iphone didn't turn on Location service
				if (
					status[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === 'unavailable' &&
					status[PERMISSIONS.IOS.LOCATION_ALWAYS] === 'unavailable'
				) {
					Alert.alert('Error', 'Please turn on location service', [
						{ text: 'Cancel' },
						{
							text: 'Turn on',
							onPress: () => Linking.openURL('App-Prefs:Privacy&path=LOCATION'), //open location service on ios
						},
					]);
				} else {
					Geolocation.getCurrentPosition(
						(positions) => {
							store.dispatch(getLocationAction(positions));
						},
						(error) => {
							Alert.alert('Error', 'Please allow app for location in setting', [
								{ text: 'Cancel' },
								{
									text: 'Turn on',
									onPress: () => Linking.openSettings(), //open app setting
								},
							]);
						},
						{ enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
					);
				}
			})
			.catch((err) => {});
	}
	//Android
	else {
		requestMultiple([
			PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
			PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
		]).then((statuses) => {
			if (
				statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] !== 'granted' &&
				statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] !== 'granted'
			) {
				Alert.alert('Error', 'Please allow app for location in setting', [
					{ text: 'Cancel' },
					{
						text: 'Turn on',
						onPress: () => Linking.openSettings(), //open app setting
					},
				]);
			} else {
				Geolocation.getCurrentPosition(
					(positions) => {
						store.dispatch(getLocationAction(positions));
					},
					(error) => {
						Alert.alert('Error', 'Please turn on location', [
							{ text: 'Cancel' },
							{
								text: 'Turn on',
								onPress: () =>
									RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS),
							},
						]);
					},
					{ enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
				);
			}
		});
	}
};

//************SOCIAL_LOGIN************* */
// Login Apple
export const linkApple = async () => {
	try {
	} catch (error: any) {}
};
// Login Facebook
export const linkFacebook = async () => {
	try {
		const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
		if (result.isCancelled) {
			throw 'User cancelled the login process';
		} else {
			// Once signed in, get the users AccesToken
			const data = await AccessToken.getCurrentAccessToken();
			const currentProfile: any = await Profile.getCurrentProfile();
			const userFB = Object.assign({}, data, currentProfile);
			if (userFB.email === '' || userFB?.name === '') {
				return null;
			} else {
				return userFB;
			}
		}
	} catch (error: any) {
		return null;
	}
};
export function numberWithSpace(x: number | string | any) {
	return x.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
}
export function parseJson(data: any) {
	let result = data;
	try {
		result = JSON.parse(data);
	} catch (error) {
		return null;
	}
	return result;
}
