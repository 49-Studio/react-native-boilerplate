import { colors, images, sizes, Style } from 'assets';
import { format } from 'date-fns';
import _ from 'lodash';
import { ItemListTransaction } from 'models';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { rateCurrencySelector, userSelector } from 'selector/authenSelector';

type Props = ItemListTransaction;

const ItemTransactionHistory: React.FC<Props> = (props: Props) => {
	const user = useSelector(userSelector);
	const rateCurrency = useSelector(rateCurrencySelector);
	return (
		<View style={styles.container}>
			{props?.amount < 0 ? (
				<View style={{ ...Style.row_between, flex: 1 }}>
					<View>
						<Text numberOfLines={2} style={Style.txt16}>
							Withdraw
						</Text>
						<Text style={[Style.txt12_secondary, Style.top4]}>
							{format(new Date(props?.created * 1000), 'dd/MM/yyyy')}
						</Text>
					</View>
					<Text style={Style.txt16}>
						{`${user?.currency || 'INR'} ` +
							_.round(+props?.amount * rateCurrency, 2).toFixed(2)}
					</Text>
				</View>
			) : (
				<>
					<FastImage source={{ uri: images.no_img_uri }} style={styles.image}>
						<LinearGradient
							colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.61)']}
							style={styles.linearGradient}>
							<Text
								style={[
									Style.txt12,
									{
										color:
											props?.requestType === 'livestream' ? colors.red : colors.white,
									},
								]}>
								{props?.requestType === 'livestream'
									? 'Live'
									: props?.requestType === 'photo_album'
									? 'Picture'
									: 'Video'}
							</Text>
						</LinearGradient>
					</FastImage>
					<View style={styles.content}>
						<Text numberOfLines={2} style={Style.txt16}>
							{props?.name || ''}
						</Text>
						<View style={[Style.row_between, Style.top8]}>
							<Text style={Style.txt12_secondary}>
								{format(new Date(props?.created * 1000), 'dd/MM/yyyy')}
							</Text>
							<Text style={Style.txt16}>
								{`${user?.currency || 'INR'} +` +
									_.round(props?.amount * rateCurrency, 2).toFixed(2)}
							</Text>
						</View>
					</View>
				</>
			)}
		</View>
	);
};

export default React.memo(ItemTransactionHistory);

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
