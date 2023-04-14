import { colors, sizes } from 'assets'
import React, { Component } from 'react'
import { Animated, Modal, PanResponder, StyleSheet, TouchableOpacity, View } from 'react-native'

interface Props {
	children: any
	draggable?: boolean
	height: number
}
interface States {
	modalVisible: boolean
	animatedHeight: any
	pan: any
}
class BottomSheetSwipe extends Component<Props, States> {
	panResponder: any
	constructor(props: Props) {
		super(props)
		this.state = {
			modalVisible: false,
			animatedHeight: new Animated.Value(0),
			pan: new Animated.ValueXY(),
		}

		this.createPanResponder(props)
	}

	setModalVisible(visible: boolean, closeFunction: any = undefined) {
		const { height } = this.props
		const { animatedHeight, pan } = this.state
		if (visible) {
			this.setState({ modalVisible: visible }, () => {
				Animated.timing(animatedHeight, {
					toValue: height,
					duration: 300,
					useNativeDriver: false,
				}).start()
			})
		} else {
			Animated.timing(animatedHeight, {
				toValue: 0,
				duration: 400,
				useNativeDriver: false,
			}).start(() => {
				pan.setValue({ x: 0, y: 0 })
				this.setState({
					modalVisible: visible,
					animatedHeight: new Animated.Value(0),
				})
				if (typeof closeFunction === 'function') closeFunction()
			})
		}
	}

	createPanResponder(props: Props) {
		const { height } = props
		const { pan } = this.state
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (e, gestureState) => {
				if (gestureState.dy > 0) {
					Animated.event([null, { dy: pan.y }], {
						useNativeDriver: false,
					})(e, gestureState)
				}
			},
			onPanResponderRelease: (e, gestureState) => {
				const gestureLimitArea = height / 3
				const gestureDistance = gestureState.dy
				if (gestureDistance > gestureLimitArea) {
					this.setModalVisible(false)
				} else {
					Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start()
				}
			},
		})
	}

	open() {
		this.setModalVisible(true)
	}

	close(func: any = undefined) {
		this.setModalVisible(false, func)
	}

	render() {
		const { children, draggable = true } = this.props
		const { animatedHeight, pan, modalVisible } = this.state
		const panStyle = {
			transform: pan.getTranslateTransform(),
		}

		return (
			<Modal
				animationType="fade"
				transparent
				statusBarTranslucent
				visible={modalVisible}
				onRequestClose={() => this.close()}>
				<View style={[styles.wrapper, { backgroundColor: colors.bgTransparent }]}>
					<TouchableOpacity
						style={{ flex: 1 }}
						onPress={() => this.close()}
						activeOpacity={1}
					/>
					<Animated.View
						{...this.panResponder.panHandlers}
						style={[panStyle, styles.background]}>
						<View style={styles.draggableIcon} />
					</Animated.View>
					<Animated.View
						{...(draggable && this.panResponder.panHandlers)}
						style={[
							panStyle,
							styles.container,
							{
								height: animatedHeight,
							},
						]}>
						{children}
					</Animated.View>
				</View>
			</Modal>
		)
	}
}

export default BottomSheetSwipe
const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	background: {
		// flex: 1,
		backgroundColor: 'transparent',
		height: sizes.s50,
		justifyContent: 'flex-end',
		paddingBottom: sizes.s8,
	},
	container: {
		width: '100%',
		height: 0,
		borderTopRightRadius: sizes.s16,
		borderTopLeftRadius: sizes.s16,
		backgroundColor: colors.white,
		paddingTop: sizes.s8,
		overflow: 'hidden',
	},
	draggableContainer: {
		width: '100%',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	draggableIcon: {
		width: sizes.s40,
		height: sizes.s6,
		borderRadius: 3,
		backgroundColor: colors.white,
		alignSelf: 'center',
	},
})
