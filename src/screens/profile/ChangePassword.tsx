import { changePasswordAction } from 'action/authenAction'
import { images, Style } from 'assets'
import {
	ButtonSubmit2,
	HeaderWhite,
	KeyboardAvoidingViews,
	ScreenSuccess,
	TextInputAnimated,
} from 'components'
import { goBack } from 'navigationRef'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from 'selector/authenSelector'
export const modalChangePasswordRef = React.createRef<any>()

const ChangePassword = () => {
	const detailProfile = useSelector(userSelector)
	const [currentPassword, setCurrentPassword] = useState<string>('')
	const [newPassword, setNewPassword] = useState<string>('')
	const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
	const dispatch = useDispatch()
	const onSubmitChangePassword = () => {
		if (newPassword !== confirmNewPassword) {
			Alert.alert('Warning', 'Confirm password not match new password')
		} else {
			dispatch(
				changePasswordAction({
					identifier: detailProfile?.email,
					password: currentPassword,
					newPassword: confirmNewPassword,
				})
			)
		}
	}

	return (
		<KeyboardAvoidingViews>
			<HeaderWhite />
			<View style={[Style.container, Style.paddingHorizontal]}>
				<Text style={[Style.h2, Style.top24]}>Change Password</Text>
				<TextInputAnimated
					style={Style.top32}
					isPassword
					label="Current Password"
					value={currentPassword}
					onChangeText={setCurrentPassword}
				/>
				<TextInputAnimated
					isPassword
					label="New Password"
					value={newPassword}
					onChangeText={setNewPassword}
				/>
				<TextInputAnimated
					label="Confirm New Password"
					isPassword
					value={confirmNewPassword}
					onChangeText={setConfirmNewPassword}
				/>
			</View>
			<ScreenSuccess
				ref={modalChangePasswordRef}
				icon={images.ic_close}
				images={images.ic_changepasssuccess}
				title="Great! Your password has been changed"
				subTitle={`Don’t worry, We’ll let you know if there’s a problem with your account`}
				label={'Log in'}
			/>
			<ButtonSubmit2
				titleLeft="Cancel"
				titleRight="Submit"
				onPressLeft={() => goBack()}
				disable={currentPassword === '' || newPassword === '' || confirmNewPassword === ''}
				onPressRight={onSubmitChangePassword}
			/>
		</KeyboardAvoidingViews>
	)
}

export default ChangePassword

const styles = StyleSheet.create({})
