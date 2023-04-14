/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-shadow */

import { screenWidth, Style } from 'assets';
import BottomSheet from 'components/bottomSheet/BottomSheet';
import SubmitButton from 'components/button/SubmitButton';
import TextInputs from 'components/input/TextInputs';
import { format } from 'date-fns';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DatePickerWheel from 'react-native-date-picker';

export interface DatePickerProps {
	value?: Date;
	onChange?: (value: any) => void;
	title: string;
	minDate?: Date;
	maxDate?: Date;
	bottomSheetStyle?: any;
}

const DatePicker: React.FC<DatePickerProps> = ({
	value = new Date(),
	onChange = (d = new Date()) => {},
	title,
	maxDate,
	minDate,
	bottomSheetStyle,
}) => {
	const refs = useRef<any>();
	const openPicker = () => refs.current.open();
	const closePicker = () => refs.current.close();
	const [valueDay, setValue] = useState<any>('');
	const onSubmit = () => {
		setValue(format(new Date(value), 'dd/MM/yyyy'));
		closePicker();
	};
	return (
		<View style={styles.container}>
			<TextInputs
				style={[Style.top12]}
				label={title}
				value={format(value, 'dd/MM/yyyy') || valueDay}
				isPicker
				hideIconClear
				onPress={openPicker}
			/>

			<BottomSheet ref={refs} disablePressOut={false} title={title} style={bottomSheetStyle}>
				<View style={styles.container}>
					<View style={styles.viewPicker}>
						<DatePickerWheel
							date={value}
							style={{ width: screenWidth }}
							onDateChange={onChange}
							mode="date"
							locale="en"
							maximumDate={maxDate}
							minimumDate={minDate}
							textColor="#000"
						/>
					</View>
				</View>
				<SubmitButton shadow={false} title="Confirm" onPress={onSubmit} />
			</BottomSheet>
		</View>
	);
};

export default DatePicker;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	viewPicker: {
		alignItems: 'center',
	},
});
