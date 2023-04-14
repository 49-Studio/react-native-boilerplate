import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundTimer from 'react-native-background-timer'
import { colors, fonts, sizes } from 'assets'
import { format } from 'date-fns'
let interval: any
interface Props {
	style?: any
	seconds?: number
	onResend?: () => void
}
const CountDownTime: React.FC<Props> = ({ style, seconds = 60, onResend = () => {} }: Props) => {
	const [isShowCountDown, setIsShowCountDown] = useState<boolean>(true)
	const [second, setSecond] = useState<number>(seconds)
	const showCountDown = () => {
		setIsShowCountDown(true)
		countDownTime()
		onResend()
	}
	const countDownTime = () => {
		interval = BackgroundTimer.setInterval(() => {
			if (second === 0) {
				BackgroundTimer.clearInterval(interval)
				setIsShowCountDown(false)
			} else {
				setSecond((prev) => prev - 1)
			}
		}, 1000)
	}
	useEffect(() => {
		countDownTime()
		return () => {
			BackgroundTimer.clearInterval(interval)
		}
	}, [])

	useEffect(() => {
		if (second === 0) {
			BackgroundTimer.clearInterval(interval)
			setSecond(seconds)
			setIsShowCountDown(false)
		}
	}, [second])
	return (
		<View style={style}>
			{isShowCountDown ? (
				<Text style={styles.resendCode}>
					Resend code in <Text style={styles.time}>{format(second * 1000, 'mm:ss')}</Text>
				</Text>
			) : (
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<TouchableOpacity onPress={showCountDown}>
						<Text style={[styles.resendCode, { color: colors.primary }]}>Click here</Text>
					</TouchableOpacity>
					<Text style={styles.resendCode}> to resent OTP</Text>
				</View>
			)}
		</View>
	)
}

export default CountDownTime

const styles = StyleSheet.create({
	resendCode: {
		fontSize: sizes.s14,
		fontFamily: fonts.regular,
		lineHeight: sizes.s22,
		color: colors.secondary_text,
		textAlign: 'center',
		marginBottom: sizes.s40,
	},
	time: {
		fontSize: sizes.s14,
		fontFamily: fonts.regular,
		lineHeight: sizes.s22,
		color: colors.primary,
		textAlign: 'center',
		marginBottom: sizes.s40,
	},
})
