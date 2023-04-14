import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import React from 'react'
import { colors, sizes, Style } from 'assets'
interface Props extends TextInputProps {
	label: string
	value: string
	style?: any
	onChangeText: (value: string) => void
}
const ParagraphInput: React.FC<Props> = (props: Props) => {
	return (
		<View style={[styles.container, props.style]}>
			<TextInput
				{...props}
				value={props.value}
				onChangeText={props.onChangeText}
				placeholder={props.label}
				placeholderTextColor={colors.secondary_text}
				style={styles.text}
				multiline
			/>
		</View>
	)
}

export default React.memo(ParagraphInput)

const styles = StyleSheet.create({
	container: {
		padding: sizes.s16,
		...Style.border,
		height: sizes.s163,
	},
	text: {
		padding: 0,
		...Style.txt16,
		flex: 1,
		textAlignVertical: 'top',
	},
})
