/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-native/no-inline-styles */

import { colors, fonts, images, sizes, Style } from 'assets';
import React from 'react';
import {
	Animated,
	Image,
	ImageSourcePropType,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
} from 'react-native';

const BASE_SIZE = sizes.s16; //text size
const VIEW_HEIGHT = sizes.s52; //chiều cao của view tổng

interface State {
	isFocused: boolean;
	hidePassword: boolean;
	labelHeight: number;
	error: boolean;
	message: string;
	value: string | undefined;
}
interface Props extends TextInputProps {
	value?: string;
	label?: string;
	disabled?: boolean;
	isRequired?: boolean;
	isPassword?: boolean;
	isPhone?: boolean;
	isPicker?: boolean;
	inputStyle?: any;
	styleLabel?: any;
	style?: any;
	icon?: ImageSourcePropType;
	iconRight?: ImageSourcePropType;
	errorMessage?: string;
	onFocus: () => void;
	onBlur: () => void;
	onChangeText: (text: string) => void;
	onClear: () => void;
	onPress: () => void;
	onPressIconRight: () => void;
	keyboardType?: any;
	maxLength?: number;
}
export default class TextInputAnimated extends React.PureComponent<Props, State> {
	static defaultProps = {
		value: '',
		onPress: () => {},
		onFocus: () => {},
		onBlur: () => {},
		onClear: () => {},
		onChangeText: () => {},
		onPressIconRight: () => {},
	};
	textInput: any;
	_animatedIsFocused: any;
	constructor(props: Props) {
		super(props);
		this.state = {
			isFocused: false,
			hidePassword: true,
			labelHeight: 0,
			error: false,
			message: '',
			value: this.props.value || '',
		};
		this.textInput = React.createRef();
		this._animatedIsFocused = new Animated.Value(!this.props.value ? 0 : 1);
	}
	showError = (message = '') => {
		this.setState({ error: true, message });
	};
	hideError = () => {
		this.setState({ error: false, message: '' });
	};
	handleFocus = () => {
		this.setState({ isFocused: true }, () => {
			this.props.onFocus();
		});
	};

	handleBlur = () => {
		this.setState({ isFocused: false }, () => this.props.onBlur());
	};

	componentDidUpdate(prevProps: any, prevState: any) {
		if (this.state.isFocused !== prevState.isFocused || this.state.value !== prevState.value) {
			if (this.state.error || this.state.message !== '') {
				this.setState({ error: false, message: '' });
			}
			Animated.timing(this._animatedIsFocused, {
				toValue: this.state.isFocused || this.state.value !== '' ? 1 : 0,
				duration: 150,
				useNativeDriver: false,
			}).start();
		}
		if (this.props.value !== prevProps.value) {
			this.setState({ value: this.props.value });
		}
	}
	setValue = (value: string) => {
		this.setState({ value: value });
	};
	onChangeText = (txt: string) => {
		this.setState({ value: txt }, () => this.props.onChangeText(txt));
	};
	onClear = () => {
		this.setState({ value: '' }, () => this.props.onClear());
	};
	///component
	textInputs = () => (
		<TextInput
			{...this.props}
			ref={this.textInput}
			autoCorrect={false}
			autoComplete="off"
			maxLength={this.props.maxLength}
			editable={!this.props.disabled && !this.props.isPicker}
			style={[
				styles.textInput,
				{ color: colors.title },
				this.props.iconRight && { width: '80%' },
				this.props.inputStyle,
			]}
			value={this.state.value}
			onChangeText={this.onChangeText}
			onFocus={this.handleFocus}
			onBlur={this.handleBlur}
			blurOnSubmit
		/>
	);
	text = () => (
		<Text
			style={[
				styles.textInput,
				{ color: colors.title },
				this.props.iconRight && { width: '80%' },
				this.props.inputStyle,
			]}>
			{String(this.state.value)}
		</Text>
	);
	textPassword = () => (
		<TextInput
			ref={this.textInput}
			value={this.props.value}
			style={[
				styles.textInput,
				{ color: colors.title },
				this.props.isPassword && { width: '87%' },
				this.props.inputStyle,
			]}
			secureTextEntry={this.state.hidePassword}
			onChangeText={this.onChangeText}
			onFocus={this.handleFocus}
			onBlur={this.handleBlur}
			blurOnSubmit
		/>
	);
	textPhone = () => (
		<TextInput
			ref={this.textInput}
			value={this.props.value}
			style={[
				styles.textInputPhone,
				{ color: colors.title },
				this.props.isPhone && { width: '87%', marginLeft: sizes.s45 },
				this.props.inputStyle,
			]}
			onChangeText={this.onChangeText}
			onFocus={this.handleFocus}
			keyboardType="phone-pad"
			onBlur={this.handleBlur}
			blurOnSubmit
		/>
	);
	renderCodePhone = () => (
		<View style={styles.borderPhone}>
			<Text>+91</Text>
		</View>
	);

	iconRight = () => {
		if (this.props.iconRight) {
			return (
				<TouchableOpacity
					style={{
						position: 'absolute',
						right: BASE_SIZE,
					}}
					onPress={this.props.onPressIconRight}>
					<Image style={styles.icon24} source={this.props.iconRight} />
				</TouchableOpacity>
			);
		}
		return null;
	};

	iconDown = () => (
		<View style={{ position: 'absolute', right: BASE_SIZE }}>
			<Image style={styles.icon24} source={images.ic_arrow_down} />
		</View>
	);

	iconEye = () => (
		<TouchableOpacity
			style={{ position: 'absolute', right: BASE_SIZE }}
			onPress={() => this.setState({ hidePassword: !this.state.hidePassword })}>
			<Image
				style={{ ...Style.icon24 }}
				source={this.state.hidePassword ? images.ic_eye : images.ic_eye_close}
			/>
		</TouchableOpacity>
	);

	requireInput = () => <Text style={{ color: colors.error }}> *</Text>;

	render() {
		const { label } = this.props;
		const { isFocused, labelHeight } = this.state;
		const top: any = this._animatedIsFocused.interpolate({
			inputRange: [0, 1],
			outputRange: [sizes.s14, sizes.s5],
		});
		const fontSize: any = this._animatedIsFocused.interpolate({
			inputRange: [0, 1],
			outputRange: [BASE_SIZE, sizes.s12],
		});
		return (
			<>
				<TouchableOpacity
					activeOpacity={this.props.isPicker ? 0.8 : 1}
					disabled={this.props.disabled}
					onPress={() => {
						this.props.isPicker ? this.props.onPress() : this.textInput.current.focus();
					}}
					style={[
						styles.container,
						this.props.style,
						isFocused && styles.focusStyle,
						this.props.disabled && { backgroundColor: colors.disable },
						this.state.error ? { borderColor: colors.error } : null,
					]}>
					{this.props.icon && (
						<Image
							style={{ ...Style.icon24, marginRight: sizes.s8 }}
							source={this.props.icon}
						/>
					)}
					{/* //////label floating///// */}
					<Animated.Text
						onLayout={(event) => {
							labelHeight === 0 &&
								this.setState({ labelHeight: event.nativeEvent.layout.height });
						}}
						style={[
							styles.labelStyle,
							{
								top,
								fontSize,
							},
							this.props.styleLabel,
							this.props.isPhone && { left: sizes.s50 },
						]}>
						{label}
						{this.props.isRequired ? this.requireInput() : null}
					</Animated.Text>

					{this.props.isPicker ? (
						<>
							{this.text()}
							{this.iconDown()}
						</>
					) : this.props.isPassword ? (
						<>
							{this.textPassword()}
							{this.iconEye()}
						</>
					) : this.props.isPhone ? (
						<>
							{this.renderCodePhone()}
							{this.textPhone()}
						</>
					) : (
						<>
							{this.textInputs()}
							{this.iconRight()}
						</>
					)}
				</TouchableOpacity>
				{this.state.message ? (
					<Text style={styles.messageError}>{this.state.message}</Text>
				) : null}
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		borderColor: colors.border,
		borderRadius: sizes.s100,
		borderWidth: sizes.s1,
		paddingHorizontal: sizes.s16,
		height: VIEW_HEIGHT,
		justifyContent: 'center',
		backgroundColor: colors.white,
		marginTop: sizes.s16,
	},
	labelStyle: {
		padding: 0,
		textAlignVertical: 'top',
		position: 'absolute',
		left: sizes.s16,
		fontFamily: fonts.medium,
		color: colors.secondary_text,
	},
	textInput: {
		position: 'absolute',
		left: sizes.s16,
		bottom: 0,
		paddingBottom: Platform.OS === 'ios' ? sizes.s6 : sizes.s3,
		padding: 0,
		borderWidth: 0,
		width: '100%',
		...Style.txt16,
		fontFamily: fonts.regular,
	},
	textInputPhone: {
		position: 'absolute',
		left: sizes.s10,
		bottom: 0,
		paddingBottom: Platform.OS === 'ios' ? sizes.s6 : sizes.s3,
		padding: 0,
		borderWidth: 0,
		width: '100%',
		...Style.txt16,
		fontFamily: fonts.regular,
	},
	borderPhone: {
		borderRightWidth: 1,
		borderRightColor: colors.border,
		width: sizes.s30,
	},
	messageError: {
		marginHorizontal: BASE_SIZE,
		fontSize: BASE_SIZE * 0.75,
		color: colors.error,
		marginTop: 3,
		marginBottom: -BASE_SIZE / 2,
		fontFamily: fonts.bold,
	},
	focusStyle: {
		borderColor: colors.primary,
		backgroundColor: colors.white,
	},
	icon16: { width: sizes.s16, height: sizes.s16 },
	icon24: { width: sizes.s24, height: sizes.s24 },
	icon32: { width: sizes.s32, height: sizes.s32 },
});
