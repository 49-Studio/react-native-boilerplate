import { colors, fonts, sizes, Style } from 'assets';
import { ListDelivery } from 'models';
import { navigate } from 'navigationRef';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { rateCurrencySelector, userSelector } from 'selector/authenSelector';
import { SCREENNAME } from 'utils/constant';
import { API_URL } from 'utils/https';

interface Props extends ListDelivery {
	section?: string;
	style?: ViewStyle;
	isIcon?: boolean;
	icon?: any;
	isInfo?: boolean;
	isEdit?: boolean;
	styleIcon?: any;
	disabled?: boolean;
	onPressIcon?: () => void;
}

const ItemFulFilRequest: React.FC<Props> = (props: Props) => {
	const userData = useSelector(userSelector);
	const rateCurrency = useSelector(rateCurrencySelector);

	const goToDetailDelivery = () => {
		if (userData?._id !== props?.owner?._id) {
			Alert.alert('Warning', 'You can not authorized request here!');
		} else {
			navigate(SCREENNAME.MESSAGING_ACCEPT, { ...props });
		}
	};
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			disabled={props.disabled}
			style={[
				styles.container,
				props.style,
				Boolean(userData?._id !== props?.owner?._id) && { display: 'none' },
			]}
			onPress={goToDetailDelivery}>
			<FastImage
				source={{ uri: API_URL + props?.request?.picture?.[0]?.url }}
				style={styles.image}>
				<LinearGradient
					colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.61)']}
					style={styles.linearGradient}>
					<Text
						style={[
							Style.txt12,
							{ color: props?.request?.type === 'livestream' ? colors.red : colors.white },
						]}>
						{props?.request?.type === 'livestream'
							? 'Live'
							: props?.request?.type === 'photo_album'
							? 'Picture'
							: 'Video'}
					</Text>
				</LinearGradient>
			</FastImage>
			<View style={styles.content}>
				<Text numberOfLines={2} style={Style.txt16}>
					{props?.request?.name || ''}
				</Text>
				<View style={[{ alignItems: 'flex-end' }, Style.top8]}>
					<Text style={Style.txt16}>
						{`${userData?.currency || 'INR'} ` +
							(+props?.request?.budget * rateCurrency).toFixed(2) || '0'}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default React.memo(ItemFulFilRequest);

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
	icon: {
		...Style.icon20,
	},
	txt: {
		...Style.txt12,
		fontFamily: fonts.bold,
		marginLeft: sizes.s5,
	},
});
