/* eslint-disable react-hooks/exhaustive-deps */
import { loginSuccess } from 'action/authenAction';
import { setToken } from 'api/axiosClient';
import { colors, images, screenWidth, sizes, Style } from 'assets';
import { Button, StatusBarView } from 'components';
import { replace } from 'navigationRef';
import React, { useEffect, useRef, useState } from 'react';
import {
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';
import { getMultiData, getStoreData, keyAsyncStorage, storeData } from 'utils/AsyncStorage';
import { STACKNAME } from 'utils/constant';

const WelcomeData = [
	{
		id: 1,
		title: 'Get information from anywhere in the world',
		subTitle:
			'Get connected to locals and citizens abroad to gain access to the information you need',
		image: images.onboarding1,
	},
	{
		id: 2,
		title: 'List requests for data you need instantly',
		subTitle:
			'Create a request for free or place a reward to get access to data from wherever you want',
		image: images.onboarding2,
	},
	{
		id: 3,
		title: 'Do jobs to earn cash',
		subTitle: 'Accept requests listed by users worldwide and earn money on the go!',
		image: images.onboarding3,
	},
];

const Welcome: React.FC = () => {
	const [idx, setIdx] = useState<number>(0);
	const scrollRef = useRef<any>();
	const dispatch = useDispatch();
	useEffect(() => {
		getStoreData(keyAsyncStorage.authToken).then((value) => {
			if (value) {
				setToken(value);
			}
		});

		getMultiData([keyAsyncStorage.onboarding, keyAsyncStorage.profile])
			.then((data) => {
				const [onboarding, profile]: any = data || [];
				if (profile) {
					dispatch(loginSuccess(profile));
					setTimeout(() => {
						replace(STACKNAME.HOME);
					}, 200);
				} else if (onboarding) {
					replace(STACKNAME.AUTHENTICATION);
				}
			})
			.finally(() => {
				setTimeout(() => {
					SplashScreen.hide();
				}, 500);
			});
	}, []);

	const getStarted = () => {
		storeData(keyAsyncStorage.isFirstOpenedApp, 'true');
		storeData(keyAsyncStorage.onboarding, 'true');
		replace(STACKNAME.AUTHENTICATION);
	};

	const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
		setIdx(Math.round(index));
	};

	const renderPage = () => {
		return WelcomeData.map((item) => (
			<View style={styles.item} key={item.id}>
				<FastImage source={item.image} style={styles.image} />
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.subtitle}>{item.subTitle}</Text>
			</View>
		));
	};

	const renderDot = () => {
		return (
			<View style={Style.row_center}>
				{WelcomeData.map((i, index) => {
					return (
						<View
							key={String(index)}
							style={[styles.dot, idx === index && { backgroundColor: colors.primary }]}
						/>
					);
				})}
			</View>
		);
	};

	return (
		<View style={[Style.container]}>
			<StatusBarView />
			<Text style={styles.skip} onPress={getStarted}>
				Skip
			</Text>
			<View>
				<ScrollView
					ref={scrollRef}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ flexGrow: 1 }}
					pagingEnabled
					onScroll={onScroll}>
					{renderPage()}
				</ScrollView>
			</View>
			{renderDot()}
			<Button
				title="Get Started"
				styles={[Style.marginHorizontal, Style.top48]}
				onPress={getStarted}
			/>
		</View>
	);
};

export default Welcome;

const styles = StyleSheet.create({
	skip: {
		...Style.txt16,
		...Style.padding,
		alignSelf: 'flex-end',
	},
	item: {
		width: screenWidth,
		...Style.paddingHorizontal,
		alignItems: 'center',
	},
	image: {
		width: screenWidth - sizes.s32,
		height: screenWidth - sizes.s32,
	},
	title: {
		...Style.h2,
		...Style.top48,
		...Style.txtCenter,
	},
	subtitle: {
		...Style.txt16_secondary,
		...Style.top16,
		...Style.txtCenter,
	},
	dot: {
		marginTop: sizes.s36,
		width: sizes.s28,
		height: sizes.s4,
		borderRadius: 20,
		backgroundColor: colors.dividers,
		marginHorizontal: sizes.s2,
	},
});
