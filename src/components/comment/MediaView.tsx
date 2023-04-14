import { colors, screenWidth, sizes, Style } from 'assets'
import { Files } from 'models'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import {
	FlatList,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	SafeAreaView,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Video from 'react-native-video'
import { API_URL } from 'utils/https'

interface Props {
	ref: any
	media?: Files[]
}
const MediaView: React.FC<Props> = forwardRef((props: Props, ref: any) => {
	const [show, setShow] = useState<boolean>(false)
	const [uri, setUri] = useState<string>('')
	useImperativeHandle(ref, () => ({
		open: () => open(),
		close: () => close(),
	}))

	const open = () => {
		setUri(props?.media?.[0].url || '')
		setShow(true)
	}
	const close = () => {
		setShow(false)
	}
	const renderItem = ({ item, index }: any) => (
		<TouchableOpacity
			style={[Style.right8, Style.top32]}
			activeOpacity={0.9}
			onPress={() => setUri(item.url)}>
			<FastImage
				source={{ uri: API_URL + item.url }}
				style={[styles.image, uri == item && Style.icon72]}
			/>
		</TouchableOpacity>
	)
	const renderMediaView = () => {
		switch (props?.media?.[0]?.mime?.split('/')[0]) {
			case 'image':
				return (
					<>
						<FastImage source={{ uri: API_URL + uri }} style={styles.imageView} />
						<View style={{ alignItems: 'center' }}>
							<FlatList
								contentContainerStyle={{
									alignItems: 'flex-end',
									...Style.marginHorizontal,
								}}
								data={props.media || []}
								keyExtractor={(item, index) => String(index)}
								renderItem={renderItem}
								horizontal
								showsHorizontalScrollIndicator={false}
							/>
						</View>
					</>
				)
			case 'video':
				return (
					<Video
						source={{ uri: API_URL + props.media?.[0].url }}
						style={styles.video}
						controls={true}
						resizeMode="contain"
					/>
				)
			case 'live':
				return
			default:
				return
		}
	}
	return (
		<Modal
			visible={show}
			animationType="slide"
			statusBarTranslucent
			transparent
			onRequestClose={close}>
			<View style={styles.container}>
				{renderMediaView()}
				<TouchableOpacity onPress={close} style={styles.btn}>
					<Text style={Style.txt16}>Close</Text>
				</TouchableOpacity>
				<SafeAreaView />
			</View>
		</Modal>
	)
})

export default MediaView

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.9)',
		justifyContent: 'center',
	},
	imageView: {
		width: screenWidth - sizes.s32,
		height: screenWidth - sizes.s32,
		borderRadius: sizes.s16,
		alignSelf: 'center',
	},
	image: {
		...Style.icon64,
		borderRadius: sizes.s8,
		marginRight: sizes.s8,
	},
	btn: {
		paddingVertical: sizes.s10,
		paddingHorizontal: sizes.s32,
		borderRadius: sizes.s24,
		backgroundColor: colors.white,
		alignSelf: 'center',
		marginTop: sizes.s64,
	},
	video: {
		width: '100%',
		height: '60%',
		flex: 1,
		zIndex: 1,
	},
})
