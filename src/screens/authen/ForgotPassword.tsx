import authApi from 'api/authApi'
import { colors, fonts, images, sizes } from 'assets'
import { Button, Loading, StatusBarView, TextInputs } from 'components'
import { goBack, navigate } from 'navigationRef'
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
import { SCREENNAME } from 'utils/constant'
const ForgotPassword = () => {
	const [email, setEmail] = useState<string>('')
	const [title, setTitle] = useState<string>('')
	const [content, setContent] = useState<string>('')
	const modalRef = useRef<any>()
	const onChangeText = (text: string) => setEmail(text)
	const forgotPassword = async () => {
		Loading.show()
		try {
			const res = await authApi.forgetPassword(email.trim().toLowerCase())
			Alert.alert('Success', `Email message was sent to your at ${email}!`)
		} catch (error: any) {
			Alert.alert('Error', 'System error please try again!')
		} finally {
			Loading.hide()
		}
		navigate(SCREENNAME.VERIFIRESETPASSWORD)
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
				<Text style={styles.title}>Forgot Password</Text>
				<Text style={styles.subTitle}>
					Don’t worry, please enter your email to get your account back
				</Text>
				<TextInputs
					label="Email/ No HP"
					value={email}
					onChangeText={onChangeText}
					style={styles.input}
				/>
			</ScrollView>
			<Button
				title="Next"
				onPress={forgotPassword}
				disable={email === ''}
				styles={styles.button}
			/>
		</KeyboardAvoidingView>
	)
}

export default ForgotPassword

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
