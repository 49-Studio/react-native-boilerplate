import Slider from '@react-native-community/slider';
import { withdrawAction } from 'action/requestAction';
import { colors, screenWidth, sizes, Style } from 'assets';
import { BottomSheet, HeaderWhite, KeyboardAvoidingViews, SubmitButton } from 'components';
import React, { useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { balanceSelector, userSelector } from 'selector/authenSelector';
import { MoneyValue } from 'utils/data';

const Withdraw: React.FC = () => {
	const confirmWithdrawRef = useRef<any>();
	const btsAmountRef = useRef<any>();
	const dispatch = useDispatch();

	const balance = useSelector(balanceSelector);
	// const balancePending = useSelector(balancePendingSelector);

	const user = useSelector(userSelector);

	const [money, setMoney] = useState<number>(1);

	// const openAmountInfo = () => {
	// 	btsAmountRef.current.open();
	// };

	const onPressProceedWithdraw = () => {
		console.log(balance, money, 'balance');
		if (money > balance) {
			Alert.alert('Error', 'The amount in the wallet is not enough!');
		} else {
			confirmWithdrawRef?.current?.open();
		}
	};
	const onPressComfirmWithdraw = () => {
		const withdrawData = {
			amount: money * 100,
			currency: 'INR',
		};
		dispatch(withdrawAction(withdrawData));
		confirmWithdrawRef?.current?.close();
	};

	const currency = user?.currency || 'INR';

	return (
		<KeyboardAvoidingViews>
			<HeaderWhite title="Withdraw" />
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
				<Text style={Style.txt16}>Amount</Text>
				<Text
					style={[Style.h2, Style.top16, Style.txtCenter]}>{`${currency} ${money}.00`}</Text>
				{/* <Text style={[Style.txt12_secondary, Style.top4, Style.txtCenter]}>
					Your Pending Balance: {balancePending.toFixed(2)}
				</Text> */}
				<Text style={[Style.txt12_secondary, Style.top4, Style.txtCenter]}>
					Your Avaliable Balance: {balance.toFixed(2)}
				</Text>

				<Slider
					style={styles.slider}
					minimumValue={1}
					maximumValue={balance}
					thumbTintColor={colors.primary}
					minimumTrackTintColor={colors.primary}
					maximumTrackTintColor={colors.border}
					onValueChange={setMoney}
					onSlidingComplete={setMoney}
					value={money}
					step={1}
				/>
				<View style={[Style.row_wrap, Style.top16]}>
					{MoneyValue.map((item, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => setMoney(item.value)}
							style={[
								styles.moneyTag,
								![3, 7].includes(index) && { marginRight: sizes.s16 },
								// eslint-disable-next-line react-native/no-inline-styles
								money === item.value && { backgroundColor: colors.primary, borderWidth: 0 },
							]}>
							<Text style={[Style.txt14, money === item.value && { color: colors.white }]}>
								{item.label}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>

			{/* /////////////////////////////// */}
			<SubmitButton title="Proceed" onPress={onPressProceedWithdraw} />

			{/* /////////////////////////////// */}
			<BottomSheet title="Confirm Withdraw" ref={confirmWithdrawRef}>
				<View style={styles.btsConfirm}>
					<View style={styles.itemComfirm}>
						<View style={[Style.row_between, Style.top10]}>
							<Text style={Style.txt12_secondary}>Amount</Text>
							<Text style={Style.txt14_primary_text}>{`${
								user?.currency || 'INR'
							} ${money}.00`}</Text>
						</View>
						<View style={styles.borderBottom} />
						{/* <View style={[Style.row_between, Style.top10]}>
							<View style={Style.row}>
								<Text style={[Style.txt12, Style.fontMedium]}>
									{'Amount you should receive  '}
								</Text>
								<TouchableOpacity onPress={openAmountInfo}>
									<Image
										source={images.ic_info}
										style={[Style.icon16, { tintColor: colors.black }]}
									/>
								</TouchableOpacity>
							</View>
							<Text style={Style.txt14_primary_text}>{`${user?.currency || 'INR'} ${
								money - (money * 10) / 100
							}.00`}</Text>
						</View> */}
					</View>
				</View>

				<SubmitButton title="Withdraw" onPress={onPressComfirmWithdraw} />
			</BottomSheet>

			<BottomSheet
				ref={btsAmountRef}
				title="Amount you should receive"
				content="The amount stated here is only an approximation as your bank may incur transfer and conversion charges. Please check with your bank for more information regarding international and domestic transfers"
			/>
		</KeyboardAvoidingViews>
	);
};

export default Withdraw;

const styles = StyleSheet.create({
	list: {
		flexGrow: 1,
		paddingHorizontal: sizes.s16,
		paddingVertical: sizes.s32,
	},
	slider: {
		marginTop: sizes.s24,
		width: '100%',
	},
	moneyTag: {
		paddingVertical: sizes.s10,
		borderRadius: sizes.s24,
		borderWidth: sizes.s2,
		borderColor: colors.dividers,
		alignItems: 'center',
		width: screenWidth / 4 - sizes.s24,
		marginTop: sizes.s16,
	},
	textInput: {
		width: '48%',
	},
	btsConfirm: {
		paddingVertical: sizes.s24,
		paddingHorizontal: sizes.s16,
	},
	itemComfirm: {
		paddingVertical: sizes.s10,
		paddingHorizontal: sizes.s16,
		backgroundColor: colors.background_gray,
		borderRadius: sizes.s16,
		marginTop: sizes.s16,
	},
	warning: {
		backgroundColor: 'rgba(255, 178, 53, 0.1)',
		borderRadius: sizes.s16,
		marginTop: sizes.s24,
		padding: sizes.s16,
		marginBottom: sizes.s48,
		...Style.row_start,
	},
	txtWarning: {
		...Style.txt14,
		...Style.fontRegular,
		...Style.left4,
		color: colors.warning,
		flex: 1,
	},
	borderBottom: {
		marginVertical: sizes.s16,
		backgroundColor: colors.dividers,
		height: sizes.s1,
	},
});
