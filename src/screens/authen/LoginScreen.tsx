import { loginAction, loginGuestAction, logOutAction } from 'action/authenAction';
import { colors, fonts, images, sizes, Style } from 'assets';
import { Button, TextInputs } from 'components';
import { navigate } from 'navigationRef';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { SCREENNAME, STACKNAME } from 'utils/constant';
import { getCurrentLatLong } from 'utils/function';

import LoginSocial from './LoginSocial';

const LoginScreen = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPasword] = useState<string>('');
	const usernameRef = useRef<any>();
	const passwordRef = useRef<any>();
	const dispatch = useDispatch();
	const onChangeUsername = (text: string) => setUsername(text);
	const onChangePassword = (text: string) => setPasword(text);
	const onBlurUsername = () => {
		username === '' && usernameRef?.current.showError('Type email or username!');
	};
	const onBlurpassword = () => {
		password === '' && passwordRef?.current.showError('Type password!');
	};
	const login = () => {
		dispatch(loginAction({ identifier: username.trim().toLowerCase(), password: password }));
	};
	const forgotPassword = () => {
		navigate(SCREENNAME.FORGOTPASSWORD);
		setUsername('');
		setPasword('');
	};

	const onSigninGuest = () => {
		dispatch(logOutAction());
		dispatch(loginGuestAction());
	};

	useEffect(() => {
		getCurrentLatLong();
	}, []);

	return (
		<ScrollView
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.scrollview}>
			<View style={styles.container_login}>
				<Text style={styles.title}>Welcome Back! 👋</Text>
				<Text style={styles.subTitle}>Log in to your account</Text>
				{/*Form Login*/}
				<TextInputs
					icon={images.ic_user}
					ref={usernameRef}
					label="Email"
					keyboardType={'email-address'}
					value={username}
					onBlur={onBlurUsername}
					onChangeText={onChangeUsername}
				/>
				<TextInputs
					ref={passwordRef}
					isPassword
					icon={images.ic_lock}
					label="Password"
					value={password}
					onBlur={onBlurpassword}
					onChangeText={onChangePassword}
				/>
				<Button
					title="Sign In"
					onPress={login}
					disable={username == '' || password == ''}
					styles={styles.button}
				/>
				{/*Forget password*/}
				<TouchableOpacity style={{ marginTop: sizes.s16 }} onPress={forgotPassword}>
					<Text style={styles.forgetPass}>Forgot your password?</Text>
				</TouchableOpacity>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View style={styles.lineHight} />
					<Text style={styles.txtOr}>or</Text>
					<View style={styles.lineHight} />
				</View>
				{/*Social*/}
				<LoginSocial />
				{/*Guest*/}
				<TouchableOpacity style={{ marginTop: sizes.s28 }} onPress={onSigninGuest}>
					<Text style={styles.Guest}>Sign in as guest</Text>
				</TouchableOpacity>
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

export default LoginScreen;
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
		marginTop: sizes.s16,
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
		marginBottom: sizes.s16,
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
		marginTop: sizes.s14,
		fontSize: sizes.s12,
		lineHeight: sizes.s16,
		color: colors.secondary_text,
		marginHorizontal: sizes.s8,
	},
	button: {
		marginTop: sizes.s24,
		marginBottom: sizes.s8,
	},
	lineHight: {
		marginTop: sizes.s24,
		height: sizes.s1,
		width: sizes.s150,
		backgroundColor: colors.dividers,
	},
});
