import { getTermAction } from 'action/ultilsAction'
import { colors, images, sizes, Style } from 'assets'
import { HeaderWhite } from 'components'
import { Term } from 'models/Ultils'
import React, { useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { termSelector } from 'selector/ultilsSelector'

const TermOfService: React.FC = () => {
	const dataTerm: Term = useSelector(termSelector)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getTermAction())
	}, [])
	return (
		<View style={Style.container}>
			<HeaderWhite title="Term Of Service" />
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.headerBlue}>
					<Image style={styles.img} source={images.bg_header_left2} />
					<Text style={[Style.h3_medium, { color: colors.white }]}>Term Of Service</Text>
				</View>
				<Text
					style={[
						Style.top24,
						Style.bottom24,
						Style.paddingHorizontal,
						Style.txt14_primary_text,
						Style.fontRegular,
					]}>
					{dataTerm?.body}
				</Text>
			</ScrollView>
		</View>
	)
}

export default TermOfService

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
