import { createAccountOnboardAction, getUserBalanceAction } from 'action/authenAction';
import { getListTransactionAction } from 'action/requestAction';
import { colors, images, sizes, Style } from 'assets';
import { AlertSystem, Button, Headers, ItemEmpty, ItemTransactionHistory } from 'components';
import { ItemListTransaction } from 'models';
import { navigate, replace } from 'navigationRef';
import React, { useEffect, useRef } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
	balancePendingSelector,
	balanceSelector,
	isOnboardSelector,
	rateCurrencySelector,
	userSelector,
} from 'selector/authenSelector';
import { listTransactionSelector } from 'selector/requestSelector';
import { SCREENNAME } from 'utils/constant';

const MyWallet: React.FC = () => {
	const dispatch = useDispatch();
	const balance = useSelector(balanceSelector);
	const balancePending = useSelector(balancePendingSelector);
	const modalRef = useRef<any>();
	const rateCurrency = useSelector(rateCurrencySelector);

	const userData = useSelector(userSelector);
	const listTransaction = useSelector(listTransactionSelector);
	const isOnboard = useSelector(isOnboardSelector);

	const getData = () => {
		dispatch(getUserBalanceAction(userData.id));
		dispatch(getListTransactionAction());
		dispatch(createAccountOnboardAction());
	};
	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderItem = ({ item, index }: { item: ItemListTransaction; index: number }) => (
		<ItemTransactionHistory {...item} key={index} />
	);

	const showModal = () => modalRef?.current?.open();
	return (
		<View style={Style.container}>
			<Headers isShowBack title="MY Wallet" isCheckOnboard={isOnboard} />

			<View style={styles.withdraw}>
				<View style={[Style.row_between, styles.borderBottom]}>
					<View>
						<Text style={Style.txt14_secondary}>Pending Balance</Text>
						<Text style={[Style.top4, Style.h2]}>
							{`${userData?.currency || 'INR'} ` +
								(balancePending * rateCurrency).toFixed(2)}
						</Text>
					</View>
					<View>
						<Text style={Style.txt14_secondary}>Avaliable Balance</Text>
						<Text style={[Style.top4, Style.h2]}>
							{`${userData?.currency || 'INR'} ` + balance.toFixed(2)}
						</Text>
					</View>
					<View style={styles.ic_wallet}>
						<Image source={images.ic_wallet} style={Style.icon20} />
					</View>
				</View>
				<View style={[Style.row_between, Style.top4]}>
					<TouchableOpacity onPress={() => replace(SCREENNAME.FROM_STRIPE)}>
						<Text style={Style.txt14_secondary}>
							Edit account detail (Update bank account)
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={showModal}>
						<Image source={images.ic_info} style={Style.icon20} />
					</TouchableOpacity>
				</View>
				<Button
					title="Withdraw"
					onPress={() => navigate(SCREENNAME.WITHDRAW)}
					styles={Style.top24}
				/>
			</View>

			<View style={[Style.row_between, Style.paddingHorizontal, Style.top32, Style.bottom16]}>
				<Text style={Style.h3_medium}>Transactions History</Text>
				<TouchableOpacity onPress={() => navigate(SCREENNAME.SORT_TRANSACTION)}>
					<Image
						source={images.ic_filter_favourite}
						style={[Style.icon48, { marginTop: sizes.s10 }]}
					/>
				</TouchableOpacity>
			</View>

			<FlatList
				data={listTransaction}
				refreshing={false}
				onRefresh={getData}
				keyExtractor={(item, index) => String(index)}
				renderItem={renderItem}
				contentContainerStyle={{ flexGrow: 1 }}
				ListEmptyComponent={<ItemEmpty title="Not have any transaction history!" />}
				showsVerticalScrollIndicator={false}
			/>
			<AlertSystem
				ref={modalRef}
				title="Alert"
				content="Withdrawal of this amount is being processed at the moment. It will be available in 5-7 working days"
			/>
		</View>
	);
};

export default MyWallet;

const styles = StyleSheet.create({
	withdraw: {
		marginHorizontal: sizes.s16,
		borderRadius: sizes.s16,
		...Style.shadow10,
		padding: sizes.s16,
		paddingBottom: sizes.s24,
		backgroundColor: colors.white,
		shadowColor: 'rgba(0, 0, 0, 0.11)',
		marginTop: -sizes.s52,
	},
	ic_wallet: {
		padding: sizes.s10,
		borderRadius: sizes.s20,
		backgroundColor: colors.primary,
	},
	borderBottom: {
		borderBottomColor: colors.background,
		borderBottomWidth: sizes.s1,
		paddingBottom: sizes.s16,
	},
});
