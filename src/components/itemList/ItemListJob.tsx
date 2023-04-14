import { getDetailDeliveryAction } from 'action/deliveriesAction';
import { getDetailRequestAction } from 'action/requestAction';
import { colors, fonts, images, sizes, Style } from 'assets';
import { ListRequest } from 'models';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { rateCurrencySelector, userSelector } from 'selector/authenSelector';
import { requestTypes } from 'utils/data';
import { API_URL } from 'utils/https';

interface Props extends ListRequest {
	typeFilter: string;
}

const ItemListJob: React.FC<Props> = (props: Props) => {
	const dispatch = useDispatch();
	const user = useSelector(userSelector);
	const rateCurrency = useSelector(rateCurrencySelector);
	const goToDetail = () => {
		dispatch(getDetailRequestAction(props?.id));
		dispatch(getDetailDeliveryAction(props?.id));
	};

	return (
		<TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={goToDetail}>
			<FastImage source={{ uri: API_URL + props?.picture[0]?.url }} style={styles.image}>
				<LinearGradient
					colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.61)']}
					style={styles.linearGradient}>
					<Text
						style={[
							Style.txt12,
							{ color: props?.type === 'livestream' ? colors.red : colors.white },
						]}>
						{requestTypes?.[props?.type] || ''}
					</Text>
				</LinearGradient>
			</FastImage>
			<View style={styles.content}>
				<Text numberOfLines={2} style={Style.txt16}>
					{props?.name || ''}
				</Text>
				<View style={[Style.row_between, Style.top8]}>
					<Text style={Style.txt12_secondary}>
						{props?.owner?.name || ''} <Image source={images.ic_star} />{' '}
						<Text style={{ fontFamily: fonts.medium }}>{props?.owner?.rating || '0'}</Text>
					</Text>
				</View>
				<Text style={Style.txt16}>
					{` ${user?.currency || 'INR'} ` + (+props?.budget * rateCurrency).toFixed(2) || '0'}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default React.memo(ItemListJob);

const styles = StyleSheet.create({
	container: {
		marginHorizontal: sizes.s16,
		marginBottom: sizes.s16,
		padding: sizes.s16,
		borderRadius: sizes.s12,
		backgroundColor: colors.background_gray,
		...Style.row,
	},
	image: {
		...Style.icon76,
		borderRadius: sizes.s12,
	},
	content: {
		flex: 1,
		marginLeft: sizes.s12,
	},
	linearGradient: {
		flex: 1,
		borderRadius: sizes.s12,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: sizes.s4,
	},
});
