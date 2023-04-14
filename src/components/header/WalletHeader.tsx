import { colors, images, sizes, Style } from 'assets';
import { navigate } from 'navigationRef';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { balanceSelector, userSelector } from 'selector/authenSelector';
import { SCREENNAME } from 'utils/constant';

const WalletHeader: React.FC = () => {
	const balance = useSelector(balanceSelector);
	const user = useSelector(userSelector);

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => navigate(SCREENNAME.MY_WALLET)}
			style={styles.wallet}>
			<Image source={images.ic_wallet} style={Style.icon24} />
			<Text style={[Style.txt14_white, Style.left8]}>
				{`${user?.currency || 'INR'} ` + balance.toFixed(2)}
			</Text>
		</TouchableOpacity>
	);
};

export default WalletHeader;

const styles = StyleSheet.create({
	wallet: {
		paddingHorizontal: sizes.s12,
		paddingVertical: sizes.s6,
		backgroundColor: colors.primary400,
		...Style.row,
		borderRadius: sizes.s24,
	},
});
