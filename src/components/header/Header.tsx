import { colors, images, sizes, Style } from 'assets';
import { TextInputs } from 'components';
import { goBack } from 'navigationRef';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'utils/IphoneHelper';

import StatusBarView from './StatusBarView';
import WalletHeader from './WalletHeader';

interface Props {
	isShowSearchBar?: boolean;
	isShowBack?: boolean;
	onChangeText?: (value: string) => void;
	value?: string;
	onSubmitEditing?: (e: any) => void;
}
const smallHeight = sizes.s84;
const largeHeight = sizes.s150;

const Header: React.FC<Props> = (props: Props) => {
	const headerHeight = props.isShowSearchBar ? styles.largeHeader : styles.smallHeader;
	return (
		<View style={[styles.container, headerHeight]}>
			<StatusBarView lightContent />
			<Image
				source={props.isShowSearchBar ? images.bg_header_left : images.bg_header_left2}
				style={[styles.background, headerHeight]}
			/>
			<View style={[Style.row_between, Style.top16, Style.marginHorizontal]}>
				{props.isShowBack ? (
					<TouchableOpacity onPress={() => goBack()} style={{ marginLeft: -sizes.s8 }}>
						<Image source={images.ic_back} style={Style.icon48} />
					</TouchableOpacity>
				) : (
					<View style={[Style.row]}>
						<Image source={images.ic_liveme} style={Style.icon32} />
						<Text style={[Style.txt16_white, Style.left8]}>Snap4me</Text>
					</View>
				)}
				<WalletHeader />
			</View>

			{props.isShowSearchBar && (
				<TextInputs
					{...props}
					label="Search.."
					returnKeyType="search"
					icon={images.ic_search2}
					value={props.value || ''}
					onChangeText={props.onChangeText}
					style={Style.marginHorizontal}
					onSubmitEditing={props?.onSubmitEditing}
				/>
			)}
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primary,
		borderBottomLeftRadius: sizes.s16,
		borderBottomRightRadius: sizes.s16,
	},
	smallHeader: {
		height: smallHeight + getStatusBarHeight(true),
	},
	largeHeader: {
		height: largeHeight + getStatusBarHeight(true),
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '55%',
		zIndex: -10,
		borderBottomLeftRadius: sizes.s16,
	},
});
