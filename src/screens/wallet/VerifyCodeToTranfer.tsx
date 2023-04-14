import { getUserBalanceAction } from 'action/authenAction';
import { getListTransactionAction, withdrawAction } from 'action/requestAction';
import authApi from 'api/authApi';
import requestApi from 'api/requestApi';
import { Style } from 'assets';
import {
	CountDownTime,
	HeaderWhite,
	KeyboardAvoidingViews,
	Loading,
	PinInput,
	SubmitButton,
} from 'components';
import { WithdrawPayload } from 'models';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { rateCurrencySelector, userSelector } from 'selector/authenSelector';
import { phoneCodeNumber } from 'utils/function';

const VerifyCodeToTranfer: React.FC = ({ route }: any) => {
	const dispatch = useDispatch();
	const user = useSelector(userSelector);
	const rateCurrency = useSelector(rateCurrencySelector);
	const payloadParams = route?.params?.payload;
	const [code, setCode] = useState<string>('');
	const onSubmit = () => {
		Loading.show();
		authApi
			.verifyOtp({ phone: phoneCodeNumber(user?.country_code, user?.phone), code })
			.then((res: any) => {
				if (res.valid) {
					let amount = payloadParams?.amount * 100;
					if (user.currency !== 'INR') {
						amount = amount / rateCurrency;
					}
					const payload: WithdrawPayload = {
						account_name: payloadParams?.account_name,
						amount: amount.toString(),
						bank_code: payloadParams?.bank_code,
						bank_number: payloadParams?.bank_number,
					};
					const transaction = {
						content: route?.params?.content,
						from: route?.params?.from,
						total: route?.params?.total / rateCurrency,
					};
					dispatch(withdrawAction(payload));
					requestApi
						.transaction(transaction)
						.then((res) => {
							dispatch(getUserBalanceAction(route?.params?.from));
							dispatch(getListTransactionAction());
						})
						.catch(() => Alert.alert('Error', 'Withdraw error, please try again'));
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
		<KeyboardAvoidingViews>
			<HeaderWhite />
			<View style={[Style.container, Style.paddingHorizontal]}>
				<Text style={[Style.h2, Style.top24]}>Verification code to confirm this transfer</Text>
				<Text style={[Style.txt14_secondary, Style.top8]}>
					Enter the verification code that has been entered into your phone number
				</Text>
				<PinInput codeLength={6} value={code} onChange={setCode} password style={Style.top24} />
				<CountDownTime style={Style.top64} seconds={60 * 4} />
			</View>
			<SubmitButton title="Verify" onPress={onSubmit} disable={code.length < 6} />
		</KeyboardAvoidingViews>
	);
};

export default VerifyCodeToTranfer;
