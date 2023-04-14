import { Dimensions, Platform, StatusBar } from 'react-native'

const dimen = Dimensions.get('window')
function isIphone() {
	return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV
}

export function isIphoneX(): boolean {
	return (
		isIphone() &&
		(dimen.height === 780 ||
			dimen.width === 780 ||
			dimen.height === 812 ||
			dimen.width === 812 ||
			dimen.height === 844 ||
			dimen.width === 844 ||
			dimen.height === 896 ||
			dimen.width === 896 ||
			dimen.height === 926 ||
			dimen.width === 926 ||
			dimen.height === 852 ||
			dimen.width === 852 || // 14 Pro
			dimen.height === 932 ||
			dimen.width === 932) // 14 Pro Max
	)
}

export function hasIsland(): boolean {
	return (
		isIphone() &&
		(dimen.height === 852 ||
			dimen.width === 852 || // 14 Pro
			dimen.height === 932 ||
			dimen.width === 932) // 14 Pro Max
	)
}

export function ifIphoneX(iphoneXStyle: any, regularStyle: any) {
	if (isIphoneX()) {
		return iphoneXStyle
	}
	return regularStyle
}

export function getStatusBarHeight(safe = true) {
	function safeHeight() {
		return hasIsland() ? 59 : 44
	}
	return Platform.select({
		ios: ifIphoneX(safe ? safeHeight() : 30, 20),
		android: StatusBar.currentHeight,
		default: 0,
	})
}

export function getBottomSpace() {
	return isIphoneX() ? 34 : 0
}
