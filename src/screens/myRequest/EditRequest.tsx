import { deleteRequestAction, editRequestAction } from 'action/requestAction';
import { colors, images, sizes, Style } from 'assets';
import {
	BottomSheet,
	ButtonSubmit2,
	Header,
	ImagePicker,
	KeyboardAvoidingViews,
	ParagraphInput,
	RadioButton,
	Slider,
	SubmitButton,
	Switch,
	TagGroup,
	TextInputAnimated,
	TextInputs,
} from 'components';
import { addDays } from 'date-fns';
import _ from 'lodash';
import { Category, CreateQuest, RequestParams } from 'models';
import { navigate } from 'navigationRef';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'selector/authenSelector';
import { categorySelector } from 'selector/requestSelector';
import { MAX_PERIOD, SCREENNAME } from 'utils/constant';
import { TypeRequest } from 'utils/data';

const EditRequest: React.FC<any> = ({ route }: { route: { params: RequestParams } }) => {
	const [id, setId] = useState<string>(route.params?.id);
	const [nameRequest, setNameRequest] = useState<string>(route.params?.name || '');
	const [location, setLocation] = useState<string>(route.params?.location);
	const [coordinate, setCoordinate] = useState<any>(route?.params?.coordinate);
	const [image, setImage] = useState<any>(route.params?.image);
	const [type, setType] = useState<any>(route.params?.type);
	const [category, setCategory] = useState<Category[]>(route.params?.category || []);
	const [duration, setDuration] = useState<number>(+route.params?.duration || 1);
	const [period, setPeriod] = useState<any>(route.params?.period || '');
	const [deliveryTime, setDeliveryTime] = useState<number>(+route.params?.deliveryTime || 1);
	const [budget, setBudget] = useState<number>(+route.params?.budget || 1);
	const [description, setDescription] = useState<string>(route.params?.description);
	const [share, setShare] = useState<boolean>(route.params?.only_visbile_within_50km);
	const [acceptVendor, setAcceptVendor] = useState<boolean>(route.params?.acceptVendor);
	//
	const dispatch = useDispatch();
	const userData = useSelector(userSelector);
	const categoryData = useSelector(categorySelector);
	//
	const locationRef = useRef<any>();
	const requestRef = useRef<any>();
	const imageRef = useRef<any>();
	const categoryRef = useRef<any>();
	const dateRef = useRef<any>();

	//
	useEffect(() => {
		route.params?.image?.uri !== '' && setImage(route.params?.image);
		route.params?.location && setLocation(route.params?.location);
		Boolean(
			route?.params?.coordinate.latitude !== 0 || route?.params?.coordinate.longitude !== 0,
		) && setCoordinate(route?.params?.coordinate);
	}, [route.params]);

	//
	const openDatePicker = () => dateRef.current.open();
	//
	const closeDatePicker = () => dateRef.current.close();

	//
	const onChangeImage = () => {
		imageRef.current.open();
	};

	//
	const onChooseImage = (img: any) => navigate(SCREENNAME.CHANGE_IMAGE, { ...img, isEdit: true });

	const onDeleteRequest = async () => {
		Alert.alert('Delete Request', `Do you want delete ${image?.imageName} request`, [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: () => {
					dispatch(deleteRequestAction(route?.params?.id));
				},
			},
		]);
	};
	//
	const showErrorLocation = () =>
		!location && locationRef?.current.showError('Please input your location');
	//
	const showErrorCategory = () =>
		_.isEmpty(category) && categoryRef?.current.showError('Please select request type');
	//
	const showErrorRequest = () => {
		_.isEmpty(nameRequest) && requestRef?.current.showError('Please input the title');
	};
	const onEditRequest = () => {
		if (!location || !image?.uri || _.isEmpty(category) || _.isEmpty(type)) {
			const messageAlert = `You are missing ${!location ? 'location' : ''}${
				!image?.uri ? ', image' : ''
			}${_.isEmpty(category) ? ', category' : ''}${_.isEmpty(type) ? ', request type' : ''}`;
			Alert.alert('Warning', messageAlert);
			showErrorLocation();
			showErrorCategory();
			showErrorRequest();
		} else {
			const dataRequest: CreateQuest = {
				data: {
					id: id,
					picture: route.params?.picture,
					name: nameRequest,
					description: description,
					type: type?.type,
					deadline:
						period === MAX_PERIOD
							? addDays(new Date(), 365 * 10)
							: addDays(new Date(), period),
					delivery_time: deliveryTime,
					duration: duration * 60, //parse minute to seconds
					categories: category.map((e) => e.id),
					budget: budget,
					is_shared: share,
					address: location,
					owner: userData._id,
					lat: coordinate?.latitude,
					long: coordinate?.longitude,
					only_visbile_within_50km: share,
					accept_first_request: acceptVendor,
					status: route.params?.status,
				},
				image: image,
			};
			dispatch(editRequestAction(dataRequest));
		}
	};
	return (
		<KeyboardAvoidingViews>
			<Header isShowBack />
			<ScrollView
				contentContainerStyle={styles.list}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled">
				<Text style={[Style.h2, Style.top24]}>Edit a Request</Text>
				<Text style={[Style.txt16, Style.top16]}>Basic information</Text>
				<TextInputs
					ref={locationRef}
					isPicker
					style={[Style.top12]}
					label="Location"
					icon={images.ic_map}
					value={location}
					onClear={setLocation}
					onPress={() => navigate(SCREENNAME.LOCATION)}
				/>
				<TextInputs
					ref={requestRef}
					style={[Style.top12]}
					label="Insert gig title here."
					value={nameRequest}
					onChangeText={setNameRequest}
				/>
				{/* ////////Change picture///////// */}
				<View style={styles.chooseImage}>
					<FastImage
						source={{
							uri: image?.uri || images.no_img_uri,
						}}
						style={styles.image}
					/>
					<View style={styles.txtImage}>
						<Text numberOfLines={2} style={{ ...Style.h3_medium, flex: 1 }}>
							{image?.imageName}
						</Text>
						<Text style={Style.txt14_primary} onPress={onChangeImage}>
							Change picture
						</Text>
					</View>
				</View>
				{/* ////////Request type///////// */}
				<ImagePicker ref={imageRef} onUpload={onChooseImage} />
				<Text style={[Style.txt16, Style.top32]}>Request type</Text>
				<View style={styles.viewType}>
					<RadioButton data={TypeRequest} onChange={setType} value={type} />
				</View>
				{/* ///////////////// */}
				{type?.type !== 'photo_album' && (
					<Slider
						style={Style.top24}
						title="Duration"
						textValue="MIN"
						minValue={1}
						maxValue={10}
						value={duration}
						onChange={setDuration}
					/>
				)}
				<Slider
					style={Style.top24}
					title="Delivery Time"
					textValue="DAY"
					minValue={1}
					maxValue={10}
					value={+deliveryTime}
					onChange={setDeliveryTime}
				/>
				<TextInputAnimated
					label="Request Open Till"
					value={period?.split('-').reverse().join('/')}
					isPicker
					onPress={openDatePicker}
				/>
				<BottomSheet ref={dateRef} title="Deadline">
					<Calendar
						enableSwipeMonths
						minDate={new Date().toISOString()}
						onDayPress={(day) => setPeriod(day.dateString)}
						markedDates={{
							[period]: { selected: true, selectedColor: colors.primary },
						}}
					/>
					<SubmitButton shadow={false} title={'Submit'} onPress={closeDatePicker} />
				</BottomSheet>
				{/* ////////Category Tags///////// */}
				<Text style={[Style.txt16_secondary, Style.top32]}>Category Tags</Text>
				<TagGroup
					ref={categoryRef}
					data={categoryData}
					value={category}
					onChange={setCategory}
				/>

				{/* ////////Description///////// */}
				<Text style={[Style.txt16_secondary, Style.top24]}>Description (Optional)</Text>
				<ParagraphInput
					style={Style.top12}
					label="Type something..."
					value={description}
					onChangeText={setDescription}
				/>
				<View style={Style.row_between}>
					<Text style={[Style.txt16_secondary, Style.top24]}>Budget</Text>
					<Text style={[Style.txt16, Style.top24]}>
						{userData?.currency || 'INR'} {+budget}
					</Text>
				</View>

				{/* ////////share///////// */}
				<View style={[Style.row_between, Style.top32]}>
					<Text style={Style.txt16_primary_text}>Only visible to vendors within 50km</Text>
					<Switch active={share} onChange={() => setShare(!share)} />
				</View>
				<TouchableOpacity
					activeOpacity={1}
					style={styles.shareOther}
					onPress={() => setAcceptVendor(!acceptVendor)}>
					<View style={Style.row}>
						<Image
							style={Style.icon24}
							source={acceptVendor ? images.ic_checkbox_checked : images.ic_checkbox_uncheck}
						/>
						<Text style={[Style.txt16_primary_text, Style.left12]}>
							Automatically accept first vendor request
						</Text>
					</View>
				</TouchableOpacity>

				<ButtonSubmit2
					shadow={false}
					titleLeft="Delete Request"
					titleRight="Save Change"
					style={styles.btn}
					onPressLeft={onDeleteRequest}
					onPressRight={onEditRequest}
				/>
			</ScrollView>
		</KeyboardAvoidingViews>
	);
};

export default EditRequest;

const styles = StyleSheet.create({
	list: {
		paddingHorizontal: sizes.s16,
		flexGrow: 1,
	},
	chooseImage: {
		marginTop: sizes.s16,
		...Style.border,
		padding: sizes.s8,
		...Style.row,
		alignItems: 'flex-start',
	},
	image: {
		...Style.icon120,
		borderRadius: sizes.s12,
	},
	txtImage: {
		flex: 1,
		justifyContent: 'space-between',
		marginLeft: sizes.s12,
	},
	viewType: {
		padding: sizes.s20,
		...Style.border,
		marginTop: sizes.s12,
	},
	shareOther: {
		...Style.row_between,
		marginTop: sizes.s24,
		alignItems: 'flex-start',
	},
	btn: {
		marginVertical: sizes.s32,
		paddingHorizontal: 0,
	},
});
