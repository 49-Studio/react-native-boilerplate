import { getDetailDeliveryAcceptAction, getListDeliveryAction } from 'action/deliveriesAction'
import deliveriesApi from 'api/deliveriesApi'
import { colors, images, sizes, Style } from 'assets'
import { AlertEndVideo, StatusBarView } from 'components'
import { goBack } from 'navigationRef'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NodeCameraView } from 'react-native-nodemediaclient'
import { useDispatch } from 'react-redux'
const { width, height } = Dimensions.get('window')
const config = {
	cameraConfig: {
		cameraId: 1,
		cameraFrontMirror: true,
	},
	videoConfig: {
		preset: 1,
		bitrate: 2000000,
		profile: 1,
		fps: 30,
		videoFrontMirror: true,
	},
	audioConfig: {
		bitrate: 128000,
		profile: 1,
		samplerate: 44100,
	},
}
const VideoCall: React.FC<any> = ({ route }: { route: { params: any } }) => {
	const dispatch = useDispatch()
	const cameraViewRef = useRef<any>()
	const alertRef = useRef<any>()
	useEffect(() => {
		cameraViewRef.current.start()
		return () => {
			if (cameraViewRef) cameraViewRef.current.stop()
		}
	}, [])

	const EndCall = () => {
		alertRef?.current?.open()
	}
	return (
		<View style={styles.container}>
			<StatusBarView backgroundColor={colors.white} />

			<View style={styles.view}>
				<NodeCameraView
					style={styles.camera}
					ref={cameraViewRef}
					outputUrl={route?.params?.link}
					camera={config.cameraConfig}
					audio={config.audioConfig}
					video={config.videoConfig}
					autopreview={true}
				/>
				<View style={{ flex: 1, position: 'absolute' }}>
					<TouchableOpacity onPress={EndCall}>
						<Image source={images.ic_close_camera} style={Style.icon48} />
					</TouchableOpacity>
				</View>
				<View style={styles.bages}>
					<Text style={styles.txtLive}>Live</Text>
				</View>
				<View style={styles.icSwitch}>
					<TouchableOpacity onPress={() => cameraViewRef?.current?.switchCamera()}>
						<Image source={images.ic_switch_camera} style={Style.icon40} />
					</TouchableOpacity>
				</View>
			</View>
			<AlertEndVideo
				ref={alertRef}
				onPress={() => {
					alertRef?.current?.close()
					dispatch(getDetailDeliveryAcceptAction(route?.params?.data?.id))
					dispatch(getListDeliveryAction())
					setTimeout(() => {
						cameraViewRef.current.stop()
						goBack()
					}, 500)
				}}
			/>
		</View>
	)
}

export default VideoCall
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	view: {
		borderRadius: sizes.s16,
		flex: 1,
	},
	camera: {
		width: width,
		height: height,
		overflow: 'hidden',
	},
	icSwitch: {
		position: 'absolute',
		bottom: sizes.s16,
		right: sizes.s10,
	},
	bages: {
		position: 'absolute',
		top: sizes.s10,
		right: sizes.s10,
		paddingVertical: sizes.s4,
		paddingHorizontal: sizes.s12,
		backgroundColor: colors.red,
		borderRadius: sizes.s32,
	},
	txtLive: {
		...Style.txt16,
		color: colors.white,
	},
})
