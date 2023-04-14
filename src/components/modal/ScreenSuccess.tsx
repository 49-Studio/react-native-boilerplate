import { colors, sizes, Style } from 'assets'
import { Button, StatusBarView } from 'components'
import { navigateReset } from 'navigationRef'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { keyAsyncStorage, removeStoreData } from 'utils/AsyncStorage'
import { STACKNAME } from 'utils/constant'

interface Props {
	icon: any
	images: any
	title: string
	subTitle: string
	label: string
	ref: any
}
const ScreenSuccess: React.FC<Props> = forwardRef((props: Props, ref: any) => {
	const [show, setShow] = useState(false)
	useImperativeHandle(ref, () => ({
		open: () => open(),
		close: (callback: () => void) => close(callback),
	}))
	const open = () => {
		setShow(true)
	}
	const close = (callback: any = undefined): void => {
		setShow(false)
	}
	return (
		<Modal visible={show} animationType="slide" statusBarTranslucent transparent>
			<View style={styles.container}>
				<StatusBarView backgroundColor={colors.white} />
				<TouchableOpacity onPress={close}>
					<Image
						source={props.icon}
						style={{
							width: sizes.s24,
							height: sizes.s24,
							marginLeft: sizes.s16,
							marginTop: sizes.s16,
						}}
					/>
				</TouchableOpacity>
				<View style={styles.content}>
					<Image source={props.images} style={styles.imagesCongrat} />
					<Text style={styles.title}>{props.title}</Text>
					<Text style={styles.subTitle}>{props.subTitle}</Text>
				</View>
				<Button
					title={props.label}
					onPress={() => {
						close()
						setTimeout(() => {
							navigateReset(STACKNAME.AUTHENTICATION)
							removeStoreData(keyAsyncStorage.isLogedIn)
						}, 500)
					}}
					styles={styles.button}
				/>
			</View>
		</Modal>
	)
})

export default ScreenSuccess
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	content: {
		flex: 0.7,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		...Style.h2,
		...Style.txtCenter,
		width: '70%',
	},
	subTitle: {
		...Style.txt16_secondary,
		...Style.txtCenter,
		width: '80%',
		...Style.top16,
		...Style.fontRegular,
	},
	imagesCongrat: {
		width: sizes.s120,
		height: sizes.s120,
		alignSelf: 'center',
		marginBottom: sizes.s32,
	},
	button: {
		position: 'absolute',
		bottom: sizes.s60,
		marginHorizontal: sizes.s24,
	},
})
