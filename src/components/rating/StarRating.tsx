import { images, sizes, Style } from 'assets'
import React, { memo, useCallback, useRef } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'

const starArr = [1, 2, 3, 4, 5]
interface Props {
	value: number
	onChange: (star: number) => void
	style?: any
}
const StarRating: React.FC<Props> = ({ value = 0, onChange, style }) => {
	const animation = useRef<any>(new Animated.Value(0)).current
	const animated = useCallback(() => {
		animation.setValue(0)
		Animated.timing(animation, {
			toValue: 1,
			useNativeDriver: true,
			duration: 300,
		}).start(() => {
			Animated.timing(animation, {
				toValue: 0,
				useNativeDriver: true,
				duration: 300,
			}).start()
		})
	}, [])
	return (
		<View style={[styles.container, style]}>
			{starArr.map((item) => (
				<TouchableOpacity
					key={item}
					activeOpacity={0.9}
					onPress={() => {
						onChange(item)
						animated()
					}}>
					<Animated.Image
						source={item <= value ? images.star_rated : images.star_unrate}
						style={[
							Style.icon48,
							item <= value && {
								transform: [
									{
										scale: animation.interpolate({
											inputRange: [0, 1],
											outputRange: [1, 1.1],
										}),
									},
								],
							},
						]}
					/>
				</TouchableOpacity>
			))}
		</View>
	)
}

export default memo(StarRating)

const styles = StyleSheet.create({
	container: {
		marginTop: sizes.s16,
		...Style.row_around,
	},
})
