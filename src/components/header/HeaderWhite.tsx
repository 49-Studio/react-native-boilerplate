import {
	Image,
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	View,
} from 'react-native';
import React from 'react';
import StatusBarView from './StatusBarView';
import { goBack } from 'navigationRef';
import { colors, images, sizes, Style } from 'assets';
import { getStatusBarHeight } from 'utils/IphoneHelper';
interface Props {
	title?: any;
	titleStyle?: StyleProp<TextStyle>;
	iconClose?: boolean;
	backgroundColor?: string;
	iconTintColor?: string;
	showBorder?: boolean;
	style?: any;
	lightContent?: boolean;
	isGoBack?: boolean;
}
const HeaderWhite: React.FC<Props> = (props: Props) => {
	return (
		<View
			style={[
				styles.container,
				props.showBorder && styles.border,
				{ backgroundColor: props.backgroundColor || colors.white },
				props.style,
			]}>
			<StatusBarView backgroundColor={props.backgroundColor} lightContent={props.lightContent} />
			<View style={[Style.row_center, { marginTop: sizes.s10 }]}>
				{props.isGoBack && (
					<TouchableOpacity onPress={() => goBack()} style={styles.btnBack}>
						<Image
							source={props.iconClose ? images.ic_close48 : images.ic_back}
							style={[
								Style.icon48,
								{
									tintColor: props.iconTintColor || colors.black,
								},
							]}
						/>
					</TouchableOpacity>
				)}
				<Text style={[Style.txt16, props.titleStyle]}>{props.title}</Text>
			</View>
		</View>
	);
};

export default HeaderWhite;
HeaderWhite.defaultProps = {
	isGoBack: true,
};

const styles = StyleSheet.create({
	container: {
		height: getStatusBarHeight(true) + sizes.s44,
	},
	btnBack: {
		left: sizes.s8,
		position: 'absolute',
	},
	border: {
		borderBottomWidth: sizes.s1,
		borderBottomColor: colors.dividers,
	},
});
