import { useEffect, useState } from 'react'
import { Dimensions, Platform, ScaledSize } from 'react-native'

export let screenWidth: number = Dimensions.get('screen').width
export let screenHeight: number = Dimensions.get('screen').height

interface DefaultSize {
	width: number
	height: number
}
const sizeDefault: DefaultSize = {
	//default phone size in figma 812/375: iphoneX
	width: 375,
	height: 812,
}
//portrait ratio default
const ratioDefault: number = sizeDefault.height / sizeDefault.width
//lanscape ratio default
const ratioDefaultLanscape: number = sizeDefault.width / sizeDefault.height
//ratio Current phone portrait or lanscape
const ratioCurrent: number = screenHeight / screenWidth
//ratio scale for portrait
const ratioScale: number = ratioCurrent / ratioDefault
//ratio scale for lanscape
const ratioLanscapeScale: number = ratioCurrent / ratioDefaultLanscape
//ratio scale ipad and tablet
const scaleVer: number = screenHeight / sizeDefault.height

const scaleHoz: number = screenWidth / sizeDefault.width

const sizes: any = {}
for (let i = 1; i < 300; i++) {
	var key = 's' + i
	sizes[key] = scale(i)
}
export default sizes
export function isTablet() {
	if (Platform.isPad || ratioCurrent == 4 / 3 || ratioCurrent < 1.6) {
		return true
	}
	return false
}
export const sizesTablet = (size: number, multi: number = 6) => (isTablet() ? size * multi : size)
//************* */
function scale(size: number) {
	if (ratioCurrent > 1) {
		//scale size for phone 16:9
		if (Math.round(ratioCurrent * 100) / 100 == Math.round((16 / 9) * 100) / 100) {
			return Math.round(size * ratioScale * 100) / 100
		}
		//scale size for phone 18:9, 19:9, ipad, tablet 4:3,
		else {
			return Math.round(size * scaleVer * 100) / 100
		}
	}
	//scale size for phone lanscape
	else {
		return Math.round(size * ratioLanscapeScale * 100) / 100
	}
}

//***************use for hook ***************/
export function useDimensions() {
	const [dimensions, setDimensions] = useState(Dimensions.get('window'))

	const onChange = ({ window, screen }: { window: ScaledSize; screen: ScaledSize }) => {
		setDimensions(window)
		screenHeight = window.height
		screenWidth = window.width
	}

	useEffect(() => {
		Dimensions.addEventListener('change', onChange)

		return () => Dimensions.removeEventListener('change', onChange)
	}, [])

	return dimensions
}
//***how to use */
//const a = useDimensions()
