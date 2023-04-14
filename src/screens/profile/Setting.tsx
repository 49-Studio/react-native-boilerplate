/* eslint-disable react-hooks/exhaustive-deps */
import { getProfileAction } from 'action/authenAction';
import authApi from 'api/authApi';
import { colors, images, sizes, Style } from 'assets';
import { BottomSheet, HeaderWhite, Loading } from 'components';
import _ from 'lodash';
import { navigate, navigateReset } from 'navigationRef';
import React, { useEffect, useRef } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'selector/authenSelector';
import { SCREENNAME, STACKNAME } from 'utils/constant';

const Setting: React.FC = () => {
	const profileData = useSelector(userSelector);
	const deleteAccountRef = useRef<any>();
	const dispatch = useDispatch();

	const deleteAccount = () => {
		Alert.alert(
			'Delete Account',
			'Once you delete account, there is no getting it back. Make you sure want to do this',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Yes',
					onPress: async () => {
						Loading.show();
						await authApi.deleteAccount(profileData._id);
						Loading.hide();
						navigateReset(STACKNAME.AUTHENTICATION);
					},
				},
			],
		);
	};

	const changePassword = () => {
		if (profileData.provider === 'facebook' || profileData.provider === 'google') {
			Alert.alert('Warning', 'Account has not password!');
		} else {
			navigate(SCREENNAME.CHANGE_PASSWORD);
		}
	};

	const updateProfile = async () => {
		navigate(SCREENNAME.FROM_STRIPE);
	};

	// const changeCurrency = () => navigate(SCREENNAME.CHANGE_CURRENCY);

	useEffect(() => {
		dispatch(getProfileAction());
	}, []);

	return (
		<View style={Style.container}>
			<HeaderWhite title="Setting" />
			<Text style={[Style.top32, Style.txt16, Style.paddingHorizontal]}>Mobile Number</Text>
			<View style={[Style.paddingHorizontal, Style.top16, Style.row_between]}>
				{!_.isNil(profileData.phone) ? (
					<Text style={[Style.txt16_primary_text]}>
						{profileData?.country_code + ' ' + profileData?.phone}
					</Text>
				) : (
					<Text style={[Style.txt16_primary_text, { color: colors.error }]}>
						Update phone number !
					</Text>
				)}

				<TouchableOpacity
					style={[Style.row, Style.paddingHorizontal]}
					onPress={() => navigate(SCREENNAME.CHANGE_MOBILE_NUMBER)}>
					<Image source={images.ic_edit} />
					<Text style={Style.txt14_primary}> Edit</Text>
				</TouchableOpacity>
			</View>
			{profileData?.provider === 'local' && (
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={changePassword}
					style={[Style.row_between, Style.paddingHorizontal, styles.borderTop]}>
					<Text style={Style.txt16}>{'Change Password'}</Text>
					<Image source={images.ic_arrow_right} style={Style.icon24} />
				</TouchableOpacity>
			)}

			{/* <TouchableOpacity
				activeOpacity={0.7}
				onPress={changeCurrency}
				style={[Style.row_between, Style.paddingHorizontal, styles.borderTop]}>
				<Text style={Style.txt16}>{'Currency'}</Text>
				<View style={Style.row}>
					<Text style={[Style.txt16_secondary, Style.right12]}>{profileData.currency}</Text>
					<Image source={images.ic_arrow_right} style={Style.icon24} />
				</View>
			</TouchableOpacity> */}

			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => deleteAccountRef.current.open()}
				style={[Style.row_between, Style.paddingHorizontal, styles.borderTop]}>
				<Text style={Style.txt16}>{'Delete Account'}</Text>
				<Image source={images.ic_arrow_right} style={Style.icon24} />
			</TouchableOpacity>

			<TouchableOpacity
				activeOpacity={0.7}
				onPress={updateProfile}
				style={[Style.row_between, Style.paddingHorizontal, styles.borderTop]}>
				<Text style={Style.txt16}>Update Bank Account Details</Text>
				<Image source={images.ic_arrow_right} style={Style.icon24} />
			</TouchableOpacity>

			<BottomSheet ref={deleteAccountRef} hideTitle>
				<Image source={images.ic_trash} style={styles.ic_trash} />
				<Text style={[Style.txt16, Style.txtCenter]}>
					Are you sure you want to{'\n'}delete the account?
				</Text>
				<Text style={styles.subtitle}>
					This action can’t be undone. When you delete all your data, it will be erased from
					our system.
				</Text>
				<View
					style={[
						Style.row_between,
						Style.left24,
						Style.right24,
						Style.top32,
						Style.bottom32,
					]}>
					<TouchableOpacity
						style={[styles.btn]}
						onPress={() => deleteAccountRef.current.close(deleteAccount)}>
						<Text style={Style.txt16_white}>Delete</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => deleteAccountRef.current.close()}
						style={[
							styles.btn,
							{
								backgroundColor: colors.white,
								borderWidth: sizes.s2,
								borderColor: colors.dividers,
							},
						]}>
						<Text style={Style.txt16}>Cancel</Text>
					</TouchableOpacity>
				</View>

				<SafeAreaView />
			</BottomSheet>
		</View>
	);
};

export default Setting;

const styles = StyleSheet.create({
	borderTop: {
		paddingTop: sizes.s16,
		borderTopColor: colors.background,
		borderTopWidth: sizes.s1,
		marginTop: sizes.s16,
	},
	ic_trash: {
		width: sizes.s200,
		height: sizes.s200,
		alignSelf: 'center',
		marginBottom: sizes.s16,
	},
	subtitle: {
		...Style.txt14_secondary,
		...Style.fontRegular,
		paddingHorizontal: sizes.s38,
		...Style.txtCenter,
		...Style.top8,
	},
	btn: {
		backgroundColor: colors.error,
		width: '47%',
		paddingVertical: sizes.s12,
		alignItems: 'center',
		borderRadius: sizes.s24,
	},
});
