import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images, sizes, Style } from 'assets'
import { Button, HeaderWhite } from 'components'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { naviPop } from 'navigationRef'

const SuccesChangePhoneNumber: React.FC = () => {
	return (
		<View style={Style.container}>
			<HeaderWhite iconClose />
			<View style={Style.column_center}>
				<Image source={images.ic_succes_change_phone} style={Style.icon120} />
				<Text style={[Style.h2, Style.top32, Style.txtCenter]}>
					Great! Your phone number{'\n'} has been changed
				</Text>
				<Text style={[Style.txt12_secondary, Style.top8, Style.txtCenter]}>
					Don’t worry, We’ll let you know if there’s {'\n'}a problem with your account{' '}
				</Text>
			</View>
			<Button title=" Back To Home" onPress={() => naviPop(4)} styles={styles.btn} />
		</View>
	)
}

export default SuccesChangePhoneNumber

const styles = StyleSheet.create({
	btn: {
		marginHorizontal: sizes.s24,
		marginBottom: sizes.s32 + getBottomSpace(),
	},
})
