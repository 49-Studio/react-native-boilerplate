import authApi from 'api/authApi';
import { colors, fonts, images, sizes } from 'assets';
import { Button, Pickers, StatusBarView, TextInputs } from 'components';
import { goBack, navigate } from 'navigationRef';
import React, { useEffect, useRef, useState } from 'react';
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
import { phoneCodeNumber } from 'utils/function';
const PhoneScreen = ({ route }: any) => {
	const register = route?.params;
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [codeData, setCodeData] = useState<any[]>([]);
	const [code, setCode] = useState<any>(null);

	const getData = async () => {
		const data: any = await authApi.getCountryCode();
		setCodeData(data);
	};
	useEffect(() => {
		getData();
	}, []);

	const regsiterAccount = () => {
		const data = {
			username: register.username,
			email: register.email,
			password: register.password,
			name: register.name,
			phone: phoneNumber,
			country_code: code.code,
		};
		//TODO: disable sms otp after finish demo customer
		// dispatch(registerAction(data))
		//TODO: Production
		authApi.sendOtp(phoneCodeNumber(code.code, phoneNumber));
		navigate(SCREENNAME.VERIFICATION, data);
	};
	const phoneNumberRef = useRef<any>();
	const onChangePhoneNumber = (text: string) => setPhoneNumber(text);
	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
			<StatusBarView backgroundColor={colors.primary} lightContent />
			<TouchableOpacity onPress={() => goBack()}>
				<Image source={images.ic_back} style={styles.iconBack} />
			</TouchableOpacity>
			<Text style={styles.title}>Enter your phone</Text>
			<Text style={styles.subTitle}>Enter your phone and accept the code</Text>
			<ScrollView
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollview}>
				<View style={styles.container_otp}>
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<Pickers
							isShowSearch
							label={'Code'}
							data={codeData}
							country="name"
							keyTitle="code"
							onChange={setCode}
							value={code?.code}
							style={{ width: '40%' }}
							bottomSheetStyle={{ height: '60%' }}
						/>
						<TextInputs
							label="Phone number"
							ref={phoneNumberRef}
							value={phoneNumber}
							keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
							onChangeText={onChangePhoneNumber}
							style={{ flex: 1, marginLeft: sizes.s8 }}
						/>
					</View>
					<Button
						disable={phoneNumber.length < 1}
						onPress={regsiterAccount}
						title="Send OTP"
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default PhoneScreen;

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
});
