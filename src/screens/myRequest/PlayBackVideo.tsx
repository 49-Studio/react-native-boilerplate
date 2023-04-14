import { colors, images, sizes, Style } from 'assets'
import { AlertEndVideo, StatusBarView } from 'components'
import { goBack } from 'navigationRef'
import React, { useEffect, useRef } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NodePlayerView } from 'react-native-nodemediaclient'
const { width, height } = Dimensions.get('window')

const PlayBackVideo: React.FC<any> = ({ route }: { route: { params: any } }) => {
	const config = {
		cameraConfig: {
			cameraId: 1,
			cameraFrontMirror: true,
		},
		videoConfig: {
			preset: 4,
			bitrate: 2000000,
			profile: 2,
			fps: 30,
			videoFrontMirror: true,
		},
		audioConfig: {
			bitrate: 128000,
			profile: 1,
			samplerate: 44100,
		},
	}
	const videoViewRef = React.useRef<any>(null)
	const alertRef = useRef<any>()
	useEffect(() => {
		videoViewRef?.current.start()
		return () => {
			if (videoViewRef) videoViewRef.current?.stop()
		}
	}, [])
	const EndCall = () => {
		alertRef?.current?.open()
	}
	return (
		<View style={styles.container}>
			<StatusBarView backgroundColor={colors.white} />

			<View>
				<NodePlayerView
					style={{ height: height }}
					ref={videoViewRef}
					inputUrl={route?.params?.link}
					scaleMode={'ScaleAspectFit'}
					bufferTime={300}
					maxBufferTime={1000}
					autoplay={true}
				/>
				<View style={{ flex: 1, position: 'absolute' }}>
					<TouchableOpacity onPress={EndCall}>
						<Image source={images.ic_close_camera} style={Style.icon48} />
					</TouchableOpacity>
				</View>
			</View>
			<AlertEndVideo
				ref={alertRef}
				onPress={() => {
					alertRef?.current?.close()
					videoViewRef.current.stop()
					videoViewRef.current.pause()
					goBack()
				}}
			/>
		</View>
	)
}

export default PlayBackVideo
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	camera: {
		borderRadius: sizes.s16,
		width: width,
		height: height,
		overflow: 'hidden',
	},
})
