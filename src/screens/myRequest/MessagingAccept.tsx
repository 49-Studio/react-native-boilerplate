import { getDetailDeliveryAcceptAction, getListDeliveryAction } from 'action/deliveriesAction';
import authApi from 'api/authApi';
import deliveriesApi from 'api/deliveriesApi';
import { uploadFilesApi } from 'api/uploadFilesApi';
import { colors, images, sizes, Style } from 'assets';
import {
	Comment,
	ImagePickerManager,
	ItemRequestPending,
	KeyboardAvoidingViews,
	Loading,
	StatusBarView,
	TextInputs,
} from 'components';
import { ListDelivery, User } from 'models';
import { goBack, navigate, naviPush } from 'navigationRef';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useDispatch, useSelector } from 'react-redux';
import { rateCurrencySelector, userSelector } from 'selector/authenSelector';
import { detailDeliveryAcceptSelector } from 'selector/deliveriesSelector';
import { SCREENNAME } from 'utils/constant';
import { TypeRequest } from 'utils/data';
import { API_URL } from 'utils/https';
import Permissions from 'utils/permission';

const MessagingAccept: React.FC<any> = ({ route }: { route: { params: ListDelivery } }) => {
	const data = route?.params;
	const [chat, setChat] = useState<string>('');
	const user = useSelector(userSelector);
	const dataDeliveries = useSelector(detailDeliveryAcceptSelector);
	const [requestOwner, setRequestOwner] = useState<User | null>(null);
	const [showRating, setShowRating] = useState<boolean>(true);
	const textinputRef = useRef<any>();
	const scrollRef = useRef<any>();
	const hideRating = () => setShowRating(false);
	const dispatch = useDispatch();
	const rateCurrency = useSelector(rateCurrencySelector);

	useEffect(() => {
		getRequestOwnerById();
		getDetailDelivery();
	}, []);

	useEffect(() => {
		scrollListToEnd();
	}, [dataDeliveries]);

	const scrollListToEnd = () => {
		setTimeout(() => {
			scrollRef.current.scrollToEnd();
		}, 100);
	};

	const onPressRating = () =>
		navigate(SCREENNAME.RATING_VIEW_REQUESTER, { id: dataDeliveries?.request?.owner });

	const getDetailDelivery = () => {
		dispatch(getDetailDeliveryAcceptAction(data.id));
	};

	const getRequestOwnerById = () => {
		authApi.getProfileId(data?.request?.owner).then((res: any) => setRequestOwner(res));
	};

	const TextStatus = ({ text, isComplete, isPending }: any) => (
		<View style={[Style.row_center, { marginTop: sizes.s16 }]}>
			{isComplete ? (
				<Image source={images.ic_completed} style={Style.icon16} />
			) : (
				<View style={[styles.dot, isPending && { backgroundColor: colors.error }]} />
			)}
			<Text
				style={[
					styles.txtStatus,
					isPending && { color: colors.error },
					isComplete && { color: colors.success },
				]}>
				{text}
			</Text>
		</View>
	);

	const deliveryStatus = () => {
		switch (dataDeliveries?.status) {
			case 'awaiting_request_confirmation':
				return <TextStatus text="Awaiting Request Confirmation" />;
			case 'pending_delivery':
				return <TextStatus text="Pending Delivery" isPending />;
			case 'pending_review':
				return <TextStatus text="Pending Review" isPending />;
			case 'pending_revision':
				return <TextStatus text="Pending Revision" isPending />;
			case 'completed':
				return <TextStatus text="Completed" isComplete />;
			default:
				return;
		}
	};
	const openImagePicker = () => {
		if (dataDeliveries?.request?.type !== 'livestream') {
			const libraryType = dataDeliveries?.request?.type === 'video' ? 'video' : 'photo';
			ImagePickerManager.launchLibrary(libraryType, onUploadMedia);
		} else {
			deliveriesApi
				.sendMessageFullfilRequest({
					delivery: dataDeliveries?.id,
					content: dataDeliveries?.playback_url,
				})
				.then((res: any) => {
					deliveriesApi.updateStatusReviewDeliveries(dataDeliveries?.id);
					Permissions.camera(() => {
						navigate(SCREENNAME.VIDEO_CALL, {
							link: dataDeliveries.livestream_url,
							data: data?.id,
						});
					});
					Permissions.microphone();
					getDetailDelivery();
					dispatch(getListDeliveryAction());
				})
				.catch(() => Alert.alert('Error', 'Can not send message'));
		}
	};

	const sendMessage = () => {
		setChat('');

		if (chat.trim().length === 0) {
			return;
		}
		const body = {
			delivery: dataDeliveries?.id,
			content: chat.trim(),
		};

		deliveriesApi
			.sendMessageFullfilRequest(body)
			.then((res: any) => {
				dataDeliveries?.messages?.push(res);
				getDetailDelivery();
				dispatch(getListDeliveryAction());
			})
			.catch(() => Alert.alert('Error', 'Can not send message'));
	};

	const onUploadMedia = (files?: Asset[]) => {
		Loading.show();
		uploadFilesApi.uploadMulti(files).then((res: any) => {
			const body = {
				content: '',
				delivery: dataDeliveries?.id,
				files: res?.map((e: any) => e.id),
			};
			deliveriesApi
				.sendMessageFullfilRequest(body)
				.then((res) => {
					deliveriesApi.updateStatusReviewDeliveries(dataDeliveries?.id).then(() => {
						dispatch(getDetailDeliveryAcceptAction(data.id));
					});
				})
				.catch(() => Alert.alert('Error', 'Can not send message'))
				.finally(() => {
					Loading.hide();
					dispatch(getListDeliveryAction());
				});
		});
	};

	const updateLoadView = () => (
		<View style={styles.uploadView}>
			<Text style={Style.txt14}>
				<Text style={[Style.txt14, { color: colors.red }]}>{data?.request?.delivery_time}</Text>{' '}
				Day Left
			</Text>
			<TouchableOpacity style={styles.btnUpload} onPress={openImagePicker}>
				<Text style={[Style.txt14, { color: colors.white }]}>
					{dataDeliveries?.request?.type === 'livestream' ? 'Go Live' : 'Upload'}
				</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<KeyboardAvoidingViews>
			{/* header */}
			<StatusBarView backgroundColor={colors.white} />
			<View style={[Style.row_center, { paddingVertical: sizes.s10 }]}>
				<TouchableOpacity onPress={() => goBack()} style={styles.btnBack}>
					<Image source={images.ic_close48} style={[Style.icon48]} />
				</TouchableOpacity>
				<Image
					source={{
						uri: requestOwner?.avatar ? API_URL + requestOwner?.avatar : images.no_img_uri,
					}}
					style={[Style.icon24_radius, { marginRight: sizes.s4 }]}
				/>
				<Text style={Style.txt16}>{requestOwner?.name || requestOwner?.username}</Text>
			</View>

			{/* Request */}
			<ScrollView
				ref={scrollRef}
				keyboardShouldPersistTaps={'handled'}
				keyboardDismissMode="none"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: sizes.s16 }}
				style={styles.body}>
				<ItemRequestPending
					image={API_URL + dataDeliveries?.request?.picture[0].url}
					title={dataDeliveries?.request?.name}
					address={dataDeliveries?.request?.address}
					type={TypeRequest.find((e) => e.type === dataDeliveries?.request?.type)?.title}
					price={dataDeliveries?.request?.budget}
					time={(dataDeliveries?.request?.duration || 60) / 60}
					disabled
					style={{ marginTop: sizes.s16, marginHorizontal: 0 }}
				/>
				{/* //status of delivery */}
				{deliveryStatus()}
				{/* // */}
				<View style={[Style.row_center, { marginTop: sizes.s24 }]}>
					<Text style={Style.txt16_regular}>
						<Text style={Style.txt16_secondary}>
							You have accepted{' '}
							<Text
								style={Style.txt16_primary}
								onPress={() => {
									naviPush(SCREENNAME.PROFILE_ANOTHER, {
										owner: requestOwner,
									});
								}}>
								{`${requestOwner?.name || requestOwner?.username}'s`}
							</Text>{' '}
							request
						</Text>
					</Text>
				</View>
				{dataDeliveries?.messages.map((item) => (
					<Comment
						key={'Message/' + item?.id}
						type={!item.is_from_requester ? 'SELF' : 'GUEST'}
						avatar={requestOwner?.avatar ? API_URL + requestOwner?.avatar : images.no_img_uri}
						content={item.content}
						media={item.files}
						typeRequest={dataDeliveries?.request?.type}
						playback_url={dataDeliveries.playback_url}
					/>
				))}
				{dataDeliveries?.status === 'pending_delivery' ||
				dataDeliveries?.status === 'pending_revision' ? (
					updateLoadView()
				) : (
					<></>
				)}
				{dataDeliveries?.requester_status === 'completed' && (
					<View style={styles.txtCompleted}>
						<Text style={[Style.txt14_primary_text]}>
							<Text style={[Style.txt14, { color: colors.primary }]}>
								{requestOwner?.name || requestOwner?.username}
							</Text>{' '}
							<Text style={Style.txt14}>
								has accepted your delivery{' '}
								<Text style={[Style.txt14, { fontWeight: 'bold' }]}>{`${
									user?.currency || 'INR'
								} ${(dataDeliveries?.request?.budget * rateCurrency).toFixed(
									2,
								)}`}</Text>{' '}
								has been automatically credited to you
							</Text>{' '}
							delivery
						</Text>
					</View>
				)}
				{Boolean(dataDeliveries?.requester_status === 'completed' && showRating) && (
					<TouchableOpacity activeOpacity={0.8} style={styles.rate} onPress={onPressRating}>
						<Text style={Style.txt14}>
							Give us your review <Image source={images.ic_star} style={Style.icon20} />
						</Text>
						<TouchableOpacity onPress={hideRating}>
							<Image source={images.ic_close2} style={Style.icon24} />
						</TouchableOpacity>
					</TouchableOpacity>
				)}
			</ScrollView>
			<View style={styles.viewInput}>
				<TextInputs
					style={{ backgroundColor: colors.background, borderWidth: 0 }}
					iconRight={images.ic_send}
					onPressIconRight={sendMessage}
					ref={textinputRef}
					label="Type message..."
					returnKeyType="send"
					autoFocus
					onFocus={scrollListToEnd}
					onSubmitEditing={sendMessage}
					value={chat}
					onChangeText={setChat}
				/>
			</View>
		</KeyboardAvoidingViews>
	);
};

export default MessagingAccept;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	body: {
		flex: 1,
		marginHorizontal: sizes.s16,
	},
	btnBack: {
		left: sizes.s8,
		position: 'absolute',
	},
	txtStatus: {
		...Style.txt14,
		color: colors.warning,
		marginLeft: sizes.s6,
	},
	dot: {
		backgroundColor: colors.warning,
		width: sizes.s8,
		height: sizes.s8,
		borderRadius: sizes.s8,
		marginRight: sizes.s4,
	},
	viewInput: {
		backgroundColor: colors.white,
		paddingHorizontal: sizes.s24,
		paddingBottom: sizes.s8 + getBottomSpace(),
		...Style.shadow5,
	},
	buttonLeft: {
		color: colors.black,
		width: '47%',
		backgroundColor: colors.white,
		borderColor: colors.dividers,
		borderWidth: sizes.s2,
	},
	uploadView: {
		...Style.row_between,
		borderRadius: sizes.s24,
		padding: sizes.s14,
		backgroundColor: colors.errorBG,
		marginTop: sizes.s30,
	},
	btnUpload: {
		backgroundColor: colors.primary,
		paddingHorizontal: sizes.s16,
		paddingVertical: sizes.s10,
		borderRadius: sizes.s24,
	},
	rate: {
		...Style.row_between,
		borderRadius: sizes.s24,
		padding: sizes.s14,
		backgroundColor: colors.yellowBG,
		marginTop: sizes.s30,
	},
	txtCompleted: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: sizes.s40,
		marginBottom: -sizes.s16,
	},
});
