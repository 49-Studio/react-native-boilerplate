import authApi from 'api/authApi';
import { colors, fonts, images, sizes } from 'assets';
import { Button, StatusBarView } from 'components';
import { isEmpty } from 'lodash';
import { goBack, navigateReset } from 'navigationRef';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { userSelector } from 'selector/authenSelector';
import { keyAsyncStorage, removeStoreData } from 'utils/AsyncStorage';
import { STACKNAME, userInfo } from 'utils/constant';

const CongratScreen: React.FC<any> = ({ route }: any) => {
	const type = route?.params?.type;

	const userData = useSelector(userSelector);
	useEffect(() => {
		updateTokenFcm();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const updateTokenFcm = async () => {
		if (!isEmpty(userData._id)) {
			try {
				await authApi.updateProfile({
					id: userData._id,
					fcm_token: userInfo.tokenFCM,
				});
			} catch (error: any) {
				return;
			}
		}
		return;
	};

	return (
		<View style={styles.container}>
			<StatusBarView backgroundColor={colors.white} />
			<TouchableOpacity
				onPress={() => {
					removeStoreData(keyAsyncStorage.isLogedIn);
					goBack();
				}}>
				<Image
					source={images.ic_close}
					style={{
						width: sizes.s24,
						height: sizes.s24,
						marginLeft: sizes.s16,
						marginTop: sizes.s16,
					}}
				/>
			</TouchableOpacity>
			<View style={styles.content}>
				<Image source={images.ic_congrat} style={styles.imagesCongrat} />
				{type === 'login' ? (
					<>
						<Text style={styles.title}>Yay! Welcome Back</Text>
						<Text style={styles.subTitle}>Welcome back to Snap4me App!</Text>
					</>
				) : (
					<>
						<Text style={styles.title}>Registration Successful!</Text>
					</>
				)}
			</View>
			<Button
				title="Back to home"
				onPress={() =>
					type === 'register'
						? navigateReset(STACKNAME.AUTHENTICATION)
						: navigateReset(STACKNAME.HOME)
				}
				styles={styles.button}
			/>
		</View>
	);
};

export default CongratScreen;
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
		fontSize: sizes.s24,
		fontWeight: '700',
		lineHeight: sizes.s32,
		marginTop: sizes.s8,
		color: colors.black,
	},
	subTitle: {
		fontSize: sizes.s16,
		fontFamily: fonts.regular,
		lineHeight: sizes.s24,
		color: colors.secondary_text,
		textAlign: 'center',
	},
	imagesCongrat: {
		width: sizes.s137,
		height: sizes.s132,
		alignSelf: 'center',
		marginBottom: sizes.s32,
	},
	button: {
		position: 'absolute',
		bottom: sizes.s60,
		marginHorizontal: sizes.s24,
	},
});
