import { colors, sizes } from 'assets'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'

interface Props {
	disable?: boolean
	images?: any
	styles?: ViewStyle
	onPress: () => void
}

const ButtonIcon: React.FC<Props> = (props: Props) => {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				props?.styles,
				props.disable && { backgroundColor: colors.background },
			]}
			activeOpacity={0.7}
			onPress={() => props.onPress()}>
			<Image
				source={props?.images}
				style={[styles.images, props.disable && { tintColor: colors.disable_text }]}
			/>
		</TouchableOpacity>
	)
}

export default ButtonIcon

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.primary,
		borderRadius: sizes.s100,
		width: sizes.s40,
		padding: sizes.s10,
	},
	images: {
		tintColor: colors.white,
		width: sizes.s20,
		height: sizes.s20,
	},
})
