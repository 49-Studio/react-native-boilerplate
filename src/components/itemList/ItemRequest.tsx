import { colors, fonts, images, sizes, Style } from 'assets';
import { ListRequest } from 'models';
import { navigate } from 'navigationRef';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { rateCurrencySelector, userSelector } from 'selector/authenSelector';
import { SCREENNAME } from 'utils/constant';
import { API_URL } from 'utils/https';

interface Props extends ListRequest {
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

const ItemRequest: React.FC<Props> = (props: Props) => {
	const useData = useSelector(userSelector);
	const rateCurrency = useSelector(rateCurrencySelector);

	const getDetailDeliveries = () => {
		navigate(SCREENNAME.DETAIL_REQUEST, { ...props });
	};
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			disabled={props.disabled}
			style={[styles.container, props.style]}
			onPress={getDetailDeliveries}>
			<FastImage source={{ uri: API_URL + props?.picture[0]?.url }} style={styles.image}>
				<LinearGradient
					colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.61)']}
					style={styles.linearGradient}>
					<Text
						style={[
							Style.txt12,
							{ color: props?.type === 'livestream' ? colors.red : colors.white },
						]}>
						{props?.type === 'livestream'
							? 'Live'
							: props?.type === 'photo_album'
							? 'Picture'
							: 'Video'}
					</Text>
				</LinearGradient>
			</FastImage>
			<View style={styles.content}>
				<Text numberOfLines={2} style={Style.txt16}>
					{props?.name || ''}
				</Text>
				{props?.section === 'Pending' || 'Active' ? (
					<View style={[Style.row_between, Style.top8]}>
						<View style={Style.row}>
							<Image source={images.ic_eye} style={styles.icon} />
							<Text style={styles.txt}>
								{props?.viewer || '0'} <Text style={{ ...Style.txt12 }}>viewer</Text>
							</Text>
						</View>
						<Text style={Style.txt16}>
							{`${useData?.currency || 'INR'} ` +
								(+props?.budget * rateCurrency).toFixed(2) || '0'}
						</Text>
					</View>
				) : (
					<>
						{props.isIcon ? (
							useData._id === props?.owner?.id && (
								<TouchableOpacity
									activeOpacity={0.7}
									onPress={props.onPressIcon}
									style={[Style.row_between, { marginTop: sizes.s8 }]}>
									<Text style={Style.txt16}>
										{`${useData?.currency || 'INR'} ` +
											(+props?.budget * rateCurrency).toFixed(2) || '0'}
									</Text>
									<View style={Style.row}>
										<Image source={props.icon} style={props.styleIcon} />
										{props.isEdit && (
											<Text
												style={[
													Style.txt14_secondary,
													{ color: colors.primary, marginLeft: sizes.s8 },
												]}>
												Edit
											</Text>
										)}
									</View>
								</TouchableOpacity>
							)
						) : (
							<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
								<Text style={Style.txt16}>
									{`${useData?.currency || 'INR'} ` +
										(+props?.budget * rateCurrency).toFixed(2) || '0'}
								</Text>
							</View>
						)}
					</>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default React.memo(ItemRequest);

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
