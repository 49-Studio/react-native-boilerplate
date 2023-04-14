import Sliders from '@react-native-community/slider';
import { colors, sizes, Style } from 'assets';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
	title: string;
	textValue: string;
	minValue: number;
	maxValue: number;
	style?: any;
	onChange: (value: number) => void;
	moneyValue?: boolean;
	value: number;
	disabled?: boolean;
}

const Slider: React.FC<Props> = (props: Props) => {
	return (
		<View style={props.style}>
			<View style={Style.row_between}>
				<Text style={Style.txt16_secondary}>{props.title}</Text>
				<Text style={Style.txt16}>
					{props.moneyValue ? `INR${props.value}` : props.value + ' ' + props.textValue}
				</Text>
			</View>
			<Sliders
				style={styles.slider}
				minimumValue={props.minValue}
				maximumValue={props.maxValue}
				thumbTintColor={colors.primary}
				minimumTrackTintColor={colors.primary}
				maximumTrackTintColor={colors.border}
				value={typeof props.value === 'number' ? props.value : props.maxValue}
				disabled={props.disabled}
				onValueChange={(number) => {
					props.onChange(number);
				}}
				onSlidingComplete={(number) => {
					props.onChange(number);
				}}
				step={1}
			/>
		</View>
	);
};

export default Slider;
Slider.defaultProps = {
	value: 1,
};
const styles = StyleSheet.create({
	slider: {
		marginTop: sizes.s20,
		marginLeft: 0,
		width: '100%',
	},
});
