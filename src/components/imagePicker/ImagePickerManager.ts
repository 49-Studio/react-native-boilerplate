import { Alert, PermissionsAndroid, Platform } from 'react-native';
import {
	Asset,
	ImageLibraryOptions,
	ImagePickerResponse,
	launchImageLibrary,
} from 'react-native-image-picker';
import { openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export default class ImagePickerManager {
	static optionsPhoto: ImageLibraryOptions = {
		quality: 0.7,
		mediaType: 'photo',
		selectionLimit: 0,
		maxWidth: 1000,
		maxHeight: 1000,
	};

	static optionsVideo: ImageLibraryOptions = {
		quality: 0.7,
		mediaType: 'video',
		selectionLimit: 1,
		maxWidth: 1000,
		maxHeight: 1000,
	};

	static openLibrary(options: ImageLibraryOptions, onSuccess: (result?: Asset[]) => void) {
		launchImageLibrary(options, (response: ImagePickerResponse) => {
			if (response.didCancel) {
			} else if (response.errorCode) {
			} else if (response.errorMessage) {
			} else {
				onSuccess && onSuccess(response.assets);
			}
		});
	}

	static async launchLibrary(type: 'video' | 'photo', onSuccess: (result?: Asset[]) => void) {
		const options = type === 'video' ? this.optionsVideo : this.optionsPhoto;
		if (Platform.OS === 'ios') {
			request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
				if (result === RESULTS.GRANTED) {
					this.openLibrary(options, onSuccess);
				} else {
					Alert.alert('Notice', 'Please accept application for library to continue', [
						{ text: 'Cancel' },
						{
							text: 'OK',
							onPress: () => {
								openSettings();
							},
						},
					]);
				}
			});
		}
		//permissions use camera android
		else {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
				);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					this.openLibrary(options, onSuccess);
				}
			} catch (err) {}
		}
	}
}
