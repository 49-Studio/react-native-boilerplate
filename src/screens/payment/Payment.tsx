import { createAccountStripeAction } from 'action/authenAction';
import { createRequestAction } from 'action/requestAction';
import requestApi from 'api/requestApi';
import { ultilsApi } from 'api/ultilsApi';
import { colors, sizes, Style } from 'assets';
import { HeaderWhite, KeyboardAvoidingViews, Loading, SubmitButton, TextInputs } from 'components';
import { CreateQuest } from 'models';
import { navigate } from 'navigationRef';
import Omise from 'omise-react-native';
import React, { useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import { useDispatch, useSelector } from 'react-redux';
import { rateCurrencySelector, userSelector } from 'selector/authenSelector';
import { SCREENNAME } from 'utils/constant';

const Payment: React.FC<any> = ({ route }: { route: { params: CreateQuest } }) => {
	const { KEY_OMISE } = Config;
	// KEY CONFIG ENV
	Omise.config(`${KEY_OMISE}`, '2017-11-02');
	const profile = useSelector(userSelector);
	const dataCreateRequest = route?.params;
	const money: number = dataCreateRequest?.data?.budget || 0;
	const dispatch = useDispatch();
	const [promotion, setPromotion] = useState<string>('');
	const [promtionSuccess, setPromotionSuccess] = useState<boolean>(false);
	const [showPromotion, setShowPromotion] = useState<boolean>(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [, setIdPromotion] = useState<string>('');
	const [valueSaleOff, setValueSaleOff] = useState<number>(0);
	const rateCurrency = useSelector(rateCurrencySelector);

	const commission = (+money * 10) / 100;
	const totalAmount = +money + (promtionSuccess ? 0 : commission) - valueSaleOff;

	const promotionRef = useRef<any>();

	const onPressPay = async () => {
		try {
			Loading.show();
			if (totalAmount < 1) {
				dataCreateRequest.data.budget = 0;
				dispatch(createRequestAction({ ...dataCreateRequest, amount: 0, totalAmount: 0 }));
				return;
			}

			let amount = totalAmount * 100;
			if (profile.currency !== 'INR') {
				dataCreateRequest.data.budget = Math.floor(money / rateCurrency);
			}
			const payload = {
				amount: Math.floor(amount).toString(),
				request: dataCreateRequest.data.name,
				currency: 'INR',
				type: dataCreateRequest?.data.type,
			};
			requestApi.requestPayment(payload).then((res: any) => {
				if (res.statusCode === 400) {
					Loading.hide();
					Alert.alert('Error', res?.raw?.message, [
						{
							text: 'ok',
							onPress: () => dispatch(createAccountStripeAction()),
						},
					]);
				} else {
					Loading.hide();
					navigate(SCREENNAME.PAYMENT_STRIPE, {
						url: res?.url,
						stripe_checkout_id: res?.id,
						...dataCreateRequest,
						amount,
						totalAmount,
					});
				}
			});
		} catch (err: any) {
			Loading.hide();
			Alert.alert('Error', err);
		}
	};

	const showErrorPromotion = (messages: any) => promotionRef.current.showError(`${messages}`);

	const checkPromotion = () => {
		promotionRef.current.hideError();
		promotionRef.current.hideSuccess();
		try {
			Loading.show();
			ultilsApi.checkPromotion(money, promotion).then((res: any) => {
				if (res?.isValidCode) {
					setIdPromotion(res?.promotion?.id);
					setValueSaleOff(res?.valueSaleOff);
					setShowPromotion(true);
					promotionRef.current.hideError();
					promotionRef.current.showSuccess('Promo code applied');
					setPromotionSuccess(true);
				} else {
					showErrorPromotion(res?.message);
					setShowPromotion(false);
					setValueSaleOff(0);
					setPromotionSuccess(false);
				}
			});
		} catch (error: any) {
			Loading.hide();
		} finally {
			Loading.hide();
		}
	};

	const currency = profile?.currency || 'INR';

	return (
		<KeyboardAvoidingViews style={Style.container}>
			<HeaderWhite title="Payment" titleStyle={Style.h3_medium} iconClose />
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.list}
				keyboardShouldPersistTaps="handled">
				{/* /////////////////// */}
				<View style={styles.money}>
					<Text style={Style.txt12_secondary}>Amount</Text>
					<View style={Style.row_center}>
						<Text style={Style.h1}>{currency} </Text>
						<Text style={styles.inputMoney}>{money}</Text>
					</View>
				</View>
				{/* /////////////////// */}
				<View style={styles.bg_amount}>
					<View style={[styles.item_amount]}>
						<Text style={Style.txt14_secondary}>Amount</Text>
						<Text style={Style.txt16}>{`${currency} ${money}`}</Text>
					</View>
					{!promtionSuccess ? (
						<View style={[styles.item_amount, Style.top16]}>
							<Text style={Style.txt14_secondary}>Commission (10%)</Text>
							<Text style={Style.txt16}>{`${currency} ${commission.toFixed(2)}`}</Text>
						</View>
					) : (
						<></>
					)}

					{showPromotion && (
						<View style={[styles.item_amount, Style.top16, styles.border_bottom]}>
							<Text style={Style.txt14_secondary}>Promotion</Text>
							<Text style={Style.txt16}>{`- ${currency} ${valueSaleOff.toFixed(2)}`}</Text>
						</View>
					)}
					<View style={[styles.item_amount, Style.top16]}>
						<Text style={Style.txt16}>Total Amount</Text>
						<Text style={Style.txt16}>{`${currency} ${totalAmount.toFixed(2)}`}</Text>
					</View>
				</View>

				<Text style={[Style.txt16, Style.top24]}>Promo Code</Text>
				<TextInputs
					ref={promotionRef}
					value={promotion}
					returnKeyType="done"
					returnKeyLabel="Enter"
					onSubmitEditing={checkPromotion}
					onChangeText={setPromotion}
					label="Promo code"
					autoCapitalize="characters"
				/>
			</ScrollView>
			<SubmitButton title={'Pay'} onPress={onPressPay} />
		</KeyboardAvoidingViews>
	);
};

export default Payment;

const styles = StyleSheet.create({
	list: {
		paddingHorizontal: sizes.s24,
		flexGrow: 1,
		paddingBottom: sizes.s24,
	},
	inputMoney: {
		...Style.h1,
		textAlign: 'center',
	},
	money: {
		...Style.top32,
		borderRadius: sizes.s12,
		backgroundColor: colors.primary100,
		paddingVertical: sizes.s24,
		alignItems: 'center',
	},
	textInput: {
		width: '60%',
	},
	textInput2: {
		width: '36%',
	},
	bg_amount: {
		backgroundColor: colors.background,
		borderRadius: sizes.s12,
		marginTop: sizes.s4,
		paddingVertical: sizes.s16,
	},
	item_amount: {
		...Style.row_between,
		...Style.paddingHorizontal,
	},
	border_bottom: {
		paddingBottom: sizes.s16,
		borderBottomColor: colors.dividers,
		borderBottomWidth: sizes.s1,
	},
});
