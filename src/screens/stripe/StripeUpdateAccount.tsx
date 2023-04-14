/* eslint-disable react-hooks/exhaustive-deps */
import {
	updateBackCardAction,
	updateBankStatementAction,
	updateFrontCardAction,
} from 'action/authenAction';
import authApi from 'api/authApi';
import { ultilsApi } from 'api/ultilsApi';
import { colors, images, screenHeight, sizes, Style } from 'assets';
import {
	AlertSystem,
	Button,
	HeaderWhite,
	ImagePicker,
	KeyboardAvoidingViews,
	Loading,
	Picker,
	TextInputAnimated,
	TextInputs,
} from 'components';
import DatePicker from 'components/datePicker/DatePicker';
import { format } from 'date-fns';
import { goBack, navigate } from 'navigationRef';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DocumentPicker, { isInProgress, types } from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector } from 'selector/authenSelector';
import { SCREENNAME } from 'utils/constant';
import { GenderType } from 'utils/data';
import { API_URL } from 'utils/https';

const StripeUpdatteAccount: React.FC<any> = () => {
	const profile: any = useSelector(profileSelector);
	const dispatch = useDispatch();
	const [url, setUrl] = useState<string>(profile?.stripe_info?.business_url || '');
	const [phone, setPhone] = useState<string>(profile?.stripe_info?.business_phone || '');
	const [firstName, setFirstName] = useState<string>(profile?.stripe_info?.first_name || '');
	const [lastName, setLastName] = useState<string>(profile?.stripe_info?.last_name || '');
	const [description, setDescription] = useState<string>(
		profile?.stripe_info?.business_description || '',
	);
	const [dateOfBirth, setDateOfBirth] = useState<any>(null);
	const [job, setJob] = useState<any>(
		{ title: profile?.stripe_info?.job_title, value: profile.stripe_info?.job } || '',
	);
	const [address1, setAddress1] = useState<string>(profile?.stripe_info?.address_1 || '');
	const [address2, setAddress2] = useState<string>(profile?.stripe_info?.address_2 || '');
	const [dayDob, setDayDob] = useState<string>('');
	const [monthDob, setMonthDob] = useState<string>('');
	const [yearDob, setYearDob] = useState<string>('');
	const [datePicker, setDatePicker] = useState<Date | undefined>(
		new Date(profile?.stripe_info?.date_of_birth) || undefined,
	);
	const [geneder, setGender] = useState<any>(
		{ title: profile?.stripe_info?.gender_title, value: profile.stripe_info?.gender } || '',
	);
	const [postalCode, setPostalCode] = useState<string>(profile?.stripe_info?.postal_code || '');
	const [city, setCity] = useState<string>(profile?.stripe_info?.city || '');
	const [state, setState] = useState<any>(
		{ title: profile?.stripe_info?.state_title, value: profile.stripe_info?.state } || '',
	);
	const [phoneNumber, setPhoneNumber] = useState<string>(profile?.stripe_info?.phone || '');
	const [tax, setTax] = useState<string>(profile?.stripe_info?.tax_number || '');
	const [iban, setIban] = useState<string>(profile?.stripe_info?.iban || '');
	const [bankHolderName, setBankHolderName] = useState<string>(
		profile?.stripe_info?.bank_holder_name || '',
	);
	const [bankNumber, setBankNumber] = useState<string>(profile?.stripe_info?.bank_number || '');
	const [bankStatement, setBankStatement] = useState<any>(profile?.bank_statement?.url || '');
	const [frontImage, setFrontImage] = useState<string>(
		API_URL + profile?.front_identity_document?.url || '',
	);
	const [backImage, setBackImage] = useState<string>(
		API_URL + profile?.back_identity_document?.url || '',
	);
	const [dataState, setDataState] = useState<any>(null);
	const [dataJobTitle, setDataJobTitle] = useState<any>([]);
	/// REF
	const phoneRef = useRef<any>();
	const urlRef = useRef<any>();
	const firstNameRef = useRef<any>();
	const lastNameRef = useRef<any>();
	const jobRef = useRef<any>();
	const dayRef = useRef<any>();
	const monthRef = useRef<any>();
	const yearRef = useRef<any>();
	const address1Ref = useRef<any>();
	const address2Ref = useRef<any>();
	const postalCodeRef = useRef<any>();
	const cityRef = useRef<any>();
	const stateRef = useRef<any>();
	const taxRef = useRef<any>();
	const phoneNumberRef = useRef<any>();
	const descriptionRef = useRef<any>();
	const ibanRef = useRef<any>();
	const bankHolderNameRef = useRef<any>();
	const bankNumberRef = useRef<any>();
	const bankStatementRef = useRef<any>();
	const imageRef = useRef<any>();
	const imageRef2 = useRef<any>();
	const modalRef = useRef<any>();

	const onChooseFrontImage = (uri: any) => {
		setFrontImage(uri?.uri);
		dispatch(updateFrontCardAction(uri));
	};

	const onChooseBackImage = (uri: any) => {
		setBackImage(uri?.uri);
		dispatch(updateBackCardAction(uri));
	};

	const isCheck = () => {
		if (url === '') {
			urlRef.current?.showError('Please enter Business URL!');
			Alert.alert('You are missing input Business URL!');
			return false;
		} else if (phone === '') {
			phoneRef.current?.showError('Please enter Business Phone Number!');
			Alert.alert('You are missing input Business Phone Number!');
			return false;
		} else if (description === '') {
			descriptionRef.current?.showError('Please enter Business Description!');
			Alert.alert('You are missing input Business Description!');
			return false;
		} else if (firstName === '') {
			firstNameRef.current?.showError('Please enter First Name!');
			Alert.alert('You are missing input First Name!');
			return false;
		} else if (lastName === '') {
			lastNameRef.current?.showError('Please enter Last Name!');
			Alert.alert('You are missing input Last Name!');
			return false;
		} else if (dayDob === '') {
			dayRef.current?.showError('');
			Alert.alert('You are missing input Day!');
			return false;
		} else if (monthDob === '') {
			monthRef.current?.showError('');
			Alert.alert('You are missing input Month!');
			return false;
		} else if (yearDob === '') {
			yearRef.current?.showError('');
			Alert.alert('You are missing input Year!');
			return false;
		} else if (phoneNumber === '') {
			phoneNumberRef.current?.showError('Please enter Phone Number!');
			Alert.alert('You are missing input Phone Number!');
			return false;
		} else if (job === '') {
			jobRef.current?.showError('Please enter Job!');
			Alert.alert('You are missing input Job!');
			return false;
		} else if (address1 === '') {
			address1Ref.current?.showError('Please enter Address!');
			Alert.alert('You are missing input Address!');
			return false;
		} else if (postalCode === '') {
			postalCodeRef.current?.showError('Please enter Postal Code!');
			Alert.alert('You are missing input Postal Code!');
			return false;
		} else if (city === '') {
			cityRef.current?.showError('Please enter City!');
			Alert.alert('You are missing input City!');
			return false;
		} else if (state === '') {
			stateRef.current?.showError('Please enter State!');
			Alert.alert('You are missing input State!');
			return false;
		} else if (tax === '') {
			taxRef.current?.showError('Please enter Tax!');
			Alert.alert('You are missing input Tax!');
			return false;
		} else if (iban === '') {
			ibanRef.current?.showError('Please enter Iban!');
			Alert.alert('You are missing input Iban!');
			return false;
		} else if (bankHolderName === '') {
			bankHolderNameRef.current?.showError('Please enter Bank Holder Name!');
			Alert.alert('You are missing input Bank Holder Name!');
			return false;
		} else if (bankNumber === '') {
			bankNumberRef.current?.showError('Please enter Bank Number!');
			Alert.alert('You are missing input Bank Number!');
			return false;
		}

		return true;
	};

	const updateAccount = async () => {
		const data: any = {
			business_url: url,
			business_description: description,
			business_phone: phone,
			first_name: firstName,
			last_name: lastName,
			job: job.value,
			job_title: job.title,
			day_dob: dayDob,
			month_dob: monthDob,
			year_dob: yearDob,
			address_1: address1,
			address_2: address2,
			postal_code: postalCode,
			city: city,
			state: state.value,
			state_title: state.title,
			phone: phoneNumber,
			tax_number: tax,
			iban: iban,
			bank_holder_name: bankHolderName,
			bank_number: bankNumber,
			gender: geneder.value,
			gender_title: geneder.title,
			date_of_birth: dateOfBirth,
		};
		if (isCheck()) {
			try {
				Loading.show();
				const res: any = await authApi.updateStripeAccount2(data);
				if (res?.error) {
					Alert.alert(res.error);
				} else {
					Alert.alert('Alert', 'Successfull', [
						{
							text: 'ok',
							onPress: () => goBack(),
						},
					]);
				}
			} catch (err: any) {
				Loading.hide();
				Alert.alert(err);
			} finally {
				Loading.hide();
			}
		} else {
			Alert.alert('You are missing input information!');
		}
	};

	const handleError = (err: unknown) => {
		if (DocumentPicker.isCancel(err)) {
			console.warn('cancelled');
			// User cancelled the picker, exit any dialogs or menus and move on
		} else if (isInProgress(err)) {
			console.warn('multiple pickers were opened, only the last will be considered');
		} else {
			throw err;
		}
	};

	const onUploadFile = (pickerResult: any) => {
		dispatch(updateBankStatementAction(pickerResult));
		setBankStatement(pickerResult?.name);
	};

	const openDocument = async () => {
		try {
			const pickerResult = await DocumentPicker.pickSingle({
				presentationStyle: 'fullScreen',
				type: [types.pdf],
			});
			onUploadFile(pickerResult);
		} catch (e) {
			handleError(e);
		}
	};

	const getDataJob = async () => {
		const res: any = await ultilsApi.getJobTitle();
		const formatData = res.map((x: any) => ({
			title: x.name,
			value: x.stripe_code,
		}));
		setDataJobTitle(formatData);
	};

	const getDataState = async () => {
		const res: any = await ultilsApi.getStateIndia();
		const formatData = res.map((x: any) => ({
			title: x.name,
			value: x.short_name,
		}));
		setDataState(formatData);
	};

	useEffect(() => {
		getDataJob();
		getDataState();
		checkData();
	}, []);

	const checkData = () => {
		if (profile.stripe_info) {
			return;
		} else {
			goBack();
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
		}
	};
	const onChangeData = (data: any) => {
		setDateOfBirth(data);
		const date = format(data, 'dd/MM/yyyy');
		const newDate = date.split('/');
		setDayDob(newDate[0]);
		setMonthDob(newDate[1]);
		setYearDob(newDate[2]);
	};
	const showModal = () => modalRef?.current?.open();
	return (
		<KeyboardAvoidingViews>
			<HeaderWhite title="Update Bank Account" isGoBack />
			<ScrollView
				contentContainerStyle={styles.list}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled">
				<Text style={[Style.txt16_secondary, Style.top16, Style.txtCenter]}>
					Please input the following details to setup your wallet for withdrawals. We will
					review your submission in 3-5 working days for approval. We will contact you if we
					need more details about your account.
				</Text>
				<Text style={[Style.txt16, Style.top32]}>Business URL</Text>
				<TextInputs
					ref={urlRef}
					style={[Style.top12]}
					label="www.snap4me.com"
					value={url}
					onChangeText={setUrl}
				/>
				<Text style={[Style.txt16, Style.top16]}>Business Phone Number</Text>
				<TextInputAnimated
					ref={phoneRef}
					style={[Style.top12]}
					label="Mobile"
					value={phone}
					isPhone
					onChangeText={setPhone}
				/>
				<Text style={[Style.txt16, Style.top16]}>Business Description</Text>
				<TextInputs
					ref={descriptionRef}
					style={[Style.top12]}
					label="I provide photo-taking/videography services"
					value={description}
					onChangeText={setDescription}
				/>

				<Text style={[Style.txt16, Style.top16]}>First Name</Text>
				<TextInputs
					ref={firstNameRef}
					style={[Style.top12]}
					label="Raj"
					value={firstName}
					onChangeText={setFirstName}
				/>
				<Text style={[Style.txt16, Style.top16]}>Last Name</Text>
				<TextInputs
					ref={lastNameRef}
					style={[Style.top12]}
					label="Kumar"
					value={lastName}
					onChangeText={setLastName}
				/>
				<Text style={[Style.txt16, Style.top16]}>Date of Birth</Text>
				<DatePicker
					maxDate={new Date()}
					onChange={(data) => {
						setDatePicker(data);
						onChangeData(data);
					}}
					value={datePicker}
					title="Choose day of birth"
					bottomSheetStyle={{ height: screenHeight * 0.4 }}
				/>

				<Text style={[Style.txt16, Style.top16]}>Gender</Text>
				<Picker
					label="Gender"
					data={GenderType}
					value={geneder.title}
					callBack={(item) => setGender(item)}
				/>
				<Text style={[Style.txt16, Style.top16]}>Identity Pan Card Upload</Text>

				<View style={Style.row_between}>
					{/* FRONT CARD ID */}
					<View>
						<Text style={[Style.txt16, Style.top16]}>Front Image</Text>
						<ImagePicker ref={imageRef} onUpload={onChooseFrontImage} />
						<TouchableOpacity
							style={styles.borderCard}
							onPress={() => imageRef.current.open()}>
							<Image
								source={
									frontImage
										? {
												uri: frontImage,
										  }
										: images.ic_card_user
								}
								style={frontImage ? styles.img : styles.no_img}
							/>
						</TouchableOpacity>
					</View>
					{/* BACK CARD ID */}
					<View>
						<Text style={[Style.txt16, Style.top16]}>Back Image</Text>
						<ImagePicker ref={imageRef2} onUpload={onChooseBackImage} />
						<TouchableOpacity
							style={styles.borderCard}
							onPress={() => imageRef2.current.open()}>
							<Image
								source={
									backImage
										? {
												uri: backImage,
										  }
										: images.ic_card_user
								}
								style={backImage ? styles.img : styles.no_img}
							/>
						</TouchableOpacity>
					</View>
				</View>

				<Text style={[Style.txt16, Style.top16]}>Phone Number</Text>
				<TextInputAnimated
					ref={phoneNumberRef}
					style={[Style.top12]}
					label="Mobile"
					isPhone
					value={phoneNumber}
					onChangeText={setPhoneNumber}
				/>

				<Text style={[Style.txt16, Style.top16]}>Job</Text>
				<Picker
					label="Job"
					data={dataJobTitle}
					value={job?.title}
					callBack={(item) => {
						setJob(item);
					}}
				/>
				<Text style={[Style.txt16, Style.top16]}>Address</Text>
				<TextInputs
					ref={address1Ref}
					style={[Style.top12]}
					label="Bangalore City S.O, Bengaluru"
					value={address1}
					onChangeText={setAddress1}
				/>
				<Text style={[Style.txt16, Style.top16]}>Address Line 2 (Optional)</Text>
				<TextInputs
					ref={address2Ref}
					style={[Style.top12]}
					label="Bangalore, Karnataka"
					value={address2}
					onChangeText={setAddress2}
				/>
				<Text style={[Style.txt16, Style.top16]}>Postal Code</Text>
				<TextInputs
					ref={postalCodeRef}
					style={[Style.top12]}
					label="560002"
					keyboardType={'decimal-pad'}
					value={postalCode}
					onChangeText={setPostalCode}
				/>
				<Text style={[Style.txt16, Style.top16]}>City</Text>
				<TextInputs
					ref={cityRef}
					style={[Style.top12]}
					label="City"
					value={city}
					onChangeText={setCity}
				/>
				<Text style={[Style.txt16, Style.top16]}>State</Text>
				<Picker
					label="State"
					data={dataState}
					value={state?.title}
					callBack={(item) => setState(item)}
				/>
				<Text style={[Style.txt16, Style.top16]}>PAN Number</Text>
				<TextInputs
					ref={taxRef}
					style={[Style.top12]}
					label="AAAAA1234A"
					value={tax}
					onChangeText={setTax}
				/>
				<Text style={[Style.txt16, Style.top16]}>IFSC Code</Text>
				<TextInputs
					ref={ibanRef}
					style={[Style.top12]}
					label="KKBK0000111"
					value={iban}
					onChangeText={setIban}
				/>
				<Text style={[Style.txt16, Style.top16]}>Bank Holder Name</Text>
				<TextInputs
					ref={bankHolderNameRef}
					style={[Style.top12]}
					label="Ram Shankar Singh"
					value={bankHolderName}
					onChangeText={setBankHolderName}
				/>
				<Text style={[Style.txt16, Style.top16]}>Account Number</Text>
				<TextInputs
					ref={bankNumberRef}
					style={[Style.top12]}
					label="0012345678"
					value={bankNumber}
					keyboardType={'decimal-pad'}
					onChangeText={setBankNumber}
				/>
				<View style={Style.row_between}>
					<Text style={[Style.txt16, Style.top16]}>Bank Statement</Text>
					<TouchableOpacity onPress={showModal}>
						<Image source={images.ic_info} style={[Style.icon20, Style.top16]} />
					</TouchableOpacity>
				</View>
				<TextInputs
					ref={bankStatementRef}
					style={[Style.top12]}
					label="Choose file"
					value={bankStatement}
					isPicker
					hideIconClear
					onPress={openDocument}
				/>

				<Button title="Update" onPress={updateAccount} styles={styles.btn} />
				<AlertSystem
					ref={modalRef}
					title="Alert"
					content="Please upload one or more documents to verify that the bank account listed matches the name mentioned"
				/>
			</ScrollView>
		</KeyboardAvoidingViews>
	);
};

export default StripeUpdatteAccount;

const styles = StyleSheet.create({
	contianer: {
		flex: 1,
	},
	list: {
		paddingHorizontal: sizes.s16,
		flexGrow: 1,
	},
	btn: {
		marginVertical: sizes.s32,
	},
	borderCard: {
		borderRadius: sizes.s16,
		borderWidth: sizes.s1,
		borderColor: colors.white,
		backgroundColor: colors.background,
		alignItems: 'center',
		justifyContent: 'center',
		width: sizes.s165,
		height: sizes.s105,
	},
	img: {
		width: sizes.s165,
		height: sizes.s105,
		borderRadius: sizes.s16,
	},
	no_img: {
		width: sizes.s65,
		height: sizes.s65,
	},
});
