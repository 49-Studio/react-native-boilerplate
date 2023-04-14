import { filterTransactionAction, getListTransactionAction } from 'action/requestAction';
import { colors, fonts, images, sizes, Style } from 'assets';
import { BottomSheet, ButtonSubmit2, CheckBox, HeaderWhite, TextInputAnimated } from 'components';
import { addDays, differenceInDays, format, isBefore } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CalendarList, DateData, LocaleConfig } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from 'selector/authenSelector';
import { JobType } from 'utils/data';
LocaleConfig.locales.es = {
	monthNames: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	],
	monthNamesShort: [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'June',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	],
	dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	today: 'Today',
};
LocaleConfig.defaultLocale = 'es';
const SortTransaction: React.FC = () => {
	const [all, setAll] = useState<boolean>(false);
	const [type, setType] = useState<any[]>([]);
	const [sortBy, setSortBy] = useState<string>('');
	const [startDate, setStartDate] = useState<any>('');
	const [endDate, setEndDate] = useState<any>('');
	const [markedDates, setMarkedDates] = useState<any>({});

	const userData = useSelector(userSelector);
	const dispatch = useDispatch();
	const dateRef = useRef<any>();

	const onPressDate = (day: DateData) => {
		//if endDate !=='' and date select befor start date => set startDate = date seleted & endDate = startDate
		if (startDate) {
			if (isBefore(new Date(day.dateString), new Date(startDate))) {
				setStartDate(day.dateString);
			} else {
				setEndDate(day.dateString);
			}
		} else {
			setStartDate(day.dateString);
		}
		if (startDate === day.dateString) {
			setStartDate('');
			setEndDate('');
		} else if (endDate === day.dateString) {
			setEndDate('');
		}
	};

	useEffect(() => {
		if (!endDate) {
			setMarkedDates({
				[startDate]: { startingDay: true, color: colors.primary, textColor: colors.white },
			});
		} else {
			const count = differenceInDays(new Date(endDate), new Date(startDate));
			let markedDate: any = {};
			for (let i = 0; i <= count; i++) {
				const d = format(addDays(new Date(startDate), i), 'yyyy-MM-dd');
				if (i === 0) {
					//begin
					markedDate[d] = {
						startingDay: true,
						color: colors.primary,
						textColor: colors.white,
					};
				} else if (i === count) {
					//end
					markedDate[d] = { endingDay: true, color: colors.primary, textColor: colors.white };
				} else {
					markedDate[d] = {
						color: colors.primary50,
						textColor: colors.black,
					};
				}
			}
			setMarkedDates(markedDate);
		}
	}, [startDate, endDate]);
	//
	const onChangeType = (data: any) => {
		setType([...data]);
		data.length === 3 ? setAll(true) : setAll(false);
	};

	const openDatePicker = () => dateRef.current.open();

	const closeDatePicker = () => {
		dateRef.current.close();
		setStartDate('');
		setEndDate('');
	};

	const onChangeDateRange = () => dateRef.current.close();

	//
	const reset = () => {
		setAll(false);
		setType([]);
		setSortBy('');
		setStartDate('');
		setEndDate('');
		setMarkedDates({});
		dispatch(getListTransactionAction());
	};

	const apply = () => {
		const start = new Date(startDate);
		const end = new Date(endDate);

		dispatch(
			filterTransactionAction({
				userId: userData.id,
				jobType: all ? [] : type,
				startDate: startDate ? start.getTime() / 1000 : '',
				endDate: endDate ? end.getTime() / 1000 : '',
			})
		);
	};
	return (
		<View style={Style.container}>
			<HeaderWhite iconClose title="Sort  by" />
			<View style={styles.flex}>
				<View style={[Style.row_between]}>
					<Text style={Style.h3_medium}>Job type</Text>
					<TouchableOpacity style={Style.row} onPress={() => setAll(!all)}>
						<Image source={all ? images.ic_checkbox_checked : images.ic_checkbox_uncheck} />
						<Text style={[Style.txt14, { marginLeft: sizes.s10 }]}>All</Text>
					</TouchableOpacity>
				</View>
				<CheckBox data={JobType} onChange={onChangeType} value={type} />
				{/* <Text style={[Style.h3_medium, Style.top24]}>Sort by</Text> */}
				{/* <View style={[Style.row_between]}>
					<Tag
						title="Recieve"
						style={styles.tag}
						selected={sortBy === 'Recieve'}
						onChange={() => setSortBy('Recieve')}
					/>
					<Tag
						title="Withdraw"
						style={styles.tag}
						selected={sortBy === 'Withdraw'}
						onChange={() => setSortBy('Withdraw')}
					/>
				</View> */}

				<Text style={[Style.h3_medium, Style.top24]}>Time</Text>
				<View style={Style.row_between}>
					<TextInputAnimated
						style={styles.tag}
						label="From"
						value={startDate?.split('-')?.reverse()?.join('/')}
						isPicker
						onPress={openDatePicker}
					/>
					<TextInputAnimated
						style={styles.tag}
						label="To"
						value={endDate?.split('-')?.reverse()?.join('/')}
						isPicker
						onPress={openDatePicker}
					/>
				</View>

				<BottomSheet ref={dateRef} hideTitle style={styles.datePicker}>
					<View style={Style.container}>
						<View style={[Style.row_center, Style.paddingVertical, styles.border]}>
							<TouchableOpacity onPress={closeDatePicker} style={styles.btnBack}>
								<Image source={images.ic_close48} style={[Style.icon48]} />
							</TouchableOpacity>
							<Text style={[Style.txt16]}>{'Time range'}</Text>
						</View>

						<CalendarList
							firstDay={0}
							markingType={'period'}
							onDayPress={onPressDate}
							markedDates={markedDates}
							futureScrollRange={1}
							theme={{
								'stylesheet.calendar.header': { header: {} } as any,
								backgroundColor: '#ffffff',
								selectedDayBackgroundColor: colors.primary,
								selectedDayTextColor: '#ffffff',
								textInactiveColor: colors.disable_text,
								textDisabledColor: colors.disable_text,
								todayTextColor: colors.primary,
								dayTextColor: colors.black,
								textDayFontFamily: fonts.medium,
								textMonthFontFamily: fonts.medium,
								textDayHeaderFontFamily: fonts.medium,
								textDayFontSize: sizes.s16,
								textMonthFontSize: sizes.s20,
								textDayHeaderFontSize: sizes.s16,
								agendaDayTextColor: colors.error,
							}}
						/>
					</View>
					<ButtonSubmit2
						titleLeft="Cancel"
						titleRight="Ok"
						onPressLeft={closeDatePicker}
						onPressRight={onChangeDateRange}
					/>
				</BottomSheet>
			</View>

			<ButtonSubmit2
				titleLeft="Reset"
				titleRight="Apply"
				onPressLeft={reset}
				onPressRight={apply}
			/>
		</View>
	);
};

export default SortTransaction;

const styles = StyleSheet.create({
	flex: {
		flex: 1,
		paddingHorizontal: sizes.s16,
		paddingVertical: sizes.s24,
	},
	tag: {
		width: '47%',
	},
	datePicker: {
		height: '95%',
	},

	btnBack: {
		left: sizes.s8,
		position: 'absolute',
	},
	border: {
		borderBottomWidth: sizes.s1,
		borderBottomColor: colors.dividers,
		borderTopLeftRadius: sizes.s16,
		borderTopRightRadius: sizes.s16,
	},
});
