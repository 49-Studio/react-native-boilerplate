import { Alert, PermissionsAndroid, Platform } from 'react-native'
import { openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions'

class Permissions {
	async camera(callback?: () => void) {
		if (Platform.OS === 'ios') {
			request(PERMISSIONS.IOS.CAMERA).then((result) => {
				if (result === RESULTS.GRANTED) {
					callback && callback()
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
					callback && callback()
				}
			} catch (err) {}
		}
	}

	async microphone(callback?: () => void) {
		if (Platform.OS === 'ios') {
			request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
				if (result === RESULTS.GRANTED) {
					callback && callback()
				} else {
					Alert.alert('Notice', 'Please accept application for microphone to continue', [
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
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
				)
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					callback && callback()
				}
			} catch (err) {}
		}
	}
}
export default new Permissions()
