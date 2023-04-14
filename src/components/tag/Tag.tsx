import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { PureComponent } from 'react'
import { colors, sizes, Style } from 'assets'
interface Props {
	style?: any
	title: string
	selected: boolean
	onChange: () => void
	error?: boolean
}
interface States {}
export class Tag extends PureComponent<Props, States> {
	onPress = () => {
		this.props.onChange()
	}
	render() {
		return (
			<TouchableOpacity
				onPress={this.onPress}
				style={[
					styles.container,
					this.props.error && styles.error,
					this.props.selected && styles.selected,
					this.props.style,
				]}
				activeOpacity={0.7}>
				<Text style={[Style.txt14, this.props.selected && { color: colors.white }]}>
					{this.props.title}
				</Text>
			</TouchableOpacity>
		)
	}
}

export default Tag
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: sizes.s10,
		paddingVertical: sizes.s10,
		borderWidth: sizes.s2,
		borderColor: colors.border,
		borderRadius: sizes.s24,
		marginRight: sizes.s16,
		marginTop: sizes.s16,
		justifyContent: 'center',
		alignItems: 'center',
	},
	error: {
		borderColor: colors.error,
	},
	selected: {
		borderColor: colors.primary,
		backgroundColor: colors.primary,
	},
})
