import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, sizes, Style } from 'assets'
import Button from './Button'
import { getBottomSpace } from 'react-native-iphone-x-helper'
interface Props {
	titleLeft: string
	titleRight: string
	shadow?: boolean
	disable?: boolean
	onPressLeft?: () => void
	onPressRight?: () => void
	style?: any
}

const ButtonSubmit2: React.FC<Props> = (props: Props) => {
	return (
		<View style={[styles.container, props.shadow && Style.shadow5, props.style]}>
			<Button
				title={props.titleLeft}
				onPress={props.onPressLeft}
				styles={styles.buttonLeft}
				textColor={colors.black}
			/>
			<Button
				title={props.titleRight}
				disable={props?.disable}
				onPress={props.onPressRight}
				styles={styles.button}
			/>
		</View>
	)
}
ButtonSubmit2.defaultProps = {
	shadow: true,
}
export default ButtonSubmit2

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.white,
		paddingHorizontal: sizes.s24,
		paddingTop: sizes.s8,
		paddingBottom: sizes.s8 + getBottomSpace(),
	},
	button: {
		width: '47%',
	},
	buttonLeft: {
		color: colors.black,
		width: '47%',
		backgroundColor: colors.white,
		borderColor: colors.dividers,
		borderWidth: sizes.s2,
	},
})
