import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import FastImage from 'react-native-fast-image';
import { colors, images, sizes, Style } from 'assets';
import ImagePicker from 'components/imagePicker/ImagePicker';
import { navigate } from 'navigationRef';
import { SCREENNAME } from 'utils/constant';
import { useDispatch } from 'react-redux';
import { deleteAvatarAction } from 'action/authenAction';

interface Props {
	avatar: string;
	name: string;
	rate: number | string;
	disable?: boolean;
}
const AvatarProfile: React.FC<Props> = (props: Props) => {
	const [avatar, setAvatar] = useState<string>(props.avatar);
	const dispatch = useDispatch();

	//set new avatar after change
	useEffect(() => {
		setAvatar(props.avatar);
	}, [props.avatar]);

	const imgPickerRef = useRef<any>();
	const onPress = () => imgPickerRef.current.open();
	const onUpload = (image: any) => navigate(SCREENNAME.CROP_IMAGE, { image });
	const deleteAvatar = () => {
		dispatch(deleteAvatarAction());
	};
	return (
		<View style={styles.container}>
			{props?.disable ? (
				<TouchableOpacity activeOpacity={1} style={styles.border}>
					<FastImage
						source={{
							uri: avatar || images.no_img_uri,
						}}
						style={styles.img}
					/>
				</TouchableOpacity>
			) : (
				<TouchableOpacity activeOpacity={1} style={styles.border} onPress={onPress}>
					<FastImage
						source={{
							uri: avatar || images.no_img_uri,
						}}
						style={styles.img}
					/>
					<View style={styles.camera}>
						<Image source={images.ic_camera} style={Style.icon20} />
					</View>
				</TouchableOpacity>
			)}
			<ImagePicker ref={imgPickerRef} showDelete onDelete={deleteAvatar} onUpload={onUpload} />
			<Text style={[Style.h3_medium, Style.top16, Style.txtCenter]}>{props.name}</Text>
			<View style={{ alignItems: 'center' }}>
				<Text style={[Style.txt14_secondary, Style.txtCenter, Style.top4]}>
					<Image source={images.ic_star} style={Style.icon16} />
					{` ${props.rate}`}
				</Text>
			</View>
		</View>
	);
};

export default AvatarProfile;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginTop: -sizes.s50,
	},
	border: {
		borderRadius: sizes.s95,
		borderWidth: sizes.s5,
		borderColor: colors.white,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		width: sizes.s105,
		height: sizes.s105,
	},
	img: {
		width: sizes.s95,
		height: sizes.s95,
		borderRadius: sizes.s95,
	},
	camera: {
		padding: sizes.s6,
		backgroundColor: colors.primary,
		borderRadius: sizes.s30,
		position: 'absolute',
		bottom: 0,
		right: 0,
	},
});
