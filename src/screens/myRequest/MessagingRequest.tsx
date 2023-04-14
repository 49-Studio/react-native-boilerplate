import { getUserBalanceAction } from 'action/authenAction';
import { getDetailDeliveryAction } from 'action/deliveriesAction';
import { getListRequestAction } from 'action/requestAction';
import deliveriesApi from 'api/deliveriesApi';
import requestApi from 'api/requestApi';
import { colors, images, sizes, Style } from 'assets';
import {
	ButtonRequest,
	Comment,
	ItemRequestPending,
	KeyboardAvoidingViews,
	StatusBarView,
	TextInputs,
} from 'components';
import { ListDelivery } from 'models';
import { goBack, navigate, naviPush } from 'navigationRef';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'selector/authenSelector';
import { detailDeliverySelector } from 'selector/deliveriesSelector';
import { SCREENNAME } from 'utils/constant';
import { TypeRequest } from 'utils/data';
import { API_URL } from 'utils/https';

const MessagingRequest: React.FC<any> = ({ route }: { route: { params: ListDelivery } }) => {
	const [chat, setChat] = useState<string>('');
	const [showRating, setShowRating] = useState<boolean>(true);
	const detailDelivery = useSelector(detailDeliverySelector);
	const detailDeliveryByUser = useMemo(
		() => detailDelivery.find((e) => e.owner.id === route.params.owner.id),
		[detailDelivery],
	);
	const dispatch = useDispatch();
	const textinputRef = useRef<any>();
	const scrollRef = useRef<any>();
	const user = useSelector(userSelector);
	useEffect(() => {
		scrollListToEnd();
	}, [detailDelivery]);

	const TextStatus = ({ text, isComplete }: any) => (
		<View style={[Style.row_center, { marginTop: sizes.s16 }]}>
			{isComplete ? (
				<Image source={images.ic_completed} style={Style.icon16} />
			) : (
				<View style={styles.dot} />
			)}
			<Text style={[styles.txtStatus, isComplete && { color: colors.success }]}> {text}</Text>
		</View>
	);

	const deliveryStatus = () => {
		switch (detailDeliveryByUser?.requester_status) {
			case 'awaiting_delivery':
				return <TextStatus text="Awaiting Delivery" />;
			case 'review_delivery':
				return <TextStatus text="Review Delivery" />;
			case 'completed':
				return <TextStatus text="Completed" isComplete />;
			default:
				return;
		}
	};

	const onPressRating = () => navigate(SCREENNAME.RATING_VIEW, { ...detailDeliveryByUser?.owner });

	const hideRating = () => setShowRating(false);

	const sendMessage = () => {
		setChat('');

		if (chat.trim().length === 0) {
			return;
		}
		const body = {
			id: detailDeliveryByUser?.id,
			content: chat.trim(),
		};

		deliveriesApi
			.sendMessageMyRequest(body)
			.then((res) => {
				dispatch(getDetailDeliveryAction(route?.params?.request.id));
				scrollListToEnd();
			})
			.catch(() => Alert.alert('Error', 'Can not send message'));
	};

	const rejectDelivery = () => {
		deliveriesApi.acceptVendorDelivery(detailDeliveryByUser?.id, 'reject').then(() => {
			dispatch(getDetailDeliveryAction(route?.params?.request.id));
		});
	};

	const acceptDelivery = () => {
		deliveriesApi.acceptVendorDelivery(detailDeliveryByUser?.id, 'accept').then(() => {
			dispatch(getDetailDeliveryAction(route?.params?.request.id));
			dispatch(getListRequestAction());
			requestApi.editRequest({
				id: route?.params?.request.id,
				status: 'pending',
			});
		});
	};

	const rejectDeliveryReview = () => {
		deliveriesApi
			.updateDeliveries(detailDeliveryByUser?.id, {
				reject_count: detailDeliveryByUser?.reject_count === 2 ? 1 : 0,
				status: 'pending_revision',
				requester_status: 'awaiting_delivery',
			})
			.then((res) => {
				dispatch(getListRequestAction());
				dispatch(getDetailDeliveryAction(route?.params?.request.id));
			})
			.catch((e) => {
				Alert.alert('Warning', 'Have error can not reject!');
			});
	};

	const acceptDeliveryReview = () => {
		deliveriesApi.updateStatusDeliveries(detailDeliveryByUser?.id, 'accept').then(() => {
			dispatch(getDetailDeliveryAction(route?.params?.request.id));
			dispatch(getListRequestAction());
			requestApi.transaction({
				to: detailDeliveryByUser?.owner?.id,
				total: detailDeliveryByUser?.request?.budget,
				content: `Payment for fulfill request ${route?.params?.request?.name}`,
				job_type: detailDeliveryByUser?.request?.type,
			});
			requestApi.editRequest({
				id: route?.params?.request.id,
				status: 'completed',
			});
		});
		dispatch(getUserBalanceAction(user._id));
	};

	const scrollListToEnd = () => {
		setTimeout(() => {
			scrollRef.current.scrollToEnd();
		}, 100);
	};

	useEffect(() => {
		scrollListToEnd();
	}, []);
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
						uri: detailDeliveryByUser?.owner?.avatar
							? API_URL + detailDeliveryByUser?.owner.avatar
							: images.no_img_uri,
					}}
					style={[Style.icon24_radius, { marginRight: sizes.s4 }]}
				/>
				<Text style={Style.txt16}>
					{detailDeliveryByUser?.owner?.name || detailDeliveryByUser?.owner?.username}
				</Text>
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
					image={API_URL + detailDeliveryByUser?.request?.picture[0].url}
					title={detailDeliveryByUser?.request?.name}
					address={detailDeliveryByUser?.request?.address}
					type={TypeRequest.find((e) => e.type === detailDeliveryByUser?.request?.type)?.title}
					price={detailDeliveryByUser?.request?.budget}
					time={(detailDeliveryByUser?.request?.duration || 60) / 60}
					disabled
					style={{ marginTop: sizes.s16, marginHorizontal: 0 }}
				/>

				{/* //status of delivery */}
				{deliveryStatus()}
				{/* // */}
				<View style={[Style.row, { marginTop: sizes.s24 }]}>
					<Image
						source={{
							uri: detailDeliveryByUser?.owner?.avatar
								? API_URL + detailDeliveryByUser?.owner.avatar
								: images.no_img_uri,
						}}
						style={[Style.icon32_radius, { marginRight: sizes.s12 }]}
					/>
					<Text style={[Style.txt16_regular, { flex: 1 }]}>
						<Text
							style={[Style.txt16, { color: colors.primary }]}
							onPress={() => {
								naviPush(SCREENNAME.PROFILE_ANOTHER, {
									owner: detailDeliveryByUser?.owner,
								});
							}}>
							{detailDeliveryByUser?.owner?.name || detailDeliveryByUser?.owner?.username}
						</Text>{' '}
						has accepted to complete your request
					</Text>
				</View>

				{detailDeliveryByUser?.messages.map((item, index) => (
					<Comment
						key={'Message/' + item?.id}
						type={item.is_from_requester ? 'SELF' : 'GUEST'}
						avatar={
							detailDeliveryByUser?.owner?.avatar
								? API_URL + detailDeliveryByUser?.owner.avatar
								: images.no_img_uri
						}
						content={item.content}
						media={item.files}
						typeRequest={detailDeliveryByUser.request.type}
						playback_url={detailDeliveryByUser.playback_url}
					/>
				))}

				{detailDeliveryByUser?.status === 'awaiting_request_confirmation' && (
					<View style={[Style.row_between, { marginTop: sizes.s40 }]}>
						<ButtonRequest
							title="Reject"
							styleImages={{ tintColor: colors.error }}
							styles={styles.buttonLeft}
							onPress={rejectDelivery}
							ic_left
							images={images.ic_close}
							textColor={colors.error}
						/>
						<ButtonRequest
							title="Accept"
							styles={{ width: '47%' }}
							onPress={acceptDelivery}
							ic_left
							images={images.ic_check}
							textColor={colors.white}
						/>
					</View>
				)}
				{detailDeliveryByUser?.requester_status === 'review_delivery' && (
					<View style={[Style.row_between, { marginTop: sizes.s40 }]}>
						<ButtonRequest
							title={`Reject (${
								detailDeliveryByUser?.reject_count === 0
									? '0'
									: detailDeliveryByUser?.reject_count
							})`}
							styleImages={{
								tintColor:
									detailDeliveryByUser?.reject_count === 0
										? colors.disable_text
										: colors.error,
							}}
							styles={styles.buttonLeft}
							onPress={rejectDeliveryReview}
							ic_left
							disable={detailDeliveryByUser?.reject_count === 0 ? true : false}
							images={images.ic_close}
							textColor={colors.error}
						/>
						<ButtonRequest
							title="Accept"
							styles={{ width: '47%' }}
							onPress={acceptDeliveryReview}
							ic_left
							images={images.ic_check}
							textColor={colors.white}
						/>
					</View>
				)}
				{detailDeliveryByUser?.requester_status === 'completed' && (
					<View style={styles.txtCompleted}>
						<Text style={Style.txt14_primary_text}>
							You have a accepted{' '}
							<Text style={[Style.txt14, { color: colors.primary }]}>
								{detailDeliveryByUser?.owner?.name || detailDeliveryByUser?.owner?.username}
							</Text>{' '}
							delivery
						</Text>
					</View>
				)}
				{Boolean(detailDeliveryByUser?.requester_status === 'completed' && showRating) && (
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
					disabled={detailDeliveryByUser?.status === 'awaiting_request_confirmation'}
					label="Type message..."
					returnKeyType="send"
					autoFocus
					onSubmitEditing={sendMessage}
					value={chat}
					onFocus={scrollListToEnd}
					onChangeText={setChat}
				/>
			</View>
		</KeyboardAvoidingViews>
	);
};

export default MessagingRequest;

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
