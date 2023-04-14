/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { colors, screenHeight, sizes, Style } from 'assets';
import { SubmitButton } from 'components';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
	Animated,
	KeyboardAvoidingView,
	Modal,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

interface Props {
	disablePressOut?: boolean;
	children?: any;
	title?: string;
	content?: string;
	ref: any;
	buttonTitle?: string;
	buttonOnPress?: () => void;
	hideTitle?: boolean;
	style?: any;
}
let height = screenHeight * 0.5;
// eslint-disable-next-line react/display-name
const BottomSheet: React.FC<Props> = forwardRef((props: Props, ref: any) => {
	const [show, setShow] = useState(false);
	const translateY = useRef(new Animated.Value(height)).current;
	const time = 250;
	useImperativeHandle(ref, () => ({
		open: () => open(),
		close: (callBack: () => void) => close(callBack),
	}));

	useEffect(() => {
		show && slideUp();
	}, [show]);

	const open = () => {
		setShow(true);
	};
	const close = (callBack = () => {}): void => {
		slideDown();
		setShow(false);
		callBack();
	};
	const slideUp = (): void => {
		Animated.timing(translateY, {
			toValue: 0,
			duration: time,
			useNativeDriver: true,
		}).start();
	};
	const slideDown = (): void => {
		Animated.timing(translateY, {
			toValue: height,
			duration: time,
			useNativeDriver: true,
		}).start();
	};
	return (
		<Modal
			visible={show}
			animationType="fade"
			statusBarTranslucent
			transparent
			onRequestClose={() => close()}>
			<TouchableWithoutFeedback onPress={() => !props.disablePressOut && close()}>
				<KeyboardAvoidingView style={[styles.container]} behavior={'padding'}>
					<TouchableWithoutFeedback>
						<Animated.View
							onLayout={(e) => (height = e.nativeEvent.layout.height)}
							style={[styles.bottomSheet, { transform: [{ translateY }] }, props.style]}>
							{!props.hideTitle && (
								<View style={[styles.titleView]}>
									<Text style={[styles.title]}>{props.title}</Text>
								</View>
							)}
							{props.children || (
								<View>
									<Text style={styles.content}>{props.content}</Text>
									<SubmitButton
										shadow={false}
										title={props.buttonTitle || 'Confirm'}
										onPress={props.buttonOnPress || close}
									/>
								</View>
							)}
						</Animated.View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</Modal>
	);
});

export default BottomSheet;
BottomSheet.defaultProps = {
	disablePressOut: false,
};
const styles = StyleSheet.create({
	bottomSheet: {
		backgroundColor: colors.white,
		borderTopLeftRadius: sizes.s16,
		borderTopRightRadius: sizes.s16,
		width: '100%',
	},
	container: {
		flex: 1,
		backgroundColor: colors.bgTransparent,
		justifyContent: 'flex-end',
	},
	titleView: {
		paddingVertical: sizes.s16,
		paddingHorizontal: sizes.s16,
		borderBottomColor: '#E2E2E2',
		borderBottomWidth: sizes.s2,
	},
	title: {
		textAlign: 'center',
		...Style.h3_medium,
	},
	content: {
		paddingHorizontal: sizes.s16,
		paddingVertical: sizes.s24,
		...Style.txt16_secondary,
	},
});
