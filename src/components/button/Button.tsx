import { colors, fonts, sizes } from 'assets'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

interface Props {
	title: string
	disable?: boolean
	ic_left?: boolean
	ic_right?: boolean
	images?: any
	styles?: any
	textColor?: any
	onPress?: () => void
}

const Button: React.FC<Props> = (props: Props) => {
	const icLeft = () => <Image source={props?.images} style={styles.images} />
	const icRight = () => <Image source={props?.images} style={styles.images} />
	return (
		<TouchableOpacity
			disabled={props.disable}
			style={[
				styles.button,
				props?.styles,
				props.disable && { backgroundColor: colors.background },
			]}
			activeOpacity={0.7}
			onPress={props.onPress}>
			{props.ic_left && icLeft()}
			<Text
				style={[
					styles.title,
					{ color: props.textColor || colors.white },
					props.disable && { color: colors.disable_text },
				]}>
				{props?.title}
			</Text>
			{props.ic_right && icRight()}
		</TouchableOpacity>
	)
}

export default Button

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.primary,
		borderRadius: sizes.s100,
		paddingVertical: sizes.s12,
		paddingHorizontal: sizes.s16,
		flexDirection: 'row',
	},
	title: {
		flex: 1,
		color: colors.white,
		fontSize: sizes.s16,
		lineHeight: sizes.s24,
		fontFamily: fonts.medium,
		textAlign: 'center',
	},
	images: {
		tintColor: colors.white,
		width: sizes.s24,
		height: sizes.s24,
	},
})
