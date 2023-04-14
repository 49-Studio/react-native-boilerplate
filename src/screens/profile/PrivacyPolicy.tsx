import { getPolicyAction } from 'action/ultilsAction'
import { colors, images, sizes, Style } from 'assets'
import { HeaderWhite } from 'components'
import { Policy } from 'models/Ultils'
import React, { useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { policySelector } from 'selector/ultilsSelector'

const PrivacyPolicy: React.FC = () => {
	const dataPolicy: Policy = useSelector(policySelector)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getPolicyAction())
	}, [])
	return (
		<View style={Style.container}>
			<HeaderWhite title="Privacy Policy" />
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.headerBlue}>
					<Image style={styles.img} source={images.bg_header_left2} />
					<Text style={[Style.h3_medium, { color: colors.white }]}>Privacy Policy</Text>
				</View>
				<Text
					style={[
						Style.top24,
						Style.bottom24,
						Style.paddingHorizontal,
						Style.txt14_primary_text,
						Style.fontRegular,
					]}>
					{dataPolicy?.body}
				</Text>
			</ScrollView>
		</View>
	)
}

export default PrivacyPolicy

const styles = StyleSheet.create({
	headerBlue: {
		height: sizes.s99,
		backgroundColor: colors.primary,
		justifyContent: 'center',
		...Style.paddingHorizontal,
	},
	img: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		height: sizes.s99,
	},
})
