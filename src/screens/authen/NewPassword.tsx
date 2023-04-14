import authApi from 'api/authApi'
import { colors, fonts, images, sizes } from 'assets'
import { Button, Loading, ScreenSuccess, StatusBarView, TextInputs } from 'components'
import { goBack } from 'navigationRef'
import React, { useRef, useState } from 'react'
import {
	Alert,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native'
const NewPassword = ({ route }: any) => {
	const code = route?.params?.code || ''
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPassword] = useState<string>('')
	const modalRef = useRef<any>()
	const onChangeText = (text: string) => setPassword(text)
	const onChangeTextConfirmPassword = (text: string) => setConfirmPassword(text)
	const changePasswordApi = () => {
		Loading.show()
		authApi
			.resetPassword({
				code: code || '',
				password: password || '',
				passwordConfirmation: confirmPassword || '',
			})
			.then((res: any) => {
				Loading.hide()
				modalRef.current.open()
			})
			.catch((e: any) => {
				Loading.hide()
				Alert.alert('Error', e.data[0]?.messages[0]?.message)
			})
	}
	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
			<StatusBarView backgroundColor={colors.white} />
			<TouchableOpacity onPress={() => goBack()}>
				<Image source={images.ic_back} style={styles.iconBack} />
			</TouchableOpacity>
			<ScrollView
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}>
				<Text style={styles.title}>Enter New Password</Text>
				<Text style={styles.subTitle}>
					We’re resetting your password, please enter new{'\n'}password to your account
				</Text>
				<TextInputs
					label="Password"
					isPassword
					icon={images.ic_lock}
					value={password}
					onChangeText={onChangeText}
					style={styles.input}
				/>
				<TextInputs
					label="Confirm new password"
					isPassword
					icon={images.ic_lock}
					value={confirmPassword}
					onChangeText={onChangeTextConfirmPassword}
					style={styles.input}
				/>
			</ScrollView>
			<Button
				title="Change Password"
				onPress={changePasswordApi}
				disable={password === '' || confirmPassword === ''}
				styles={styles.button}
			/>
			<ScreenSuccess
				ref={modalRef}
				icon={images.ic_close}
				images={images.ic_changepasssuccess}
				title="Great! Your password has been changed"
				subTitle={`Don’t worry, We’ll let you know if there’s${'\n'} a problem with your account`}
				label={'Back to log in'}
			/>
		</KeyboardAvoidingView>
	)
}

export default NewPassword

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	iconBack: {
		tintColor: colors.black,
		width: sizes.s48,
		height: sizes.s48,
		marginLeft: sizes.s8,
	},
	title: {
		fontSize: sizes.s24,
		color: colors.black,
		fontFamily: fonts.bold,
		fontWeight: '700',
		lineHeight: sizes.s32,
		marginTop: sizes.s30,
		marginLeft: sizes.s24,
	},
	subTitle: {
		fontSize: sizes.s14,
		fontFamily: fonts.regular,
		lineHeight: sizes.s22,
		fontWeight: '400',
		color: colors.secondary_text,
		marginTop: sizes.s8,
		marginLeft: sizes.s24,
		marginBottom: sizes.s24,
	},
	input: {
		marginHorizontal: sizes.s16,
	},
	button: {
		marginHorizontal: sizes.s16,
		marginBottom: sizes.s52,
	},
})
