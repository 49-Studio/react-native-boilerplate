import { colors, sizes, Style } from 'assets'
import React from 'react'
import {
	LayoutAnimation,
	Platform,
	StyleSheet,
	TouchableOpacity,
	UIManager,
	View,
} from 'react-native'

interface Props {
	active: boolean
	onChange: () => void
}

const width = sizes.s52
const height = sizes.s32
const circle = sizes.s28
if (Platform.OS === 'android') {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true)
	}
}
const Switch: React.FC<Props> = (props: Props) => {
	const onSwitch = () => {
		LayoutAnimation.configureNext(
			LayoutAnimation.create(
				250,
				LayoutAnimation.Types.easeInEaseOut,
				LayoutAnimation.Properties.opacity
			)
		)
		props.onChange()
	}
	return (
		<TouchableOpacity
			activeOpacity={1}
			onPress={onSwitch}
			style={[
				styles.container,
				{ backgroundColor: props.active ? colors.primary : colors.background },
			]}>
			<View style={[styles.cirle, { marginLeft: props.active ? sizes.s22 : sizes.s2 }]} />
		</TouchableOpacity>
	)
}

export default Switch
Switch.defaultProps = {
	onChange: () => {},
}
const styles = StyleSheet.create({
	container: {
		width,
		height,
		borderRadius: height,
		justifyContent: 'center',
	},
	cirle: {
		width: circle,
		height: circle,
		borderRadius: circle,
		backgroundColor: colors.white,
		...Style.shadow3,
	},
})
