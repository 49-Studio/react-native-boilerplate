import authApi from 'api/authApi';
import { Style } from 'assets';
import { ButtonSubmit2, HeaderWhite, KeyboardAvoidingViews, Pickers, TextInputs } from 'components';
import _ from 'lodash';
import { PhoneCode } from 'models';
import { goBack, navigate } from 'navigationRef';
import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SCREENNAME } from 'utils/constant';
import { phoneCodeNumber } from 'utils/function';

const ChangeMobileNumber: React.FC = () => {
	const [phoneCode, setPhonCode] = useState<any>(null);
	const [codeData, setCodeData] = useState<any[]>([]);
	const [phoneNumber, setPhoneNumber] = useState<string>('');

	const getData = async () => {
		const data: PhoneCode[] | any = await authApi.getCountryCode();
		const sortedArr = data.sort((a: PhoneCode, b: PhoneCode) => +a.code - +b.code);
		setCodeData(sortedArr);
	};

	useEffect(() => {
		getData();
	}, []);

	const onCancel = () => goBack();

	const onSubmit = () => {
		if (!_.isNil(phoneCode)) {
			authApi.sendOtp(phoneCodeNumber(phoneCode.code, phoneNumber));
			navigate(SCREENNAME.VERIFY_CODE_CHANGE_PHONE_NUMBER, {
				phone: phoneNumber,
				country_code: phoneCode?.code,
				stayHere: true,
			});
		} else {
			Alert.alert('Warning', 'Please select country code!');
		}
	};
	return (
		<KeyboardAvoidingViews>
			<HeaderWhite />
			<View style={[Style.container, Style.paddingHorizontal]}>
				<Text style={[Style.h2, Style.top24]}>Change Mobile Number</Text>
				<Text style={[Style.txt14_secondary, Style.top8]}>
					Don't worry, please enter your new mobile number
				</Text>
				<View style={Style.row_between}>
					<Pickers
						label={'Code'}
						isShowSearch
						animatedLabel={false}
						style={{ width: '35%' }}
						data={codeData}
						keyTitle="code"
						country="name"
						value={phoneCode?.code}
						onChange={setPhonCode}
						bottomSheetStyle={{ height: '50%' }}
					/>
					<TextInputs
						label="Phone number"
						value={phoneNumber}
						keyboardType={'number-pad'}
						onChangeText={setPhoneNumber}
						style={{ width: '60%' }}
					/>
				</View>
			</View>
			<ButtonSubmit2
				titleLeft="Cancel"
				titleRight="Submit"
				disable={phoneNumber === ''}
				onPressLeft={onCancel}
				onPressRight={onSubmit}
			/>
		</KeyboardAvoidingViews>
	);
};

export default ChangeMobileNumber;
