import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { colors, images, sizes, Style } from 'assets';
import { BottomSheet } from 'components';
import { screenOptionsNativeStack, screenOptionsStack } from 'navigation';
import { navigationRef, replace } from 'navigationRef';
import React, { useEffect, useRef } from 'react';
import { Image, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { enableScreens } from 'react-native-screens';
import { useSelector } from 'react-redux';
import {
	ChangeCurrency,
	ChangeImage,
	ChangeMobileNumber,
	ChangePassword,
	CreateRequest,
	CropImage,
	DetailJob,
	DetailRequest,
	EditRequest,
	Favorite,
	FilterJob,
	Location,
	MessagingAccept,
	MessagingRequest,
	MyWallet,
	Payment,
	PaymentResult,
	PlayBackVideo,
	PrivacyPolicy,
	Profile,
	ProfileAnother,
	RatingView,
	RatingViewRequester,
	Request,
	Search,
	Setting,
	SortTransaction,
	StripeCreateAccount,
	StripeFrom,
	StripePayment,
	SuccesChangePhoneNumber,
	SuccessWithdraw,
	TermOfService,
	VerifyCodeChangePhoneNumber,
	VerifyCodeToTranfer,
	VideoCall,
	Withdraw,
} from 'screens';
import StripeUpdatteAccount from 'screens/stripe/StripeUpdateAccount';
import { isGuestUserSelector } from 'selector/authenSelector';
import { paramsRequest, SCREENNAME, STACKNAME } from 'utils/constant';

enableScreens();

const Tab = createBottomTabNavigator();
const tabArr = [
	{
		id: 1,
		iconInactive: images.ic_home,
		iconActive: images.ic_home_active,
		name: SCREENNAME.SEARCH,
		component: Search,
		initialParams: undefined,
	},
	{
		id: 2,
		iconInactive: images.ic_heart,
		iconActive: images.ic_heart_active,
		name: SCREENNAME.FAVOURITE,
		component: Favorite,
		initialParams: undefined,
	},
	{
		id: 3,
		iconInactive: images.ic_add_plus,
		iconActive: images.ic_add_plus_active,
		name: SCREENNAME.CREATE_REQUEST,
		component: CreateRequest,
		initialParams: paramsRequest,
	},
	{
		id: 4,
		iconInactive: images.ic_my_request,
		iconActive: images.ic_my_request_active,
		name: SCREENNAME.REQUEST,
		component: Request,
		initialParams: undefined,
	},
	{
		id: 5,
		iconInactive: images.ic_profile,
		iconActive: images.ic_profile_active,
		name: SCREENNAME.PROFILE,
		component: Profile,
		initialParams: {
			avatar:
				'https://chiase24.com/wp-content/uploads/2022/02/tang-hap-hanh-anh-avatar-hai-haeac-nhan-la-ba_t-caea_i-1.jpg',
		},
	},
];

const ArrScreen: any[] = [
	{ name: SCREENNAME.HOME, component: MyTabs, initialParams: undefined, options: undefined },
	{
		name: SCREENNAME.DETAIL_JOB,
		component: DetailJob,
		initialParams: undefined,
		options: undefined,
	},
	//favorite
	{
		name: SCREENNAME.FILTER_JOB,
		component: FilterJob,
		initialParams: { title: 'Filter' },
		options: undefined,
	},
	//create request
	{
		name: SCREENNAME.CHANGE_IMAGE,
		component: ChangeImage,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.LOCATION,
		component: Location,
		initialParams: undefined,
		options: undefined,
	},
	//request
	{
		name: SCREENNAME.DETAIL_REQUEST,
		component: DetailRequest,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.EDIT_REQUEST,
		component: EditRequest,
		initialParams: paramsRequest,
		options: { gestureEnabled: false },
	},
	{
		name: SCREENNAME.MESSAGING_REQUEST,
		component: MessagingRequest,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.MESSAGING_ACCEPT,
		component: MessagingAccept,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.VIDEO_CALL,
		component: VideoCall,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.PLAY_BACK_VIDEO,
		component: PlayBackVideo,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.RATING_VIEW,
		component: RatingView,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.RATING_VIEW_REQUESTER,
		component: RatingViewRequester,
		initialParams: undefined,
		options: undefined,
	},
	//profile
	{
		name: SCREENNAME.PROFILE_ANOTHER,
		component: ProfileAnother,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.SETTING,
		component: Setting,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.CHANGE_MOBILE_NUMBER,
		component: ChangeMobileNumber,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.CHANGE_PASSWORD,
		component: ChangePassword,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.CHANGE_CURRENCY,
		component: ChangeCurrency,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.VERIFY_CODE_CHANGE_PHONE_NUMBER,
		component: VerifyCodeChangePhoneNumber,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.SUCCESS_CHANGE_PHONE_NUMBER,
		component: SuccesChangePhoneNumber,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.PRIVACY_POLICY,
		component: PrivacyPolicy,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.TERM_OF_SERVICE,
		component: TermOfService,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.CROP_IMAGE,
		component: CropImageScreen,
		initialParams: undefined,
		options: undefined,
	},
	//payment
	{
		name: SCREENNAME.PAYMENT,
		component: Payment,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.PAYMENT_RESULT,
		component: PaymentResult,
		initialParams: undefined,
		options: undefined,
	},
	//wallet
	{
		name: SCREENNAME.MY_WALLET,
		component: MyWallet,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.SORT_TRANSACTION,
		component: SortTransaction,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.WITHDRAW,
		component: Withdraw,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.SUCCESS_WITHDRAW,
		component: SuccessWithdraw,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.VERIFY_CODE_TO_TRANFER,
		component: VerifyCodeToTranfer,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.CREATE_ACCOUNT_STRIPE,
		component: StripeCreateAccount,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.UPDATE_ACCOUNT_STRIPE,
		component: StripeUpdatteAccount,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.PAYMENT_STRIPE,
		component: StripePayment,
		initialParams: undefined,
		options: undefined,
	},
	{
		name: SCREENNAME.FROM_STRIPE,
		component: StripeFrom,
		initialParams: undefined,
		options: undefined,
	},
];

function MyTabs() {
	return (
		<Tab.Navigator
			backBehavior="firstRoute"
			screenOptions={{
				headerShown: false,
				lazy: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					height: sizes.s56 + getBottomSpace(),
					backgroundColor: 'white',
					...Style.shadow5,
					justifyContent: 'center',
				},
				tabBarIconStyle: {
					alignItems: 'center',
				},
			}}>
			{tabArr.map((item) => (
				<Tab.Screen
					key={item.id}
					initialParams={item.initialParams}
					options={{
						tabBarIcon: ({ focused }: any) => (
							<>
								<Image
									source={focused ? item.iconActive : item.iconInactive}
									style={Style.icon24}
								/>
								{focused && (
									<View
										style={{
											width: sizes.s12,
											height: sizes.s4,
											borderRadius: sizes.s10,
											backgroundColor: colors.primary,
											marginTop: sizes.s4,
										}}
									/>
								)}
							</>
						),
					}}
					name={item.name}
					component={item.component}
				/>
			))}
		</Tab.Navigator>
	);
}

function CropImageScreen({ route }: any) {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator screenOptions={screenOptionsStack}>
			<Stack.Screen
				name={SCREENNAME.CROP_IMAGE}
				component={() => <CropImage image={route.params?.image} />}
				options={TransitionPresets.ModalSlideFromBottomIOS}
				initialParams={route.params}
			/>
		</Stack.Navigator>
	);
}

function HomeStack() {
	const registerPopup = useRef<any>();
	const Stack = createNativeStackNavigator();
	const route = useRoute();
	const isGuestUser = useSelector(isGuestUserSelector);
	useEffect(() => {
		if (isGuestUser) {
			const screenName = navigationRef.current.getCurrentRoute()?.name;
			if (
				[
					SCREENNAME.FAVOURITE,
					SCREENNAME.CREATE_REQUEST,
					SCREENNAME.REQUEST,
					SCREENNAME.PROFILE,
					SCREENNAME.MY_WALLET,
				].includes(screenName)
			) {
				registerPopup.current.open();
			}
		}
	}, [route]);

	return (
		<>
			<Stack.Navigator screenOptions={screenOptionsNativeStack}>
				{ArrScreen.map((item, index) => (
					<Stack.Screen
						key={String(index)}
						name={item.name}
						component={item.component}
						initialParams={item.initialParams}
						options={item.options}
					/>
				))}
			</Stack.Navigator>
			<BottomSheet
				ref={registerPopup}
				disablePressOut
				title="Please Register"
				content="To ensure the sercurity of this application, create request are only available for registered users with two factor authenticaton enabled.
Please first register this guest account to create request from your wallet."
				buttonTitle="Register Account"
				buttonOnPress={() =>
					replace(STACKNAME.AUTHENTICATION, {
						screen: SCREENNAME.LOGIN,
						params: { isSignup: true },
					})
				}
			/>
		</>
	);
}

export default HomeStack;
