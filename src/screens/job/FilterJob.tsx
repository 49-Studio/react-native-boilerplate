/* eslint-disable react-hooks/exhaustive-deps */
import { filterFvoriteAction } from 'action/requestAction';
import { colors, fonts, images, sizes, Style } from 'assets';
import { ButtonSubmit2, StatusBarView, TagGroup } from 'components';
import _ from 'lodash';
import { goBack } from 'navigationRef';
import React, { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { categorySelector } from 'selector/requestSelector';
import { JobType } from 'utils/data';

const SortBy = [
	{ id: 1, title: 'Recent', type: 'recent' },
	{ id: 2, title: 'Proximity', type: 'proxi' },
	{ id: 3, title: 'User Ratings', type: 'rating' },
	{ id: 4, title: 'Price - Hight to Low', type: 'priceHight' },
	{ id: 5, title: 'Price - Low to Hight', type: 'priceLow' },
];

const FilterJob: React.FC = ({ route }: any) => {
	const title: any = route?.params?.title;
	const [all, setAll] = useState<boolean>(route?.params?.type?.length === 3);
	const [type, setType] = useState<any[]>(route?.params?.type);
	const [sort, setSort] = useState<any>(route?.params?.sort);
	const [category, setCategory] = useState<any>(route?.params?.category || []);
	const sortRef = useRef<any>();
	const categoryRef = useRef<any>();
	const dispatch = useDispatch();
	const categoryData = useSelector(categorySelector);

	const setAllType = () => {
		if (all) {
			setType([]);
		} else {
			setType([...JobType]);
		}

		setAll(!all);
	};

	const onChangeType = (data: any) => {
		setType([...data]);
		data.length === 3 ? setAll(true) : setAll(false);
	};

	const reset = () => {
		// sortRef.current.clearValue()
		categoryRef.current.clearValue();
		setType([]);
		setAll(false);
	};

	const apply = () => {
		const screenParam: any = {
			sort,
			category,
			type,
		};
		for (let key in screenParam) {
			if (_.isEmpty(screenParam[key])) {
				delete screenParam[key];
			}
		}
		dispatch(
			filterFvoriteAction({
				// sort: sort?.type,
				category: category,
				type: all ? [] : type,
				screenParam: screenParam,
			}),
		);
	};

	return (
		<View style={styles.container}>
			<StatusBarView />
			<View style={styles.header}>
				<TouchableOpacity style={styles.iconLeft} onPress={() => goBack()}>
					<Image source={images.ic_close} />
				</TouchableOpacity>
				<Text style={styles.title}>{title}</Text>
			</View>
			<ScrollView contentContainerStyle={styles.content}>
				{/* <View style={[Style.row_between, Style.top24]}>
					<Text style={[styles.txt20]}>Job type</Text>
					<TouchableOpacity style={Style.row} onPress={setAllType}>
						<Image source={all ? images.ic_checkbox_checked : images.ic_checkbox_uncheck} />
						<Text style={[Style.txt14, { marginLeft: sizes.s10 }]}>All</Text>
					</TouchableOpacity>
				</View> */}
				{/* <CheckBox data={JobType} value={type} onChange={onChangeType} /> */}
				{/* /////////////////////// */}
				{/* <Text style={[styles.txt20, Style.top32]}>Sort by</Text>
				<TagGroup
					ref={sortRef}
					data={SortBy}
					keyTitle="title"
					value={sort}
					onChange={setSort}
				/> */}
				{/* /////////////////////// */}
				<Text style={[styles.txt20, Style.top24]}>Category</Text>
				<TagGroup
					ref={categoryRef}
					data={categoryData}
					value={category}
					onChange={setCategory}
				/>
			</ScrollView>
			<ButtonSubmit2
				titleLeft="Reset"
				titleRight="Apply"
				onPressLeft={reset}
				onPressRight={apply}
			/>
		</View>
	);
};

export default FilterJob;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: sizes.s20,
		borderBottomWidth: sizes.s1,
		borderColor: colors.dividers,
	},
	title: {
		fontSize: sizes.s16,
		lineHeight: sizes.s24,
		fontWeight: '500',
		fontFamily: fonts.bold,
	},
	iconLeft: {
		position: 'absolute',
		top: sizes.s22,
		left: sizes.s22,
	},
	content: {
		paddingHorizontal: sizes.s16,
	},
	txt20: {
		fontSize: sizes.s20,
		fontFamily: fonts.medium,
		lineHeight: sizes.s28,
		color: colors.black,
	},
});
