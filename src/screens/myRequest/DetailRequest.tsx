import { getDetailDeliveryAction } from 'action/deliveriesAction';
import { colors, images, sizes, Style } from 'assets';
import { Header, ItemEmpty, ItemRequest, ItemRequestEdit, ItemVender } from 'components';
import { ListDelivery, ListRequest, RequestParams } from 'models';
import { navigate, replace } from 'navigationRef';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { detailDeliverySelector } from 'selector/deliveriesSelector';
import { SCREENNAME } from 'utils/constant';
import { TypeRequest } from 'utils/data';
import { API_URL } from 'utils/https';

const DetailRequest: React.FC<any> = ({ route }: { route: { params: ListRequest } }) => {
	const detail = useSelector(detailDeliverySelector);
	const dispatch = useDispatch();

	const getData = () => {
		dispatch(getDetailDeliveryAction(route?.params?.id));
	};

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (route?.params?.status !== 'pending') {
			return;
		}

		for (let item of detail) {
			if (item.status !== 'awaiting_request_confirmation') {
				replace(SCREENNAME.MESSAGING_REQUEST, item);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detail]);

	const renderItem = ({ item, index }: { item: ListDelivery; index: number }) => {
		return <ItemVender {...item} key={index} />;
	};

	const editRequest = () => {
		const params: RequestParams = {
			id: route?.params?.id,
			acceptVendor: route?.params?.accept_first_request,
			location: route?.params?.address,
			name: route?.params?.name,
			coordinate: {
				latitude: route?.params?.lat,
				longitude: route?.params?.long,
			},
			type: TypeRequest.find((e) => e.type === route?.params?.type),
			category: route?.params?.categories,
			image: {
				uri: API_URL + route?.params?.picture[0]?.url,
				imageName: route?.params?.name,
			},
			picture: route?.params?.picture,
			duration: route?.params?.duration / 60,
			period: route?.params?.deadline?.split('T')[0],
			deliveryTime: route?.params?.delivery_time || 1,
			budget: route?.params?.budget,
			description: route?.params?.description,
			only_visbile_within_50km: route?.params?.only_visbile_within_50km,
			status: route?.params?.status,
		};
		navigate(SCREENNAME.EDIT_REQUEST, { ...params });
	};

	return (
		<View style={styles.container}>
			<Header isShowBack />
			{route?.params?.status === 'active' ? (
				<ItemRequestEdit
					{...route?.params}
					style={{ marginHorizontal: 0 }}
					isIcon
					icon={images.ic_edit}
					isEdit
					styleIcon={Style.icon20}
					onPressIcon={editRequest}
				/>
			) : (
				<ItemRequest
					{...route?.params}
					style={{ marginHorizontal: 0 }}
					icon={images.ic_edit}
					styleIcon={Style.icon20}
					onPressIcon={editRequest}
				/>
			)}
			<FlatList
				data={detail}
				keyExtractor={(item, index) => String(index)}
				showsVerticalScrollIndicator={false}
				renderItem={renderItem}
				contentContainerStyle={{ flexGrow: 1 }}
				ListEmptyComponent={<ItemEmpty title="No vendor accepted!" />}
				ListHeaderComponent={<Text style={styles.title}>Accept a Vendor</Text>}
			/>
		</View>
	);
};

export default DetailRequest;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		flex: 1,
	},
	title: {
		...Style.h3_bold,
		marginLeft: sizes.s16,
		marginTop: sizes.s24,
		marginBottom: sizes.s16 / 2,
	},
});
