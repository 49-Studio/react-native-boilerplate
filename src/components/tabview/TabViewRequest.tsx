import { colors, screenWidth, sizes, Style } from 'assets'
import React from 'react'
import {
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native'

interface Props {
	style?: any
	labelTabLeft: string
	labelTabRight: string
	viewLeft: any
	viewRight: any
}
interface States {
	selectedTab: number
}
export class TabViewRequest extends React.PureComponent<Props, States> {
	scrollRef: any
	constructor(props: Props) {
		super(props)
		this.state = {
			selectedTab: 0,
		}
		this.scrollRef = React.createRef()
	}
	setTab(tab: number) {
		this.setState({ selectedTab: tab })
		if (tab === 0) {
			this.scrollRef.current.scrollTo({ x: 0, animate: true })
		} else {
			this.scrollRef.current.scrollTo({ x: screenWidth, animate: true })
		}
	}
	onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		if (e.nativeEvent.contentOffset.x == 0) {
			this.setState({ selectedTab: 0 })
		} else if (Math.round(e.nativeEvent.contentOffset.x) == Math.round(screenWidth)) {
			this.setState({ selectedTab: 1 })
		}
	}
	renderTab = (index: number, title: string, onPress: () => void = () => {}) => (
		<TouchableOpacity
			activeOpacity={0.7}
			style={[
				styles.tab,
				{ backgroundColor: this.state.selectedTab == index ? colors.primary : colors.white },
			]}
			onPress={() => {
				this.setTab(index)
				onPress()
			}}>
			<View style={Style.row}>
				<Text
					style={[
						styles.titleTab,
						{ color: this.state.selectedTab == index ? colors.white : colors.primary },
					]}>
					{title}
				</Text>
			</View>
		</TouchableOpacity>
	)
	render() {
		const props = this.props
		return (
			<View style={[styles.container, props.style]}>
				<View style={[styles.tabBar]}>
					{this.renderTab(0, props.labelTabLeft)}
					{this.renderTab(1, props.labelTabRight)}
				</View>
				<ScrollView
					ref={this.scrollRef}
					horizontal
					showsHorizontalScrollIndicator={false}
					scrollEnabled={false}
					onScroll={this.onScroll}
					scrollEventThrottle={16}
					pagingEnabled
					contentContainerStyle={{ flexGrow: 1 }}>
					<View style={styles.tabScreen}>{props.viewLeft}</View>
					<View style={styles.tabScreen}>{props.viewRight}</View>
				</ScrollView>
			</View>
		)
	}
}

export default TabViewRequest

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tabBar: {
		...Style.row,
		backgroundColor: colors.white,
		...Style.marginHorizontal,
		borderRadius: sizes.s100,
		borderColor: colors.primary,
		borderWidth: sizes.s1,
	},
	tab: {
		width: '50%',
		alignItems: 'center',
		paddingVertical: sizes.s12,
		borderRadius: sizes.s25,
		backgroundColor: colors.white,
	},

	titleTab: {
		fontSize: sizes.s16,
		fontWeight: '500',
	},
	tabScreen: {
		width: screenWidth,
	},
})
