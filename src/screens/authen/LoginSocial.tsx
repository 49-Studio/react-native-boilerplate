import { appleAuth } from '@invertase/react-native-apple-authentication'
import { GoogleSignin, User } from '@react-native-google-signin/google-signin'

import { loginAppleAction, loginFacebookAction, loginGoogleAction } from 'action/authenAction'
import { colors, images, sizes } from 'assets'
import { ButtonSocial } from 'components'
import jwt_decode from 'jwt-decode'
import _ from 'lodash'
import React from 'react'
import { Alert, Platform, StyleSheet, View } from 'react-native'
import { Config } from 'react-native-config'
import { useDispatch } from 'react-redux'
import { linkFacebook } from 'utils/function'
GoogleSignin.configure({
	webClientId: Platform.OS === 'ios' ? Config.IOS_GOOGLE : Config.ANDROID_GOOGLE,
	offlineAccess: false,
})

const LoginSocial = () => {
	const dispatch = useDispatch()

	const onPressGoogleSign = async () => {
		try {
			await GoogleSignin.signOut()
			await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
			const userInfo: User = await GoogleSignin.signIn()
			if (userInfo) {
				dispatch(loginGoogleAction(userInfo))
			} else {
				Alert.alert('Login Invalid', 'User cancelled the login process')
			}
		} catch (error: any) {
			Alert.alert('Error', 'Sign in action cancelled')
		}
	}

	const onPressFacebookLogin = async () => {
		try {
			const userInfo: User = await linkFacebook()
			if (!_.isNil(userInfo)) {
				dispatch(loginFacebookAction(userInfo))
			} else {
				Alert.alert('Login Invalid', 'User cancelled the login process')
			}
		} catch (e: any) {
			Alert.alert('Error', 'System error please try again')
		}
		//
	}
	const onPressAppleLogin = async () => {
		try {
			const userApple = await appleAuth.performRequest({
				requestedOperation: appleAuth.Operation.LOGIN,
				requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
			})
			if (userApple) {
				dispatch(loginAppleAction(userApple))
			} else {
				Alert.alert('Error', 'Error, Please try again!')
			}
		} catch (error: any) {}
	}
	return (
		<>
			<View style={styles.social}>
				<ButtonSocial
					title="Google"
					styles={{ width: sizes.s156 }}
					images={images.ic_google}
					onPress={onPressGoogleSign}
				/>
				<ButtonSocial
					title="Facebook"
					styles={{ width: sizes.s156 }}
					images={images.ic_facebook}
					onPress={onPressFacebookLogin}
				/>
			</View>
			{Platform.OS === 'ios' && (
				<ButtonSocial
					title="Sign in with Apple"
					images={images.ic_apple}
					styles={styles.buttonApple}
					onPress={onPressAppleLogin}
				/>
			)}
		</>
	)
}

export default LoginSocial

const styles = StyleSheet.create({
	social: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: sizes.s16,
	},
	buttonApple: {
		textAlign: 'center',
		marginTop: sizes.s16,
		justifyContent: 'center',
	},
})
