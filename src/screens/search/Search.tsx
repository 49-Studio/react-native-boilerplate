/* eslint-disable react/display-name */
/* eslint-disable no-empty */
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';
import { getBankAccountAction, getProfileAction, getUserBalanceAction } from 'action/authenAction';
import { getCategoryAction, getListRequestAction, searchRequestAction } from 'action/requestAction';
import { getConcurrenciesAction } from 'action/ultilsAction';
import authApi from 'api/authApi';
import { colors, images, sizes, Style } from 'assets';
import { Header, ItemEmpty, ItemListJob } from 'components';
import _, { isEmpty } from 'lodash';
import { ListRequest } from 'models';
import { navigate } from 'navigationRef';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
	Alert,
	FlatList,
	Image,
	LayoutAnimation,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	UIManager,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { locationSelector, userSelector } from 'selector/authenSelector';
import { listRequestSelector } from 'selector/requestSelector';
import { SCREENNAME } from 'utils/constant';

if (Platform.OS === 'android') {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

const Search: React.FC = ({ route }: any) => {
	const [typeFilter, setTypeFilter] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const typingTimeoutRef: any = useRef();
	const filterRef = useRef<any>();
	const dispatch = useDispatch();
	const dataRequest = useSelector(listRequestSelector);
	const location = useSelector(locationSelector);
	const userData = useSelector(userSelector);

	useEffect(() => {
		setLoading(false);
	}, [dataRequest]);

	const updateLocationUser = async () => {
		if (!isEmpty(userData._id)) {
			try {
				await authApi.updateProfile({
					id: userData._id,
					lat: location?.coords?.latitude,
					long: location?.coords?.longitude,
				});
			} catch (error: any) {}
		}
		return;
	};

	const renderItem = ({ item, index }: { item: ListRequest; index: number }) => {
		if (item.status === 'active') {
			return <ItemListJob key={index} {...item} typeFilter={typeFilter} />;
		}

		return <></>;
	};

	const onFilter = (e: string) => {
		setName('');
		setTypeFilter(e);
		e !== ''
			? dispatch(searchRequestAction(`?_where[0][type]=${e}`))
			: dispatch(getListRequestAction());
		setLoading(true);
	};
	const searchByName = () => {
		setTypeFilter('');

		if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
		typingTimeoutRef.current = setTimeout(() => {
			if (name !== '') {
				dispatch(searchRequestAction(`?_q=${name}`));
				setLoading(true);
				filterRef?.current?.onRefeshFilter(typeFilter);
			} else {
				return null;
			}
		}, 900);
	};

	const getData = () => {
		dispatch(getCategoryAction());
		dispatch(getListRequestAction());
		dispatch(getConcurrenciesAction());

		setLoading(true);
		if (!isEmpty(userData._id)) {
			dispatch(getProfileAction());
			dispatch(getBankAccountAction());
			dispatch(getUserBalanceAction(userData.id));
		}
	};

	const onRefresh = () => {
		if (typeFilter === '') {
			dispatch(getListRequestAction());
			setLoading(true);
		} else {
			dispatch(searchRequestAction(`?_where[0][type]=${typeFilter}`));
			setLoading(true);
		}
		setName('');
	};

	const handleDynamicLink = (link: FirebaseDynamicLinksTypes.DynamicLink | null | any) => {
		// Handle dynamic link inside your own application
		if (link?.url?.includes('success=true')) {
			Alert.alert('Success', 'You have successfully created an account');
		}
	};
	useEffect(() => {
		dynamicLinks()
			.getInitialLink()
			.then((link: any) => {
				handleDynamicLink(link);
			});

		const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		getData();
		updateLocationUser();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const goToFilter = () => navigate(SCREENNAME.FILTER_JOB, route?.params);
	const numOfParam = !_.isEmpty(route?.params) ? route?.params?.category?.length : 0;

	return (
		<View style={Style.container}>
			<Header
				isShowSearchBar
				value={name}
				onChangeText={setName}
				onSubmitEditing={searchByName}
			/>
			{Boolean(name) && (
				<Text
					style={[
						Style.txt12_secondary,
						Style.top8,
						Style.paddingHorizontal,
					]}>{`Search result for ${name}`}</Text>
			)}
			<View style={Style.row_between}>
				<Text style={[Style.h3_medium, Style.top24, Style.left16]}>Popular Jobs</Text>
				<TouchableOpacity onPress={goToFilter}>
					<Image source={images.ic_filter_favourite} style={styles.icFilter} />
					{numOfParam > 0 && (
						<View style={styles.dot}>
							<Text style={Style.txt12_white}>{numOfParam}</Text>
						</View>
					)}
				</TouchableOpacity>
			</View>
			<View>
				<Filter onFilter={onFilter} ref={filterRef} />
			</View>
			<FlatList
				data={dataRequest}
				keyExtractor={(item, index) => String(index)}
				showsVerticalScrollIndicator={false}
				renderItem={renderItem}
				contentContainerStyle={{ flexGrow: 1 }}
				onRefresh={onRefresh}
				ListEmptyComponent={<ItemEmpty title="No Requests Found Yet" />}
				refreshing={loading}
			/>
		</View>
	);
};

export default Search;

const FilterArray = [
	{ id: 1, label: 'All', icon: undefined, type: '' },
	{ id: 2, label: 'Picture', icon: images.ic_filter_picture, type: 'photo_album' },
	{ id: 3, label: 'Video', icon: images.ic_filter_video, type: 'video' },
	{ id: 4, label: 'Live', icon: images.ic_filter_live, type: 'livestream' },
];

const Filter: React.FC<any> = forwardRef((props: any, ref: any) => {
	const [type, setType] = useState<string>('');
	useImperativeHandle(ref, () => ({
		onRefeshFilter: (e: string) => onRefeshFilter(e),
	}));
	const onRefeshFilter = (e: string) => {
		setType(e);
	};

	return (
		<View style={[Style.row, Style.right16]}>
			{FilterArray.map((item) => {
				const active = type === item.type;
				return (
					<TouchableOpacity
						key={item.id}
						onPress={() => {
							LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
							setType(item.type);
							props.onFilter(item.type);
						}}
						style={[
							styles.filterItem,
							{ backgroundColor: active ? colors.primary : colors.primary50 },
						]}
						activeOpacity={0.7}>
						{item.icon && (
							<Image
								source={item.icon}
								style={[Style.icon20, active && { tintColor: colors.white }]}
							/>
						)}
						{(active || !item.icon) && (
							<Text
								style={[
									item.icon && Style.left8,
									Style.txt14_white,
									{ color: active ? colors.white : colors.primary400 },
								]}>
								{item.label}
							</Text>
						)}
					</TouchableOpacity>
				);
			})}
		</View>
	);
});

const styles = StyleSheet.create({
	filterItem: {
		marginLeft: sizes.s16,
		marginVertical: sizes.s16,
		padding: sizes.s10,
		paddingHorizontal: sizes.s16,
		borderRadius: sizes.s23,
		...Style.row,
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	icFilter: {
		width: sizes.s40,
		height: sizes.s40,
		marginTop: sizes.s18,
		marginRight: sizes.s10,
	},
	dot: {
		backgroundColor: colors.error,
		position: 'absolute',
		top: sizes.s16,
		right: sizes.s16,
		width: sizes.s16,
		height: sizes.s16,
		borderRadius: sizes.s10,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
