import { getUserBalanceAction } from 'action/authenAction';
import { getListDeliveryAction } from 'action/deliveriesAction';
import { colors, sizes, Style } from 'assets';
import { ItemFulFilRequest } from 'components';
import { ListDelivery } from 'models';
import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'selector/authenSelector';
import { listDeliverySelector } from 'selector/deliveriesSelector';

const FulFilRequest: React.FC = () => {
	const user = useSelector(userSelector);
	const listDelivery = useSelector(listDeliverySelector);
	const dispatch = useDispatch();
	dispatch(getUserBalanceAction(user._id));
	const onRefresh = () => dispatch(getListDeliveryAction());

	const renderItem = ({ item, section }: { item: ListDelivery; section: any; index: number }) => {
		if (item?.request?.owner !== user?._id) {
			return <ItemFulFilRequest {...item} section={section.title} />;
		}

		return <></>;
	};

	return (
		<SectionList
			sections={listDelivery}
			keyExtractor={(item) => String(item?._id)}
			renderItem={renderItem}
			onRefresh={onRefresh}
			refreshing={false}
			showsVerticalScrollIndicator={false}
			stickySectionHeadersEnabled={false}
			renderSectionHeader={({ section: { title } }) => (
				<View style={styles.title}>
					<Text style={Style.h3_bold}>{title}</Text>
				</View>
			)}
		/>
	);
};

export default FulFilRequest;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: colors.white,
		alignItems: 'center',
	},
	title: {
		marginTop: sizes.s24,
		marginLeft: sizes.s16,
		marginBottom: sizes.s16,
	},
});
