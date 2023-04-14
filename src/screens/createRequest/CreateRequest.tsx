/* eslint-disable react-hooks/exhaustive-deps */
import { createRequestAction } from 'action/requestAction';
import { colors, images, screenWidth, sizes, Style } from 'assets';
import {
	BottomSheet,
	Button,
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
import {
	Alert,
	Image,
	Keyboard,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'selector/authenSelector';
import { categorySelector, listRequestSelector } from 'selector/requestSelector';
import { paramsRequest, SCREENNAME } from 'utils/constant';
import { TypeRequest } from 'utils/data';
import { API_URL } from 'utils/https';

const CreateRequest: React.FC<any> = ({
	navigation,
	route,
}: {
	navigation: any;
	route: { params: RequestParams };
}) => {
	const [location, setLocation] = useState<string>(route?.params?.location);
	const [nameRequest, setNameRequest] = useState<string>('');
	const [coordinate, setCoordinate] = useState<any>(route?.params?.coordinate);
	const [image, setImage] = useState<any>('');
	const [arrImage, setArrImage] = useState<any>([]);
	const [type, setType] = useState<any>('');
	const [category, setCategory] = useState<Category[]>([]);
	const [duration, setDuration] = useState<number>(1);
	const [period, setPeriod] = useState<any>('');
	const [deliveryTime, setDeliveryTime] = useState<number>(1);
	const [budget, setBudget] = useState<any>('');
	const [description, setDescription] = useState<string>('');
	const [share, setShare] = useState<boolean>(false);
	const [acceptVendor, setAcceptVendor] = useState<boolean>(false);

	const dispatch = useDispatch();
	//
	const userData = useSelector(userSelector);
	const categoryData = useSelector(categorySelector);
	const listRequest = useSelector(listRequestSelector);
	//
	const locationRef = useRef<any>();
	const imageRef = useRef<any>();
	const cateRef = useRef<any>();
	const typeRef = useRef<any>();
	const categoryRef = useRef<any>();
	const requestRef = useRef<any>();
	const dateRef = useRef<any>();
	const budgetRef = useRef<any>();
	//
	useEffect(() => {
		route.params?.location && setLocation(route.params?.location);
		Boolean(
			route?.params?.coordinate.latitude !== 0 || route?.params?.coordinate.longitude !== 0,
		) && setCoordinate(route?.params?.coordinate);
	}, [route.params]);

	//
	useEffect(() => {
		setLocation('');
		setNameRequest('');
		setCoordinate(undefined);
		setImage('');
		setType('');
		setCategory([]);
		typeRef.current?.clearValue();
		categoryRef?.current?.clearValue();
		setDuration(1);
		setPeriod('');
		setDeliveryTime(1);
		setBudget('0');
		setDescription('');
		setShare(false);
		setAcceptVendor(false);
		navigation.setParams(paramsRequest);
	}, [listRequest]);
	//
	const onChangeImage = () => {
		cateRef.current.open();
		Keyboard.dismiss();
	};
	//
	const openDatePicker = () => {
		dateRef.current.open();
		Keyboard.dismiss();
	};
	//
	const closeDatePicker = () => dateRef.current.close();
	//
	const onChooseImage = (img: any) => navigate(SCREENNAME.CHANGE_IMAGE, img);
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
	//
	const showErrorBudget = () => {
		_.isEmpty(budget) && budgetRef?.current?.showError('Please input the budget');
	};
	//create request///////////////////////////
	const createRequeset = () => {
		if (
			!location ||
			_.isEmpty(nameRequest) ||
			!image?.url ||
			_.isEmpty(category) ||
			_.isEmpty(type) ||
			_.isEmpty(budget)
		) {
			const messageAlert = `You are missing ${!nameRequest ? 'title request' : ''}${
				!location ? 'location' : ''
			}${!image?.url ? ', image' : ''}${_.isEmpty(category) ? ', category' : ''}${
				_.isEmpty(type) ? ', request type' : ''
			}`;
			Alert.alert('Warning', messageAlert);
			showErrorLocation();
			showErrorCategory();
			showErrorRequest();
			showErrorBudget();
		} else {
			const dataRequest: CreateQuest = {
				data: {
					name: nameRequest,
					description: description,
					type: type?.type,
					deadline: new Date(period),
					delivery_time: deliveryTime,
					duration: duration * 60, //parse minute to seconds
					categories: category.map((e) => e.id),
					budget: +budget,
					address: location,
					owner: userData._id,
					lat: coordinate?.latitude,
					long: coordinate?.longitude,
					only_visbile_within_50km: share,
					accept_first_request: acceptVendor,
					status: 'active',
					picture: [image?.id],
				},
				amount: 0,
			};
			if (+budget > 0) {
				navigate(SCREENNAME.PAYMENT, dataRequest);
			} else {
				dispatch(createRequestAction({ ...dataRequest, totalAmount: 0 }));
			}
		}
	};
	const renderItemImage = ({ item, index }: any) => (
		<TouchableOpacity
			key={index}
			style={styles.imageCate}
			onPress={() => {
				setImage(item);
				cateRef.current.close();
			}}>
			<FastImage source={{ uri: API_URL + item?.url }} style={styles.itemImageCate} />
		</TouchableOpacity>
	);
	return (
		<KeyboardAvoidingViews>
			<Header />
			<ScrollView
				contentContainerStyle={styles.list}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled">
				<Text style={[Style.h2, Style.top24]}>Create a Request</Text>
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
					maxLength={45}
					value={nameRequest}
					onChangeText={setNameRequest}
				/>
				{/* ////////Category Tags///////// */}
				<Text style={[Style.txt16_secondary, Style.top32]}>Category Tags</Text>

				<TagGroup
					ref={categoryRef}
					data={categoryData}
					onChange={(data) => {
						setCategory(data);
						const arrIMG: any = [];
						data.forEach((item: any) => {
							item?.images?.forEach((e: any) => {
								arrIMG.push(e);
							});
						});
						setArrImage([...arrIMG]);
						Keyboard.dismiss();
					}}
				/>

				{/* ////////Request type///////// */}
				<ImagePicker ref={imageRef} onUpload={onChooseImage} />
				<Text style={[Style.txt16, Style.top32]}>Request type</Text>
				<View style={styles.viewType}>
					<RadioButton ref={typeRef} data={TypeRequest} onChange={setType} />
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
					value={deliveryTime}
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
						minDate={addDays(new Date(), 1).toISOString()}
						onDayPress={(day) => setPeriod(day.dateString)}
						markedDates={{
							[period]: { selected: true, selectedColor: colors.primary },
						}}
					/>
					<SubmitButton shadow={false} title={'Submit'} onPress={closeDatePicker} />
				</BottomSheet>
				{/* ////////Change picture///////// */}
				{!_.isEmpty(category) && (
					<View style={styles.chooseImage}>
						<FastImage
							source={{
								uri: image.url ? API_URL + image.url : images.no_img_uri,
							}}
							style={styles.image}
						/>
						<View style={styles.txtImage}>
							<Text style={Style.txt14_primary} onPress={onChangeImage}>
								Change picture
							</Text>
						</View>
					</View>
				)}
				{/* ////////Description///////// */}
				<Text style={[Style.txt16_secondary, Style.top24]}>Description (Optional)</Text>
				<ParagraphInput
					style={Style.top12}
					label="Type something..."
					value={description}
					maxLength={1000}
					onChangeText={setDescription}
				/>
				{/* ////////Budget//////// */}
				<Text style={[Style.txt16_secondary, Style.top24]}>Budget</Text>
				<TextInputs
					ref={budgetRef}
					style={[Style.top12]}
					label="Budget"
					keyboardType={'decimal-pad'}
					value={budget}
					onChangeText={setBudget}
				/>
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
				<Button title="Create Request" onPress={createRequeset} styles={styles.btn} />
			</ScrollView>
			<BottomSheet ref={cateRef} title="Category" style={{ maxHeight: '90%' }}>
				<FlatList
					data={arrImage || []}
					contentContainerStyle={styles.listImageCate}
					numColumns={2}
					keyExtractor={(item, index) => String(index)}
					renderItem={renderItemImage}
				/>
			</BottomSheet>
		</KeyboardAvoidingViews>
	);
};

export default CreateRequest;

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
	},
	listImageCate: {
		paddingHorizontal: sizes.s16,
		paddingVertical: sizes.s24,
	},
	imageCate: {
		flex: 1,
		marginBottom: sizes.s16,
		alignItems: 'center',
	},
	itemImageCate: {
		width: screenWidth * 0.43,
		height: screenWidth * 0.43,
		borderRadius: sizes.s16,
		backgroundColor: colors.border,
	},
});
