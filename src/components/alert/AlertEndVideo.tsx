import { Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { colors, fonts, sizes, Style } from 'assets'
import ButtonRequest from 'components/button/ButtonRequest'

interface Props {
	onPress?: () => void
}
const AlertEndVideo: React.FC<any> = forwardRef((props: Props, ref: any) => {
	const [show, setShow] = useState<boolean>(false)
	useImperativeHandle(ref, () => ({
		open: () => open(),
		close: (callBack: () => void) => close(callBack),
	}))
	const open = () => {
		setShow(true)
	}
	const close = (callBack = () => {}): void => {
		setShow(false)
	}
	return (
		<Modal
			visible={show}
			animationType="fade"
			statusBarTranslucent
			transparent
			onRequestClose={() => close()}>
			<View style={styles.container}>
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<Text style={styles.title}>Are you sure you want to end your live video?</Text>
				</View>
				<View style={[Style.row_between, { paddingBottom: sizes.s46 }]}>
					<ButtonRequest
						title={`End Now`}
						styles={styles.buttonLeft}
						onPress={props?.onPress}
						textColor={colors.white}
					/>
					<ButtonRequest
						title="Cancel"
						styles={{ width: '47%', backgroundColor: colors.white }}
						onPress={close}
						textColor={colors.black}
					/>
				</View>
			</View>
		</Modal>
	)
})

export default AlertEndVideo

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.9)',
		paddingHorizontal: sizes.s41,
	},
	title: {
		fontSize: sizes.s24,
		fontFamily: fonts.bold,
		textAlign: 'center',
		color: colors.white,
	},
	buttonLeft: {
		color: colors.white,
		width: '47%',
		backgroundColor: colors.error,
		borderColor: colors.error,
		borderWidth: sizes.s2,
	},
})
