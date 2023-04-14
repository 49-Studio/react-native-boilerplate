import { colors, fonts, images, sizes } from 'assets';
import { Button, StatusBarView, TextInputs } from 'components';
import { goBack, navigate } from 'navigationRef';
import React, { useEffect, useState } from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { SCREENNAME } from 'utils/constant';

const VerifiResetPassword = () => {
	const [code, setCode] = useState<string>('');
	const [seconds, setSeconds] = useState<number>(22);
	const [resendCode, setResendCode] = useState<boolean>(true);
	useEffect(() => {
		let interval = setInterval(() => {
			if (seconds === 0) {
				clearInterval(interval);
				setResendCode(false);
			} else {
				setSeconds((prev) => prev - 1);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [seconds]);
	const newCode = () => {
		goBack();
	};
	const onChangeText = (text: string) => setCode(text);
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
				<Text style={styles.title}>Verification Code</Text>
				<Text style={styles.subTitle}>
					Enter the verification code that has been entered{'\n'}into your email
				</Text>
				<TextInputs
					label="Code"
					value={code}
					onChangeText={onChangeText}
					style={styles.input}
				/>
				{resendCode && (
					<Text style={styles.time}>{seconds > 10 ? `00:${seconds}` : seconds}</Text>
				)}
			</ScrollView>
			<Button
				title="Verify"
				onPress={() => navigate(SCREENNAME.NEWPASSWORD, { code: code })}
				disable={code === ''}
				styles={styles.button}
			/>
			{!resendCode && (
				<View style={styles.viewResend}>
					<Text style={styles.txtRescode1}>Still not get the code?</Text>
					<TouchableOpacity onPress={newCode}>
						<Text style={styles.txtRescode2}>Resent a new code</Text>
					</TouchableOpacity>
				</View>
			)}
		</KeyboardAvoidingView>
	);
};
export default VerifiResetPassword;

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
	time: {
		marginTop: sizes.s16,
		fontSize: sizes.s14,
		lineHeight: sizes.s20,
		textAlign: 'center',
		color: colors.secondary_text,
	},
	button: {
		marginHorizontal: sizes.s16,
		marginBottom: sizes.s52,
	},
	viewResend: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: sizes.s50,
	},
	txtRescode1: {
		fontSize: sizes.s12,
		lineHeight: sizes.s16,
		color: colors.secondary_text,
	},
	txtRescode2: {
		fontSize: sizes.s14,
		lineHeight: sizes.s20,
		fontFamily: fonts.regular,
		color: colors.black,
		marginTop: sizes.s4,
	},
});
