import { colors, fonts, images, sizes, Style } from 'assets';
import { Button, TextInputs } from 'components';
import { navigate } from 'navigationRef';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SCREENNAME, STACKNAME } from 'utils/constant';

const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])(?=.{8,})');
const SignUpScreen = () => {
	const [username, setUsername] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [password, setPasword] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const nameRef = useRef<any>();
	const usernameRef = useRef<any>();
	const emailRef = useRef<any>();
	const passwordRef = useRef<any>();
	const confirmpasswordRef = useRef<any>();
	const onChangeName = (text: string) => setName(text);
	const onChangePassword = (text: string) => {
		if (!testPassword(text)) {
			passwordRef.current.showError(
				'Password must at least 8 characters with 1 lowercase, 1 uppercase, 1 numeric, 1 special character',
			);
		} else {
			passwordRef.current.hideError();
		}
		setPasword(text);
	};
	const onChangeConfirmPassword = (text: string) => {
		if (text !== password) {
			confirmpasswordRef.current.showError('Confirm password do not match password');
		} else {
			confirmpasswordRef.current.hideError();
		}
		setConfirmPassword(text);
	};
	const onChangeEmail = (text: string) => setEmail(text);
	const onChangeUserName = (text: string) => setUsername(text);

	const testPassword = (text = '') => {
		return regex.test(text);
	};

	const onPressSignup = () => {
		navigate(SCREENNAME.PHONE, {
			name: name.trim().toLowerCase(),
			username: username.trim().toLowerCase(),
			email: email.trim().toLowerCase(),
			password: password.trim(),
		});
		clearData();
	};

	const clearData = () => {
		setPasword('');
		setName('');
		setConfirmPassword('');
		setEmail('');
		setUsername('');
	};
	return (
		<ScrollView
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.scrollview}>
			<View style={styles.container_login}>
				<Text style={styles.title}>Join Snap4me</Text>
				<Text style={styles.subTitle}>You can easily sign up</Text>
				{/*Form SignUp*/}
				<TextInputs
					icon={images.ic_card_user}
					ref={nameRef}
					label="Full name"
					autoCapitalize={'words'}
					value={name}
					onChangeText={onChangeName}
				/>
				<TextInputs
					icon={images.ic_user}
					ref={usernameRef}
					label="User name"
					value={username}
					onChangeText={onChangeUserName}
				/>
				<TextInputs
					icon={images.ic_mail}
					ref={emailRef}
					keyboardType={'email-address'}
					label="Email"
					value={email}
					onChangeText={onChangeEmail}
				/>
				<TextInputs
					ref={passwordRef}
					isPassword
					icon={images.ic_lock}
					label="Password"
					value={password}
					onChangeText={onChangePassword}
				/>
				<TextInputs
					ref={confirmpasswordRef}
					isPassword
					icon={images.ic_lock}
					label="Confirm Password"
					value={confirmPassword}
					onChangeText={onChangeConfirmPassword}
				/>
				<Button
					title="Sign Up"
					disable={
						!name ||
						!username ||
						!password ||
						!confirmPassword ||
						confirmPassword !== password ||
						!testPassword(password)
					}
					onPress={onPressSignup}
					styles={styles.button}
				/>

				{/*Privacy Policy*/}
				<View style={{ ...Style.top48 }}>
					<Text style={styles.Privacy}>
						By sign in you agree to the
						<Text
							onPress={() =>
								navigate(STACKNAME.HOME, { screen: SCREENNAME.TERM_OF_SERVICE })
							}
							style={styles.Privacy_Term}>
							{' '}
							Term of Service
						</Text>{' '}
						{'\n'}and
						<Text
							onPress={() => navigate(STACKNAME.HOME, { screen: SCREENNAME.PRIVACY_POLICY })}
							style={styles.Privacy_Policy}>
							{' '}
							Privacy Policy
						</Text>
					</Text>
				</View>
			</View>
		</ScrollView>
	);
};

export default SignUpScreen;
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollview: {
		flexGrow: 1,
	},
	container_login: {
		flex: 1,
		backgroundColor: colors.white,
		padding: sizes.s24,
		borderTopLeftRadius: sizes.s24,
		borderTopRightRadius: sizes.s24,
		marginTop: sizes.s24,
	},
	title: {
		fontSize: sizes.s20,
		color: colors.title,
		fontFamily: fonts.bold,
		fontWeight: '500',
		lineHeight: sizes.s28,
	},
	subTitle: {
		fontSize: sizes.s14,
		fontFamily: fonts.regular,
		lineHeight: sizes.s22,
		fontWeight: '400',
		color: colors.secondary_text,
		marginTop: sizes.s8,
		// marginBottom: sizes.s32,
	},
	forgetPass: {
		textAlign: 'center',
		color: colors.primary,
		fontSize: sizes.s16,
		fontFamily: fonts.regular,
		fontWeight: '500',
		lineHeight: sizes.s24,
	},
	Guest: {
		fontSize: sizes.s16,
		color: colors.title,
		fontFamily: fonts.bold,
		fontWeight: '500',
		lineHeight: sizes.s24,
		textAlign: 'center',
	},
	Privacy: {
		fontSize: sizes.s12,
		color: colors.secondary_text,
		fontFamily: fonts.regular,
		fontWeight: '400',
		lineHeight: sizes.s22,
		textAlign: 'center',
	},
	Privacy_Term: {
		fontSize: sizes.s12,
		color: colors.primary,
		fontFamily: fonts.regular,
		fontWeight: '400',
		lineHeight: sizes.s22,
	},
	Privacy_Policy: {
		fontSize: sizes.s12,
		color: colors.primary,
		fontFamily: fonts.regular,
		fontWeight: '400',
		lineHeight: sizes.s22,
	},
	txtOr: {
		marginTop: sizes.s21,
		fontSize: sizes.s12,
		lineHeight: sizes.s16,
		color: colors.secondary_text,
		marginHorizontal: sizes.s8,
	},
	button: {
		marginTop: sizes.s24,
	},
	lineHight: {
		marginTop: sizes.s32,
		height: sizes.s1,
		width: sizes.s150,
		backgroundColor: colors.dividers,
	},
});
