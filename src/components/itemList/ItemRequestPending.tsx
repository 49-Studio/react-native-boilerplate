import { colors, fonts, images, sizes, Style } from 'assets';
import { navigate } from 'navigationRef';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { rateCurrencySelector, userSelector } from 'selector/authenSelector';
import { SCREENNAME } from 'utils/constant';

interface Props {
	image?: any;
	type?: 'Live' | 'Picture' | 'Video' | string;
	title?: string;
	author?: string;
	price?: number | string;
	style?: ViewStyle;
	styleIcon?: any;
	disabled?: boolean;
	address?: string;
	time?: any;
}

const ItemRequestPending: React.FC<Props> = (props: Props) => {
	const infoRequest = [
		{
			id: 1,
			icon: images.ic_map,
			content: props.address || '',
		},
		{
			id: 2,
			icon: images.ic_radio_uncheck,
			content: props.type || '',
		},
		props?.type === 'Photo Album'
			? ''
			: {
					id: 3,
					icon: images.ic_timer,
					content: `Duration: ${props.time || '0'} min`,
			  },
	];
	const user = useSelector(userSelector);
	const rateCurrency = useSelector(rateCurrencySelector);

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			disabled={props.disabled}
			style={[styles.container, props.style]}
			onPress={() => navigate(SCREENNAME.DETAIL_REQUEST)}>
			<View style={styles.content}>
				<FastImage
					source={{ uri: props?.image }}
					style={[styles.image, { marginRight: sizes.s12 }]}
				/>
				<View style={[Style.column, { flex: 1 }]}>
					<Text numberOfLines={2} style={Style.txt16}>
						{props.title || ''}
					</Text>
					{infoRequest.map((item, index) => (
						<View style={[Style.row, { paddingVertical: sizes.s4 }]} key={index}>
							<Image
								source={item.icon}
								style={[
									Style.icon20,
									{ tintColor: colors.secondary_text, marginRight: sizes.s4 },
								]}
							/>
							<Text style={Style.txt14_secondary} numberOfLines={2}>
								{item.content || ''}
							</Text>
						</View>
					))}
				</View>
			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
				<Text style={Style.txt16}>
					{`${user?.currency || 'INR'} ` + (+props.price * rateCurrency).toFixed(2) || '0'}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default React.memo(ItemRequestPending);

const styles = StyleSheet.create({
	container: {
		marginHorizontal: sizes.s16,
		marginBottom: sizes.s16,
		padding: sizes.s16,
		borderRadius: sizes.s12,
		backgroundColor: colors.background_gray,
	},
	image: {
		...Style.icon76,
		borderRadius: sizes.s12,
	},
	content: {
		flex: 1,
		...Style.row_between,
	},
	linearGradient: {
		flex: 1,
		borderRadius: sizes.s12,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: sizes.s4,
	},
	icon: {
		...Style.icon20,
	},
	txt: {
		...Style.txt12,
		fontFamily: fonts.bold,
		marginLeft: sizes.s5,
	},
});
