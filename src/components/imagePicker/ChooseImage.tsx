import { colors, fonts, images, screenHeight, sizes, Style } from '@assets'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import {
	Alert,
	Animated,
	Image,
	Modal,
	PermissionsAndroid,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
	image?: ''
	styles?: any
	modalStyle?: any
	ref: any
	height?: any
	option?: number
	updateImage?: any
	onUpload: (image: any) => void
	onRemove: () => void
	children: any
}
const options: any = {
	storageOptions: {
		skipBackup: true,
		path: 'images',
	},
	cameraType: 'back',
	mediaType: 'photo',
	quality: 0.5,
}

const ChooseImage = forwardRef((props: Props, ref: any) => {
	const [image, setImage] = useState(props.updateImage || '')
	const [show, setShow] = useState<boolean>(false)
	const translateY = useRef(new Animated.Value(props.height)).current
	const time = 250
	useEffect(() => {
		setImage(props.updateImage)
	}, [props.updateImage])
	useImperativeHandle(ref, () => ({
		open: () => open(),
		close: (callback: () => void) => close(callback),
	}))

	useEffect(() => {
		show && slideUp()
	}, [show])

	const open = () => {
		setShow(true)
	}
	const close = (callback: any = undefined): void => {
		slideDown()
		setTimeout(() => {
			setShow(false)
			if (callback !== undefined) {
				callback()
			}
		}, time)
	}
	const slideUp = (): void => {
		Animated.timing(translateY, {
			toValue: 0,
			duration: time,
			useNativeDriver: true,
		}).start()
	}
	const slideDown = (): void => {
		Animated.timing(translateY, {
			toValue: props.height,
			duration: time,
			useNativeDriver: true,
		}).start()
	}
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
				}
				close()
				setImage(img.uri)
				props.onUpload(img)
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
				}
				close()
				setImage(img.uri)
				props.onUpload(img)
			}
		})
	}

	const onPressLaunchLibrary = async () => {
		if (Platform.OS === 'ios') {
			request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
				if (result === RESULTS.GRANTED) {
					openLibrary()
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
		}
		//permissions use camera android
		else {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
				)
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					openLibrary()
				}
			} catch (err) {}
		}
	}
	const icRemove = () => {
		if (image) {
			return (
				<TouchableOpacity
					style={styles.iconRight}
					onPress={() => {
						setImage('')
						props.onRemove && props.onRemove()
					}}>
					<Image source={images.ic_remove_img} style={Style.icon24} />
				</TouchableOpacity>
			)
		}
	}
	return (
		<>
			{image == '' ? (
				props.children
			) : (
				<>
					{icRemove()}
					<FastImage
						source={{ uri: image }}
						style={{ height: sizes.s128, borderRadius: sizes.s16 }}
					/>
				</>
			)}
			<Modal
				statusBarTranslucent
				animationType="fade"
				transparent={true}
				visible={show}
				onRequestClose={close}>
				<TouchableWithoutFeedback onPress={() => close()}>
					<View style={styles.container}>
						<Animated.View
							style={[
								styles.bottomSheet,
								{ height: props.height, transform: [{ translateY }] },
							]}>
							<View style={styles.modalItem}>
								<TouchableOpacity
									style={styles.itemSelected}
									onPress={onPressLaunchLibrary}>
									<Image source={images.ic_gallery_export} style={styles.icon} />
									<Text style={styles.title}>Chọn từ thiết bị</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.itemSelectedLast}
									onPress={onPressLaunchCamera}>
									<Image source={images.ic_camera} style={styles.icon} />
									<Text style={styles.title}>Máy ảnh</Text>
								</TouchableOpacity>
							</View>
							<TouchableOpacity style={styles.button} onPress={() => close()}>
								<Text style={styles.titleBtn}>HỦY</Text>
							</TouchableOpacity>
							<SafeAreaView />
						</Animated.View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</>
	)
})
ChooseImage.defaultProps = {
	height: screenHeight,
}
const styles = StyleSheet.create({
	bottomSheet: {
		borderTopLeftRadius: sizes.s16,
		borderTopRightRadius: sizes.s16,
		justifyContent: 'flex-end',
	},
	container: {
		flex: 1,
		backgroundColor: colors.bgTransparent,
		justifyContent: 'flex-end',
		paddingVertical: sizes.s16,
	},
	modalItem: {
		backgroundColor: colors.white,
		borderRadius: sizes.s16,
		marginBottom: sizes.s8,
		marginHorizontal: sizes.s16,
	},
	itemSelected: {
		height: sizes.s56,
		padding: sizes.s16,
		flexDirection: 'row',
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderColor: colors.border,
	},
	itemSelectedLast: {
		height: sizes.s56,
		padding: sizes.s16,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	title: {
		fontSize: sizes.s16,
		fontFamily: fonts.semi_bold,
	},
	titleDelete: {
		fontSize: sizes.s16,
		fontFamily: fonts.semi_bold,
		color: colors.error,
	},
	titleBtn: {
		fontSize: sizes.s16,
		fontFamily: fonts.bold,
		color: colors.gray,
	},
	icon: {
		position: 'absolute',
		left: sizes.s18,
		top: sizes.s18,
		width: sizes.s20,
		height: sizes.s20,
	},
	button: {
		height: sizes.s56,
		backgroundColor: colors.white,
		borderRadius: sizes.s16,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: sizes.s16,
		marginHorizontal: sizes.s16,
	},
	images: {
		width: sizes.s24,
		height: sizes.s24,
	},
	iconRight: {
		position: 'absolute',
		top: 8,
		right: 8,
		zIndex: 1,
	},
})
export default React.memo(ChooseImage)
