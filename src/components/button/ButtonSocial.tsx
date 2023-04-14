import { colors, sizes } from 'assets'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

interface Props {
	title?: string
	images?: any
	styles?: ViewStyle
	onPress: () => void
}
const ButtonSocial: React.FC<Props> = (props: Props) => {
	const icLeft = () => <Image source={props?.images} style={styles.images} />
	return (
		<TouchableOpacity
			style={[styles.button, props?.styles]}
			activeOpacity={0.7}
			onPress={props.onPress}>
			{icLeft()}
			<Text style={styles.title}>{props.title}</Text>
		</TouchableOpacity>
	)
}

export default ButtonSocial

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.white,
		borderColor: colors.dividers,
		borderWidth: sizes.s2,
		borderRadius: sizes.s100,
		paddingVertical: sizes.s12,
		paddingHorizontal: sizes.s30,
		flexDirection: 'row',
	},
	title: {
		color: colors.title,
		fontSize: sizes.s16,
		lineHeight: sizes.s24,
		fontWeight: '500',
		textAlign: 'center',
	},
	images: {
		width: sizes.s24,
		height: sizes.s24,
		marginRight: sizes.s8,
		marginLeft: -sizes.s8,
	},
})
