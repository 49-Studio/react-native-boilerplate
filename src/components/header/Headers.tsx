import { colors, images, sizes, Style } from 'assets';
import { goBack } from 'navigationRef';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'utils/IphoneHelper';

import StatusBarView from './StatusBarView';
import WalletHeader from './WalletHeader';

interface Props {
	title: string;
	isShowBack?: boolean;
	isCheckOnboard?: boolean;
}

const Headers: React.FC<Props> = (props: Props) => {
	return (
		<View style={styles.container}>
			<StatusBarView lightContent />
			<View style={styles.bg}>
				<Image source={images.bg_header_left3} style={styles.bgLeft} />
				<Image source={images.bg_header_right} style={styles.bgRight} />
			</View>
			{props.isShowBack ? (
				<View style={[Style.row_center, Style.top16]}>
					<TouchableOpacity onPress={() => goBack()} style={styles.btnBack}>
						<Image source={images.ic_back} style={Style.icon48} />
					</TouchableOpacity>
					<Text style={Style.txt16_white}>{props.title}</Text>
				</View>
			) : (
				<View style={[Style.row_between, Style.top16, Style.paddingHorizontal]}>
					<Text style={Style.txt16_white}>{props.title}</Text>

					<WalletHeader />
				</View>
			)}
		</View>
	);
};

export default React.memo(Headers);

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primary,
		height: getStatusBarHeight(true) + sizes.s125,
		borderBottomLeftRadius: sizes.s16,
		borderBottomRightRadius: sizes.s16,
	},
	bg: {
		...Style.row_between,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: -10,
	},
	bgLeft: {
		height: getStatusBarHeight(true) + sizes.s125,
		borderBottomLeftRadius: sizes.s16,
		width: '47%',
	},
	bgRight: {
		height: getStatusBarHeight(true) + sizes.s125,
		borderBottomRightRadius: sizes.s16,
		width: '47%',
	},
	btnBack: {
		left: sizes.s8,
		position: 'absolute',
	},
});
