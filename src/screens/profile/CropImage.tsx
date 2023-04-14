import { updateAvatarAction } from 'action/authenAction';
import { colors, screenWidth, sizes, Style } from 'assets';
import { ButtonSubmit2, HeaderWhite } from 'components';
import { goBack, navigate } from 'navigationRef';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Crop from 'react-native-avatar-crop';
import { useDispatch } from 'react-redux';
import { SCREENNAME } from 'utils/constant';

const CropImage: React.FC<any> = ({ image }: any) => {
	const dispatch = useDispatch();

	let crop = async (quality?: number) => ({ uri: '', width: 0, height: 0 });
	const saveCrop = async () => {
		const cropped = await crop();
		const img = {
			...image,
			uri: cropped?.uri,
		};
		dispatch(updateAvatarAction(img));
		navigate(SCREENNAME.PROFILE, { avatar: cropped?.uri });
	};

	return (
		<View style={Style.container}>
			<HeaderWhite title="Select Photo" iconClose showBorder />
			<ScrollView contentContainerStyle={styles.center}>
				<Crop
					source={{
						uri: image?.uri,
					}}
					width={screenWidth - sizes.s48}
					height={screenWidth - sizes.s48}
					borderWidth={0}
					cropArea={{ width: screenWidth / 1.3, height: screenWidth / 1.3 }}
					onCrop={(cropCallback: any) => (crop = cropCallback)}
				/>
			</ScrollView>
			<ButtonSubmit2
				titleLeft="Cancel"
				titleRight="Save"
				onPressLeft={goBack}
				onPressRight={saveCrop}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white,
	},
});
export default CropImage;
