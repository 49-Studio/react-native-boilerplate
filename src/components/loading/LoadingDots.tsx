import { colors, sizes } from 'assets'
import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'

function Loader() {
	const animations = {
		one: useRef(new Animated.Value(0)).current,
		two: useRef(new Animated.Value(0)).current,
		three: useRef(new Animated.Value(0)).current,
		four: useRef(new Animated.Value(0)).current,
	}

	function onAnimate(animation: any, nextAnimation: any) {
		Animated.sequence([
			Animated.timing(animation, {
				toValue: -10,
				duration: 400,
				useNativeDriver: true,
			}),
			Animated.timing(animation, {
				toValue: 0,
				duration: 400,
				useNativeDriver: true,
			}),
		]).start()

		setTimeout(nextAnimation, 200)
	}

	function onStartAnimate() {
		function onFourAnimation() {
			onAnimate(animations.four, () => {
				setTimeout(onStartAnimate, 300)
			})
		}
		function onThreeAnimation() {
			onAnimate(animations.three, onFourAnimation)
		}

		function onTwoAnimation() {
			onAnimate(animations.two, onThreeAnimation)
		}

		onAnimate(animations.one, onTwoAnimation)
	}

	useEffect(() => {
		onStartAnimate()
	}, [])

	return (
		<View style={styles.container}>
			<Animated.View
				style={{
					...styles.ball,
					backgroundColor: colors.primary,
					transform: [{ translateY: animations.one }],
				}}
			/>
			<Animated.View
				style={{
					...styles.ball,
					backgroundColor: colors.primary400,
					transform: [{ translateY: animations.two }],
				}}
			/>
			<Animated.View
				style={{
					...styles.ball,
					backgroundColor: colors.primary300,
					transform: [{ translateY: animations.three }],
				}}
			/>
			<Animated.View
				style={{
					...styles.ball,
					backgroundColor: colors.primary100,
					transform: [{ translateY: animations.four }],
				}}
			/>
		</View>
	)
}
export default React.memo(Loader)
const styles = StyleSheet.create({
	container: {
		width: 54,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	ball: {
		width: sizes.s9,
		height: sizes.s9,
		borderRadius: sizes.s9,
	},
})
