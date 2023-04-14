/* eslint-disable unused-imports/no-unused-vars */
import { useIsFocused } from '@react-navigation/native';
import {
	getBankAccountSuccess,
	getProfileAction,
	getUserBalanceAction,
	logOutAction,
	updateProfileAction,
} from 'action/authenAction';
import { getReviewUserAction } from 'action/deliveriesAction';
import { colors, images, sizes, Style } from 'assets';
import {
	AvatarProfile,
	BottomSheet,
	Button,
	Headers,
	ParagraphInput,
	SubmitButton,
	Switch,
} from 'components';
import _ from 'lodash';
import { navigate, navigateReset, naviPush } from 'navigationRef';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useDispatch, useSelector } from 'react-redux';
import { bankAccountSelector, userSelector } from 'selector/authenSelector';
import { listReviewSelector } from 'selector/deliveriesSelector';
import { keyAsyncStorage, removeStoreData } from 'utils/AsyncStorage';
import { SCREENNAME, STACKNAME } from 'utils/constant';
import { API_URL } from 'utils/https';

const SettingArr = [
	{ id: 11, title: 'Setting', screen: SCREENNAME.SETTING },
	{ id: 12, title: 'Privacy Policy', screen: SCREENNAME.PRIVACY_POLICY },
	{ id: 13, title: 'Term Of Service', screen: SCREENNAME.TERM_OF_SERVICE },
];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Profile: React.FC = ({ route, navigation }: any) => {
	const [activeGG, setAtiveGG] = useState<boolean>(false);
	const [activeFB, setAtiveFB] = useState<boolean>(false);
	const [description, setDescription] = useState<string>('');
	const bankAccount = useSelector(bankAccountSelector);
	const userData = useSelector(userSelector);
	const dataReview = useSelector(listReviewSelector);
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const aboutRef = useRef<any>();
	const logoutRef = useRef<any>();
	useEffect(() => {
		isFocused && getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFocused]);
	const getData = () => {
		dispatch(getReviewUserAction(userData._id));
		dispatch(getUserBalanceAction(userData.id));
		dispatch(getProfileAction());
	};
	useEffect(() => {
		if (userData.provider === 'google') {
			setAtiveGG(true);
		} else if (userData.provider === 'facebook') {
			setAtiveFB(true);
		} else {
			setAtiveGG(false);
			setAtiveFB(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const openEditAboutModal = () => {
		setDescription(userData.description);
		aboutRef.current.open();
	};

	const updateDescription = () => {
		aboutRef.current.close(() =>
			dispatch(
				updateProfileAction({
					id: userData._id,
					description: description?.trim(),
					stayHere: true,
				}),
			),
		);
	};

	const logOut = () => {
		logoutRef.current.close();
		dispatch(logOutAction());
		removeStoreData(keyAsyncStorage.isLogedIn);
		removeStoreData(keyAsyncStorage.authToken);
		removeStoreData(keyAsyncStorage.profile);
		dispatch(getBankAccountSuccess(null));
		setTimeout(() => {
			navigateReset(STACKNAME.AUTHENTICATION);
		}, 500);
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const numberStart: any = _.meanBy(dataReview, (e) => e.star);
	return (
		<View style={Style.container}>
			<Headers title="My Profile" />
			<AvatarProfile
				name={userData.name === '' ? userData.username : userData.name}
				rate={userData?.rating || 0}
				avatar={userData.avatar && API_URL + userData.avatar}
			/>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingVertical: sizes.s32 }}>
				<View>
					<View style={Style.row_between}>
						<Text style={styles.title}>About me</Text>
						<TouchableOpacity
							style={{ paddingHorizontal: sizes.s24 }}
							onPress={openEditAboutModal}>
							<Image source={images.ic_edit} style={Style.icon24} />
						</TouchableOpacity>
					</View>
					<Text style={[Style.txt14_secondary, Style.top8, Style.paddingHorizontal]}>
						{userData?.description}
					</Text>
					<BottomSheet ref={aboutRef} style={styles.modalAbout} title={'About me'}>
						<View>
							<ParagraphInput
								autoFocus
								label="Description"
								style={[Style.marginHorizontal, Style.marginVertical]}
								value={description}
								onChangeText={setDescription}
							/>
							<SubmitButton title="Update" onPress={updateDescription} />
						</View>
					</BottomSheet>
				</View>

				<View style={styles.break} />

				<View style={[Style.row_between, Style.paddingHorizontal]}>
					<Text style={Style.txt16}>Review</Text>
					<View style={styles.numberReview}>
						<Text style={Style.txt14}>{`${dataReview.length} reviews`}</Text>
					</View>
				</View>
				{dataReview.map((item) => (
					<TouchableOpacity
						onPress={() => {
							naviPush(SCREENNAME.PROFILE_ANOTHER, item);
						}}
						key={item?.id}
						style={[Style.row_start, Style.paddingHorizontal, Style.top24]}>
						<FastImage
							source={{
								uri: item?.owner?.avatar
									? API_URL + item?.owner?.avatar
									: images.no_img_uri,
							}}
							style={Style.icon32_radius}
						/>
						<View style={[Style.left12, Style.flex]}>
							<View style={Style.row_between}>
								<Text style={Style.txt12}>{item?.owner?.name}</Text>
								<View style={Style.row}>
									{[...Array(5)].map((x, idx) => (
										<Image
											key={item?.id}
											source={
												idx < item.star ? images.ic_star_rated : images.ic_star_unrate
											}
											style={[Style.icon16, Style.left4]}
										/>
									))}
								</View>
							</View>
							<Text style={[Style.txt12_secondary, Style.top4]}>{item?.comment}</Text>
						</View>
					</TouchableOpacity>
				))}

				<View style={styles.break} />

				<Text style={styles.title}>Linked Accounts</Text>
				<View style={[Style.row_between, Style.paddingHorizontal, Style.top16]}>
					<Text style={Style.txt16_primary_text}>Google</Text>
					<Switch
						active={activeGG}
						onChange={() => {
							if (userData.provider === 'google') {
								Alert.alert('Warning', 'You can not unlink account google');
							} else {
								Alert.alert('Warning', 'You can not link account google');
							}
						}}
					/>
				</View>

				<View style={[Style.row_between, Style.paddingHorizontal, Style.top16]}>
					<Text style={Style.txt16_primary_text}>Facebook</Text>
					<Switch
						active={activeFB}
						onChange={() => Alert.alert('Warning', 'You can not link account facebook')}
					/>
				</View>
				<View style={styles.break} />

				{SettingArr.map((item, idx) => (
					<TouchableOpacity
						key={item?.id}
						activeOpacity={0.7}
						onPress={() => navigate(item.screen)}
						style={[Style.row_between, Style.paddingHorizontal, idx > 0 && styles.borderTop]}>
						<Text style={Style.txt16}>{item.title}</Text>
						<Image source={images.ic_arrow_right} style={Style.icon24} />
					</TouchableOpacity>
				))}
				<View style={styles.break} />
				<Button
					title="Log Out"
					styles={Style.marginHorizontal}
					onPress={() => logoutRef?.current?.open()}
				/>
				<Text
					style={[
						Style.txt12_disable,
						Style.top16,
						Style.txtCenter,
					]}>{`Version ${Config.VERSION_NAME} (${Config.VERSION_CODE})`}</Text>
				<Text style={[Style.txt12_disable, Style.top4, Style.txtCenter]}>{'Snap4me'}</Text>
				<BottomSheet ref={logoutRef} style={styles.bts} hideTitle>
					<Text style={Style.txt16}>Are you sure you want to log out? </Text>
					<Text style={[Style.txt14_secondary, Style.top8, Style.fontRegular]}>
						You’ll have to log in again if you want to use Snap4me
					</Text>
					<Button
						title="Log Out"
						textColor={colors.white}
						styles={{ backgroundColor: colors.error, marginTop: sizes.s44 }}
						onPress={logOut}
					/>
				</BottomSheet>
			</ScrollView>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	break: {
		height: sizes.s8,
		backgroundColor: colors.background,
		marginVertical: sizes.s24,
	},
	numberReview: {
		paddingHorizontal: sizes.s4,
		backgroundColor: colors.background,
		borderRadius: sizes.s4,
	},
	title: {
		...Style.txt16,
		...Style.paddingHorizontal,
	},
	borderTop: {
		paddingTop: sizes.s16,
		borderTopColor: colors.background,
		borderTopWidth: sizes.s1,
		marginTop: sizes.s16,
	},
	bts: {
		paddingTop: sizes.s32,
		paddingBottom: getBottomSpace() + sizes.s54,
		paddingHorizontal: sizes.s24,
	},
	modalAbout: {},
});
