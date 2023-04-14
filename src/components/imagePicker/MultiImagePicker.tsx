import { screenHeight, sizes, Style } from 'assets'
import BottomSheet from 'components/bottomSheet/BottomSheet'
import SubmitButton from 'components/button/SubmitButton'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import {
	Alert,
	Animated,
	PermissionsAndroid,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native'
import {
	ImagePickerResponse,
	launchCamera,
	launchImageLibrary,
	ImageLibraryOptions,
	CameraOptions,
} from 'react-native-image-picker'
import { openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions'

interface Props {
	ref: any
	onUpload: (image: any) => void
}
const optionsCamera: CameraOptions = {
	cameraType: 'back',
	mediaType: 'photo',
}

const optionsPhoto: ImageLibraryOptions = {
	quality: 0.7,
	mediaType: 'photo',
	selectionLimit: 0,
	maxWidth: 1000,
	maxHeight: 1000,
}

const optionsVideo: ImageLibraryOptions = {
	quality: 0.7,
	mediaType: 'video',
	selectionLimit: 1,
	maxWidth: 1000,
	maxHeight: 1000,
}

const MultiImagePicker = forwardRef((props: Props, ref: any) => {
	const refs = useRef<any>()

	useImperativeHandle(ref, () => ({
		open: () => open(),
		close: (callback: () => void) => close(callback),
	}))

	const open = () => {
		refs.current.open()
	}

	const close = (callback = () => {}): void => {
		refs.current.close(Boolean(callback) && callback)
	}

	const openCamera = () => {
		launchCamera(optionsCamera, (response: ImagePickerResponse) => {
			if (response.didCancel) {
			} else if (response.errorCode) {
			} else if (response.errorMessage) {
			} else {
				close()
				props.onUpload(response.assets)
			}
		})
	}

	const onPressLaunchCamera = async () => {
		if (Platform.OS === 'ios') {
			request(PERMISSIONS.IOS.CAMERA).then((result) => {
				if (result === RESULTS.GRANTED) {
					openCamera()
				} else {
					Alert.alert('Notice', 'Please accept application for camera to continue', [
						{ text: 'Cancel' },
						{
							text: 'OK',
							onPress: () => {
								openSettings()
							},
						},
					])
				}
			})
		} else {
			try {
				const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					openCamera()
				}
			} catch (err) {}
		}
	}

	////////////////////////////////////////
	const openLibrary = (options: ImageLibraryOptions) => {
		launchImageLibrary(options, (response: ImagePickerResponse) => {
			if (response.didCancel) {
			} else if (response.errorCode) {
			} else if (response.errorMessage) {
			} else {
				close()
				props.onUpload(response.assets)
			}
		})
	}

	const onPressLaunchLibrary = async (options: ImageLibraryOptions) => {
		if (Platform.OS === 'ios') {
			request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
				if (result === RESULTS.GRANTED) {
					openLibrary(options)
				} else {
					Alert.alert('Notice', 'Please accept application for library to continue', [
						{ text: 'Cancel' },
						{
							text: 'OK',
							onPress: () => {
								openSettings()
							},
						},
					])
				}
			})
		}
		//permissions use camera android
		else {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
				)
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					openLibrary(options)
				}
			} catch (err) {}
		}
	}

	return (
		<BottomSheet ref={refs} hideTitle>
			<TouchableOpacity onPress={onPressLaunchCamera} style={{ paddingVertical: sizes.s16 }}>
				<Text style={styles.text}>Take a picture</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => onPressLaunchLibrary(optionsPhoto)}
				style={{ paddingVertical: sizes.s16 }}>
				<Text style={styles.text}>Choose pictures</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => onPressLaunchLibrary(optionsVideo)}
				style={{ paddingVertical: sizes.s16 }}>
				<Text style={styles.text}>Choose a video</Text>
			</TouchableOpacity>
			<SubmitButton shadow={false} title="Cancel" onPress={close} />
		</BottomSheet>
	)
})

const styles = StyleSheet.create({
	text: {
		...Style.txt16,
		textAlign: 'center',
	},
})
export default React.memo(MultiImagePicker)
