import { Style } from 'assets'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
	title?: string
}
const ItemEmpty: React.FC<Props> = (props: Props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{props?.title}</Text>
		</View>
	)
}
export default ItemEmpty
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		...Style.txt14_secondary,
	},
})
