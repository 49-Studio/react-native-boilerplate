import { images, sizes, Style } from 'assets';
import { Button, HeaderWhite } from 'components';
import { naviPop } from 'navigationRef';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const SuccessWithdraw: React.FC = () => {
	return (
		<View style={Style.container}>
			<HeaderWhite title="" iconClose />
			<View style={styles.view}>
				<Image source={images.ic_success_withdraw} style={styles.img} />
				<Text style={[Style.h2]}>Withdrawal Pending</Text>
				<Text style={[Style.txt16_primary_text, Style.top16, Style.txtCenter]}>
					Your withdrawal request has been successfully submitted.
				</Text>
			</View>
			<Button
				title="Back to Home"
				onPress={() => naviPop(3)}
				styles={{ marginHorizontal: sizes.s24 }}
			/>
		</View>
	);
};

export default SuccessWithdraw;

const styles = StyleSheet.create({
	view: {
		flex: 0.9,
		justifyContent: 'center',
		alignItems: 'center',
	},
	img: {
		height: sizes.s195,
		resizeMode: 'contain',
	},
});
