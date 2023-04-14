/* eslint-disable unused-imports/no-unused-vars */
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { getProfileAction } from 'action/authenAction';
import { createDeliveryAction } from 'action/deliveriesAction';
import authApi from 'api/authApi';
import requestApi from 'api/requestApi';
import { colors, fonts, images, screenWidth, sizes, Style } from 'assets';
import { AcceptRequestButton, Header, Loading } from 'components';
import { format } from 'date-fns';
import _ from 'lodash';
import { LinkStripe } from 'models';
import { navigate, naviPush } from 'navigationRef';
import React, { useEffect, useRef } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { isGuestUserSelector, rateCurrencySelector, userSelector } from 'selector/authenSelector';
import { detailDeliverySelector } from 'selector/deliveriesSelector';
import { detailRequestSelector } from 'selector/requestSelector';
import { SCREENNAME } from 'utils/constant';
import { requestType } from 'utils/data';
import { dateFromNow } from 'utils/function';
import { API_URL, DYNAMIC_LINK } from 'utils/https';

const DetailJob: React.FC = () => {
	const detailRequest = useSelector(detailRequestSelector);
	const userData = useSelector(userSelector);
	const isGuestUser = useSelector(isGuestUserSelector);
	const detail = useSelector(detailDeliverySelector);
	const isAccepted = _.find(detail, (e) => e.owner?.id === userData.id);
	const rateCurrency = useSelector(rateCurrencySelector);
	const webStringRef = useRef<any>(null);
	const dispatch = useDispatch();
	useEffect(() => {
		updateViewer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const updateViewer = () => {
		// update viewer request
		if (userData?._id !== detailRequest.owner?.id) {
			requestApi.updateView({ id: detailRequest?.id, viewer: ++detailRequest.viewer });
		} else {
			return null;
		}
	};
	const viewMap = () => {
		navigate(SCREENNAME.LOCATION, {
			location: detailRequest.address,
			coordinate: {
				latitude: detailRequest.lat,
				longitude: detailRequest.long,
			},
		});
	};

	const addToFavorite = (like: boolean) => {
		like
			? requestApi.addRequestToFavorite(detailRequest.id).then((res) => {
					dispatch(getProfileAction());
			  })
			: requestApi.removeRequestToFavorite(detailRequest.id).then((res) => {
					dispatch(getProfileAction());
			  });
	};
	const generateLink = async () => {
		try {
			const config: any = {
				link: `${DYNAMIC_LINK}/app?success=true`,
				ios: {
					bundleId: 'com.app.virtualeverywhere',
					appStoreId: '1623432620',
				},
				android: {
					packageName: 'com.app.virtualeverywhere',
				},
				domainUriPrefix: DYNAMIC_LINK,
				navigation: {
					forcedRedirectEnabled: true,
				},
			};
			const link = await dynamicLinks().buildShortLink(config);

			return link;
		} catch (error) {
			console.log(error, 'ERROR');
		}
	};
	const acceptRequest = async () => {
		try {
			Loading.show();
			// const link = await generateLink();
			const res: LinkStripe = await authApi.createStripeAccount();
			if (!res?.data?.is_onboard && detailRequest.budget > 0) {
				webStringRef.current = res?.data?.url;
				Alert.alert(
					'Alert',
					'In order to accept jobs, your wallet needs to be linked to a bank account. Set it up now?',
					[
						{ text: 'Cancel' },
						{
							text: 'Ok',
							onPress: () => navigate(SCREENNAME.FROM_STRIPE),
						},
					],
				);
				Loading.hide();
			} else {
				throw 'createDeliveryAction';
			}
		} catch (error: any) {
			console.log(error);
			if (error === 'createDeliveryAction') {
				dispatch(
					createDeliveryAction({
						request: detailRequest.id,
						owner: userData.id,
						status: 'awaiting_request_confirmation',
						requester_status: 'awaiting_delivery',
					}),
				);
			} else {
				Alert.alert('Error', error?.message);
				Loading.hide();
			}
		} finally {
			Loading.hide();
		}
	};

	return (
		<View style={Style.container}>
			<Header isShowBack />
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollview}>
				<Text style={Style.h1} numberOfLines={2}>
					{detailRequest?.name}
				</Text>
				<Text style={styles.requestDate}>
					{`Request ${dateFromNow(detailRequest?.createdAt)} by `}
					<Text
						onPress={() => {
							if (userData._id !== detailRequest.owner?.id) {
								naviPush(SCREENNAME.PROFILE_ANOTHER, detailRequest);
							}
						}}
						style={{
							color: colors.primary,
						}}>{`${detailRequest?.owner?.name} (${detailRequest?.owner?.rating | 0})`}</Text>
				</Text>
				<View style={[Style.row_between, Style.top16]}>
					<View style={styles.tagType}>
						<Image
							source={
								detailRequest?.type == 'photo_album'
									? images.ic_filter_picture
									: detailRequest?.type == 'video'
									? images.ic_filter_video
									: images.ic_filter_live
							}
							style={styles.iconType}
						/>
						<Text style={Style.txt14_secondary}>
							{'  ' + requestType?.[detailRequest?.type] || ''}
						</Text>
					</View>
					<Text style={Style.h3_medium}>
						{`${userData?.currency || 'INR'} ` +
							(+detailRequest?.budget * rateCurrency).toFixed(2)}
					</Text>
				</View>
				{!_.isEmpty(detailRequest?.picture[0]?.url) ? (
					<FastImage
						source={{ uri: API_URL + detailRequest?.picture[0]?.url }}
						style={styles.image}
					/>
				) : (
					<FastImage source={{ uri: images.no_img_uri }} style={styles.image} />
				)}
				<View style={[styles.itemInfo, Style.top24]}>
					<Image style={Style.icon24} source={images.ic_map} />
					<Text style={styles.itemText} onPress={viewMap}>
						{detailRequest?.address}{' '}
						<Image source={images.ic_external} style={Style.icon24} />
					</Text>
				</View>
				{detailRequest?.type !== 'photo_album' ? (
					<>
						<View style={[styles.itemInfo]}>
							<Image style={Style.icon24} source={images.ic_timer} />
							<Text style={styles.itemText}>
								Duration {detailRequest?.duration / 60} min
							</Text>
						</View>
						{detailRequest?.type === 'livestream' && (
							<View style={[styles.itemInfo]}>
								<Image style={Style.icon24} source={images.ic_circle_red} />
								<Text style={[styles.itemText, { color: colors.error }]}>{'Live'}</Text>
							</View>
						)}
					</>
				) : (
					<View style={[styles.itemInfo]}>
						<Image style={Style.icon24} source={images.ic_album} />
						<Text
							style={
								styles.itemText
							}>{`Album size: ${detailRequest?.picture[0]?.width} x ${detailRequest?.picture[0]?.height}`}</Text>
					</View>
				)}
				<View style={[styles.itemInfo]}>
					<Image style={Style.icon24} source={images.ic_clock} />
					<Text style={styles.itemText}>{`Delivery time: ${format(
						new Date(detailRequest?.deadline),
						'hh a dd/MM/yyyy',
					)}`}</Text>
				</View>
				{Boolean(detailRequest?.description) && (
					<>
						<Text style={[Style.txt16, Style.top32]}>Description</Text>
						<View style={styles.description}>
							<Text style={styles.descriptionText}>{detailRequest?.description}</Text>
						</View>
					</>
				)}
			</ScrollView>
			{!isGuestUser && userData.id !== detailRequest.owner?.id && !isAccepted && (
				<AcceptRequestButton
					isLiked={detailRequest.is_favorite}
					acceptRequest={acceptRequest}
					addToFavorite={addToFavorite}
				/>
			)}
		</View>
	);
};

export default DetailJob;

const styles = StyleSheet.create({
	scrollview: {
		paddingVertical: sizes.s24,
		paddingHorizontal: sizes.s16,
	},
	requestDate: {
		...Style.txt14_secondary,
		marginTop: sizes.s8,
		fontFamily: fonts.regular,
	},
	tagType: {
		...Style.row,
		paddingVertical: sizes.s6,
		paddingHorizontal: sizes.s12,
		borderRadius: sizes.s23,
		borderWidth: sizes.s1,
		backgroundColor: colors.background_gray,
		borderColor: colors.border,
	},
	iconType: {
		...Style.icon20,
		tintColor: colors.secondary_text,
	},
	image: {
		width: screenWidth - sizes.s32,
		height: screenWidth - sizes.s32,
		marginTop: sizes.s24,
		borderRadius: sizes.s12,
	},
	itemInfo: {
		...Style.row,
		alignItems: 'flex-start',
		marginTop: sizes.s8,
	},
	itemText: {
		marginRight: sizes.s8,
		...Style.txt16,
		fontFamily: fonts.regular,
		color: colors.primary_text,
		flex: 1,
		marginLeft: sizes.s16,
	},
	description: {
		marginTop: sizes.s8,
		borderWidth: sizes.s1,
		borderColor: colors.border,
		borderRadius: sizes.s24,
		padding: sizes.s16,
	},
	descriptionText: {
		fontSize: sizes.s15,
		color: '#637381',
		fontFamily: fonts.regular,
		lineHeight: sizes.s24,
	},
});
