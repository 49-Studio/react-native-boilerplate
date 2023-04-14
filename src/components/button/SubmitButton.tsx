import { colors, sizes, Style } from 'assets';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Button from './Button';

interface Props {
	title: string;
	onPress: () => void;
	style?: any;
	shadow?: boolean;
	disable?: boolean;
}

const SubmitButton: React.FC<Props> = (props: Props) => {
	return (
		<View style={[styles.container, props.shadow && Style.shadow5, , props.style]}>
			<Button title={props.title} onPress={props.onPress} disable={props.disable} />
		</View>
	);
};

export default React.memo(SubmitButton);
SubmitButton.defaultProps = {
	shadow: true,
};
const styles = StyleSheet.create({
	container: {
		paddingTop: sizes.s8,
		paddingBottom: sizes.s8 + getBottomSpace(),
		paddingHorizontal: sizes.s24,
		backgroundColor: colors.white,
	},
});
