import { getUserBalanceAction } from 'action/authenAction';
import { colors, images, sizes, Style } from 'assets';
import { Button, HeaderWhite } from 'components';
import { format } from 'date-fns';
import { goBack, jumpTo, naviPop } from 'navigationRef';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'selector/authenSelector';
import { SCREENNAME } from 'utils/constant';

const PaymentResult: React.FC = ({ route }: any) => {
	const type: string = route?.params?.type; //'success' | 'fail'
	const money = route?.params?.money || 0;
	const requestChange = route?.params;
	const isSuccess = Boolean(type === 'success');
	const userData = useSelector(userSelector);
	const dispatch = useDispatch();
	const currency = userData?.currency || 'INR';
	return (
		<ScrollView style={Style.container}>
			<HeaderWhite
				lightContent
				backgroundColor={isSuccess ? colors.success : colors.error}
				title=""
				iconTintColor={colors.white}
			/>
			<View
				style={{
					backgroundColor: isSuccess ? colors.success : colors.error,
					...styles.background,
				}}>
				<Image
					source={isSuccess ? images.ic_success_payment : images.ic_fail_payment}
					style={styles.icon}
				/>
				<Text style={styles.title}>{isSuccess ? 'Payment Successful' : 'Payment Failed!'}</Text>
			</View>
			<View style={{ marginTop: -sizes.s35 }}>
				<View
					style={{
						...styles.rectangle,
						backgroundColor: isSuccess ? '#33B484' : '#E76F5F',
					}}
				/>
				<View style={styles.content}>
					<Text style={[Style.h2, Style.txtCenter]}>{`${currency} ${Math.floor(money)}`}</Text>
					<View style={styles.border_dash} />
					<Text style={[Style.txt12_secondary, Style.top24]}>Request Name</Text>
					<Text
						style={[
							Style.txt16_regular,
							Style.top4,
							{ color: isSuccess ? colors.success : colors.error },
						]}>
						{requestChange?.name || ''}
					</Text>

					<Text style={[Style.txt12_secondary, Style.top16]}>Request Time</Text>
					<Text
						style={[
							Style.txt16_regular,
							Style.top4,
							{ color: isSuccess ? colors.success : colors.error },
						]}>
						{format(new Date(), 'HH:mm:ss dd/MM/yyyy')}
					</Text>
				</View>
			</View>
			<Button
				title={isSuccess ? 'Check Request' : 'Create Request Again'}
				styles={[styles.btn, Style.top48]}
				onPress={() => {
					naviPop(3);
					isSuccess && jumpTo(SCREENNAME.REQUEST);
				}}
			/>
			<Button
				title="Back Home"
				styles={[styles.btn, Style.top16, styles.btnWhite]}
				textColor={colors.black}
				onPress={() => {
					dispatch(getUserBalanceAction(userData.id));
					naviPop(3);
					goBack();
				}}
			/>
		</ScrollView>
	);
};

export default PaymentResult;

const styles = StyleSheet.create({
	icon: {
		resizeMode: 'contain',
		height: sizes.s100,
		alignSelf: 'center',
		...Style.top32,
	},
	background: {
		paddingBottom: sizes.s67,
		borderBottomLeftRadius: sizes.s16,
		borderBottomRightRadius: sizes.s16,
	},
	title: {
		...Style.h2,
		...Style.top16,
		color: colors.white,
		textAlign: 'center',
	},
	rectangle: {
		marginHorizontal: sizes.s24,
		height: sizes.s19,
		borderRadius: sizes.s10,
	},
	content: {
		backgroundColor: colors.white,
		...Style.shadow10,
		marginHorizontal: sizes.s38,
		paddingHorizontal: sizes.s24,
		paddingVertical: sizes.s32,
		borderBottomLeftRadius: sizes.s16,
		borderBottomRightRadius: sizes.s16,
		marginTop: -sizes.s10,
	},
	border_dash: {
		borderColor: colors.secondary_text,
		height: 0,
		borderRadius: 1,
		borderStyle: 'dashed',
		borderWidth: 1,
	},
	btn: {
		marginHorizontal: sizes.s24,
	},
	btnWhite: {
		backgroundColor: colors.white,
		borderWidth: sizes.s2,
		borderColor: colors.dividers,
	},
});
