import { registerAction } from 'action/authenAction';
import authApi from 'api/authApi';
import { colors, fonts, images, sizes } from 'assets';
import { Button, Loading, PinInput, StatusBarView } from 'components';
import { goBack } from 'navigationRef';
import React, { useEffect, useRef, useState } from 'react';
import {
	Alert,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { useDispatch } from 'react-redux';
import { phoneCodeNumber } from 'utils/function';
let interval: any;
const VerificationScreen = ({ route }: any) => {
	const [code, setCode] = useState<any>('');
	const pinRef = useRef<any>();
	const [isShowCountDown, setIsShowCountDown] = useState<boolean>(true);
	const [second, setSecond] = useState<number>(59);
	const dispatch = useDispatch();
	const showCountDown = () => {
		setIsShowCountDown(true);
		setCode('');
		countDownTime();
	};
	const countDownTime = () => {
		interval = BackgroundTimer.setInterval(() => {
			if (second === 0) {
				BackgroundTimer.clearInterval(interval);
				setIsShowCountDown(false);
			} else {
				setSecond((prev) => prev - 1);
			}
		}, 1000);
	};
	useEffect(() => {
		countDownTime();
		return () => {
			BackgroundTimer.clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		if (second === 0) {
			BackgroundTimer.clearInterval(interval);
			setSecond(59);
			setIsShowCountDown(false);
		}
	}, [second]);
	const verifyOtp = (code: string) => {
		Loading.show();
		authApi
			.verifyOtp({
				phone: phoneCodeNumber(route?.params?.country_code, route?.params?.phone),
				code,
			})
			.then((res: any) => {
				if (res.valid) {
					dispatch(registerAction(route.params));
				} else {
					Alert.alert('Warning', 'Code is not valid');
				}
			})
			.catch((err) => Alert.alert('Warning', 'Code is not valid'))
			.finally(() => {
				Loading.hide();
			});
	};
	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
			<StatusBarView backgroundColor={colors.primary} lightContent />
			<TouchableOpacity onPress={() => goBack()}>
				<Image source={images.ic_back} style={styles.iconBack} />
			</TouchableOpacity>
			<Text style={styles.title}>OTP Verification</Text>
			<Text style={styles.subTitle}>Check your phone and enter code</Text>
			<ScrollView
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollview}>
				<View style={styles.container_otp}>
					<View style={styles.pinCode}>
						<PinInput
							ref={pinRef}
							style={{ marginTop: sizes.s24 }}
							value={code}
							codeLength={6}
							password={true}
							onChange={(code) => setCode(code)}
							onFulfill={verifyOtp}
						/>
					</View>
					{isShowCountDown ? (
						<Text style={styles.resendCode}>
							Resend code in{' '}
							<Text style={styles.time}>{` 00:${
								second < 10 ? `0${second}` : second
							}s`}</Text>
						</Text>
					) : (
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<TouchableOpacity
								onPress={() => {
									authApi.sendOtp(
										phoneCodeNumber(route?.params?.country_code, route?.params?.phone)
									),
										showCountDown();
								}}>
								<Text style={[styles.resendCode, { color: colors.primary }]}>
									Click here
								</Text>
							</TouchableOpacity>
							<Text style={styles.resendCode}> to resent OTP</Text>
						</View>
					)}
					<Button disable={code.length !== 6} onPress={() => verifyOtp(code)} title="Verify" />
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default VerificationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
	},
	iconBack: {
		width: sizes.s48,
		height: sizes.s48,
		marginLeft: sizes.s8,
	},
	scrollview: {
		flexGrow: 1,
	},
	title: {
		fontSize: sizes.s32,
		color: colors.white,
		fontFamily: fonts.bold,
		fontWeight: '700',
		lineHeight: sizes.s40,
		marginTop: sizes.s30,
		marginLeft: sizes.s24,
	},
	subTitle: {
		fontSize: sizes.s16,
		fontFamily: fonts.regular,
		lineHeight: sizes.s24,
		fontWeight: '400',
		color: colors.white,
		marginTop: sizes.s8,
		marginLeft: sizes.s24,
		marginBottom: sizes.s24,
	},
	container_otp: {
		flex: 1,
		backgroundColor: colors.white,
		padding: sizes.s24,
		borderTopLeftRadius: sizes.s24,
		borderTopRightRadius: sizes.s24,
		marginTop: sizes.s24,
	},
	pinCode: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	resendCode: {
		fontSize: sizes.s14,
		fontFamily: fonts.regular,
		lineHeight: sizes.s22,
		fontWeight: '400',
		color: colors.secondary_text,
		textAlign: 'center',
		marginBottom: sizes.s40,
	},
	time: {
		fontSize: sizes.s14,
		fontFamily: fonts.regular,
		lineHeight: sizes.s22,
		fontWeight: '400',
		color: colors.primary,
		textAlign: 'center',
		marginBottom: sizes.s40,
	},
});
