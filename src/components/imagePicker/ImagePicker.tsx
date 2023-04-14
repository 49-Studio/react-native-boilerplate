/* eslint-disable no-empty */
/* eslint-disable react/display-name */
import { colors, sizes, Style } from 'assets';
import { BottomSheet, SubmitButton } from 'components';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
	Alert,
	PermissionsAndroid,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker/src';
import { openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

interface Props {
	ref: any;
	option?: number;
	onUpload: (image: any) => void;
	showDelete?: boolean;
	onDelete?: () => void;
}
const options: any = {
	storageOptions: {
		skipBackup: true,
		path: 'images',
	},
	cameraType: 'back',
	mediaType: 'photo',
	quality: 0.7,
};

const ImagePicker = forwardRef((props: Props, ref: any) => {
	const refs = useRef<any>();

	useImperativeHandle(ref, () => ({
		open: () => open(),
		close: (callback: () => void) => close(callback),
	}));

	const open = () => {
		refs.current.open();
	};
	const close = (callback = () => {}): void => {
		refs?.current?.close(Boolean(callback) && callback);
	};

	const openCamera = () => {
		launchCamera(options, (response: any) => {
			if (response.didCancel) {
			} else if (response.errorCode) {
			} else if (response.errorMessage) {
			} else {
				let img = {
					uri: response.assets[0].uri,
					type: response.assets[0].type,
					name: response.assets[0].fileName,
					fileSize: response.assets[0].fileSize,
					quality: 0.5,
					// base64: response.base64,
				};
				close();
				props.onUpload(img);
			}
		});
	};
	const onPressLaunchCamera = async () => {
		if (Platform.OS === 'ios') {
			request(PERMISSIONS.IOS.CAMERA).then((result) => {
				if (result === RESULTS.GRANTED) {
					openCamera();
				} else {
					Alert.alert('Notice', 'Please accept application for camera to continue', [
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
		} else {
			try {
				const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					openCamera();
				}
			} catch (err) {}
		}
	};
	const openLibrary = () => {
		launchImageLibrary(options, (response: any) => {
			if (response.didCancel) {
			} else if (response.errorCode) {
			} else if (response.errorMessage) {
			} else {
				let img = {
					uri: response.assets[0].uri,
					type: response.assets[0].type,
					name: response.assets[0].fileName,
					fileSize: response.assets[0].fileSize,
					quality: 0.5,
					// base64: response.base64,
				};
				close();
				props.onUpload(img);
			}
		});
	};

	const onPressLaunchLibrary = async () => {
		if (Platform.OS === 'ios') {
			request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
				if (result === RESULTS.GRANTED) {
					openLibrary();
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
					PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
				);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					openLibrary();
				}
			} catch (err) {}
		}
	};

	return (
		<BottomSheet ref={refs} hideTitle>
			<TouchableOpacity onPress={onPressLaunchCamera} style={{ paddingVertical: sizes.s16 }}>
				<Text style={styles.text}>Take a picture</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={onPressLaunchLibrary} style={{ paddingVertical: sizes.s16 }}>
				<Text style={styles.text}>Choose a picture</Text>
			</TouchableOpacity>
			{props.showDelete && (
				<TouchableOpacity
					onPress={() => close(props.onDelete)}
					style={{ paddingVertical: sizes.s16 }}>
					<Text style={[styles.text, { color: colors.primary }]}>Delete</Text>
				</TouchableOpacity>
			)}
			<SubmitButton shadow={false} title="Cancel" onPress={() => close?.()} />
		</BottomSheet>
	);
});

const styles = StyleSheet.create({
	text: {
		...Style.txt16,
		textAlign: 'center',
	},
});
export default React.memo(ImagePicker);
