import CameraRoll from '@react-native-community/cameraroll';
import { colors, images, sizes, Style } from 'assets';
import _ from 'lodash';
import { Files } from 'models';
import { navigate } from 'navigationRef';
import React, { useRef, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import RNFetchBlob from 'rn-fetch-blob';
import { SCREENNAME } from 'utils/constant';
import { writeStoragePermission } from 'utils/function';
import { API_URL } from 'utils/https';

import MediaView from './MediaView';

interface Props {
	content?: string;
	type?: 'SELF' | 'GUEST';
	avatar?: string;
	media: Files[];
	typeRequest: 'photo_album' | 'video' | 'livestream' | '';
	playback_url?: string;
}
const Comment: React.FC<Props> = (props: Props) => {
	const [loading, setLoading] = useState<boolean>(false);
	const mediaRef = useRef<any>();

	const renderMedia = () => {
		switch (props?.typeRequest) {
			case 'photo_album':
				return (
					<TouchableOpacity activeOpacity={1} onPress={onPressMessage}>
						<FlatList
							numColumns={2}
							keyExtractor={(item, index) => String(index)}
							data={props.media || []}
							renderItem={({ item, index }) => {
								if (index < 4)
									return (
										<FastImage
											key={index}
											source={{ uri: API_URL + item.url }}
											style={[
												styles.image,
												index % 2 != 0 && Style.left8,
												index >= 2 && Style.top8,
											]}>
											{Boolean(index == 3 && props?.media?.length > 4) && (
												<LinearGradient
													style={styles.linearGradient}
													colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.87)']}>
													<Text style={Style.txt16_white}>{`+${
														props.media?.length - 4
													}`}</Text>
												</LinearGradient>
											)}
										</FastImage>
									);
								return <></>;
							}}
						/>
					</TouchableOpacity>
				);
			case 'video':
				return (
					<TouchableOpacity activeOpacity={1} onPress={onPressMessage}>
						<FastImage
							source={{
								uri: 'https://oetonline.net.au/pluginfile.php/45208/mod_resource/content/1/video_icon.png',
							}}
							style={[styles.video]}
						/>
					</TouchableOpacity>
				);
			case 'livestream':
				return (
					<TouchableOpacity
						activeOpacity={1}
						style={[styles.image, { justifyContent: 'center', alignItems: 'center' }]}
						onPress={onPressMessage}>
						<View style={styles.liveBackground}>
							<Text style={Style.txt16_white}>Live</Text>
						</View>
					</TouchableOpacity>
				);
			default:
				return;
		}
	};

	const onPressMessage = () => {
		if (props.typeRequest !== 'livestream') {
			if (!_.isEmpty(props.media)) {
				mediaRef.current.open();
			}
		} else {
			if (props.type === 'GUEST') {
				navigate(SCREENNAME.PLAY_BACK_VIDEO, { link: props.playback_url });
			}
		}
	};

	const renderIconDownload = () => {
		if (props?.media?.[0]?.mime?.includes('image') || props?.media?.[0]?.mime?.includes('video'))
			return (
				<TouchableOpacity onPress={saveMediaToGallery} style={styles.iconDownload}>
					{loading ? (
						<ActivityIndicator color={colors.primary} />
					) : (
						<Image source={images.ic_download} style={Style.icon48} />
					)}
				</TouchableOpacity>
			);
	};

	const saveMediaToGallery = async () => {
		await writeStoragePermission();
		if (props?.media?.[0]?.mime?.includes('image')) {
			props.media?.forEach((item) => {
				downloadImage(API_URL + item?.url);
			});
		}
		//////////////////////////////////
		else if (props?.media?.[0]?.mime?.includes('video')) {
			downloadImage(API_URL + props?.media?.[0]?.url);
		}
	};

	const downloadImage = (url: string) => {
		if (Platform.OS === 'ios') {
			CameraRoll.save(url, { type: 'auto' });
			Alert.alert('Success', 'Media Downloaded Successfully.');
			return;
		}
		// To add the time suffix in filename
		let date = new Date();
		// Image URL which we want to download
		// Getting the extention of the file
		let ext: any = getExtention(url);
		ext = '.' + ext[0];
		// Get config and fs from RNFetchBlob
		// config: To pass the downloading related options
		// fs: Directory path where we want our image to download
		const { config, fs } = RNFetchBlob;
		let PictureDir = fs.dirs.PictureDir;
		let options = {
			fileCache: true,
			addAndroidDownloads: {
				// Related to the Android only
				useDownloadManager: true,
				notification: true,
				path: PictureDir + '/media_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
				description: 'Image',
			},
		};
		config(options)
			.fetch('GET', url)
			.then((res) => {
				// Showing alert after successful downloading
				Alert.alert('Success', 'Media Downloaded Successfully.');
			});
	};
	const getExtention = (filename: string) => {
		// To get the file extension
		return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : '';
	};
	const paddingMedia = !_.isEmpty(props.media) && { padding: sizes.s8 };

	return (
		<>
			{/* //message myself*/}
			{props.type === 'SELF' ? (
				<View style={[styles.containerself, paddingMedia]}>
					{!_.isEmpty(props.media) || props.content === props.playback_url ? (
						renderMedia()
					) : (
						<Text style={[styles.txtContent, { color: colors.white }]}>{props?.content}</Text>
					)}
				</View>
			) : (
				//message of other people
				<>
					<View style={[Style.row_end]}>
						<FastImage
							source={{ uri: props.avatar }}
							style={[Style.icon32_radius, { marginRight: sizes.s12 }]}
						/>
						<View style={[styles.container, paddingMedia]}>
							{!_.isEmpty(props.media) || props.content === props.playback_url ? (
								renderMedia()
							) : (
								<Text style={[styles.txtContent]}>{props?.content}</Text>
							)}
						</View>
						{renderIconDownload()}
					</View>
				</>
			)}
			<MediaView ref={mediaRef} media={props.media} />
		</>
	);
};

export default React.memo(Comment);

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primary50,
		borderTopLeftRadius: sizes.s16,
		borderTopRightRadius: sizes.s16,
		borderBottomRightRadius: sizes.s16,
		padding: sizes.s16,
		marginTop: sizes.s16,
		...Style.shadow10,
		marginRight: sizes.s40,
	},
	containerself: {
		backgroundColor: colors.primary,
		borderTopLeftRadius: sizes.s16,
		borderTopRightRadius: sizes.s16,
		borderBottomLeftRadius: sizes.s16,
		padding: sizes.s16,
		marginTop: sizes.s16,
		alignSelf: 'flex-end',
		marginLeft: sizes.s48,
		flex: 1,
	},
	txtNickName: {
		...Style.txt16,
		marginBottom: sizes.s8,
	},
	txtContent: {
		...Style.txt16_regular,
	},
	image: {
		...Style.icon64,
		borderRadius: sizes.s8,
	},
	video: {
		width: sizes.s105,
		height: sizes.s105,
		borderRadius: sizes.s8,
	},
	liveBackground: {
		backgroundColor: colors.error,
		paddingVertical: sizes.s4,
		paddingHorizontal: sizes.s12,
		borderRadius: sizes.s32,
	},
	linearGradient: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	iconDownload: {
		marginLeft: -sizes.s40,
	},
});
