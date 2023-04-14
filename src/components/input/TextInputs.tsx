/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-empty-function */
import { colors, fonts, images, sizes, Style } from 'assets';
import React, { Component } from 'react';
import {
	Image,
	StyleProp,
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';

const BASE_SIZE = sizes.s16;
const VIEW_HEIGHT = sizes.s52;
interface State {
	hidePassword: boolean;
	isFocused: boolean;
	error: boolean;
	message: string;
	success: boolean;
}
interface Props extends TextInputProps {
	label: string;
	value?: string | any;
	onChangeText: (value: string) => void;
	onPress: () => void;
	onBlur: () => void;
	onClear: (text: string) => void;
	icon?: any;
	style?: StyleProp<ViewStyle>;
	isPicker?: boolean;
	isPassword?: boolean;
	disabled?: boolean;
	keyboardType?: any;
	multiline?: boolean;
	iconRight?: any;
	hideIconClear?: boolean;
	onFocus: () => void;
	onPressIconRight?: () => void;
}
export default class TextInputs extends Component<Props, State> {
	static defaultProps = {
		onPress: () => {},
		onFocus: () => {},
		onBlur: () => {},
		onClear: () => {},
		onChangeText: () => {},
		onPressIconRight: () => {},
	};
	inputRef: React.MutableRefObject<TextInput>;
	constructor(props: Props) {
		super(props);
		this.state = {
			hidePassword: true,
			isFocused: false,
			error: false,
			message: '',
			success: false,
		};
		this.inputRef = React.createRef<any>();
	}
	showSuccess = (message = '') => {
		this.setState({ success: true, message });
	};
	hideSuccess = () => {
		this.setState({ success: false, message: '' });
	};
	showError = (message = '') => {
		this.setState({ error: true, message });
	};
	hideError = () => {
		this.setState({ error: false, message: '' });
	};
	onPress = () => {
		this.inputRef.current.focus;
	};
	onFocus = () => {
		this.setState({ isFocused: true }, () => this.props.onFocus());
		this.hideError();
		this.hideSuccess();
	};
	onBlur = () => {
		this.setState({ isFocused: false }, () => this.props.onBlur());
	};
	iconRight = () => {
		if (this.props.iconRight) {
			return (
				<TouchableOpacity
					style={{
						position: 'absolute',
						right: BASE_SIZE,
					}}
					onPress={this.props.onPressIconRight}>
					<Image style={Style.icon24} source={this.props.iconRight} />
				</TouchableOpacity>
			);
		}
		return <></>;
	};
	render() {
		return (
			<>
				<TouchableOpacity
					activeOpacity={this.props.isPicker ? 0.8 : 1}
					disabled={this.props.disabled}
					onPress={() => {
						this.hideError();
						this.props.isPicker ? this.props.onPress() : this.inputRef.current.focus;
					}}
					style={[
						styles.container,
						!this.props.multiline && {
							height: VIEW_HEIGHT,
						},
						this.props.style,
						this.state.isFocused && { borderColor: colors.primary },
						this.state.error && { borderColor: colors.error },
						this.state.success && { borderColor: colors.success },
					]}>
					{this.props.icon && (
						<Image
							style={{
								...Style.icon24,
								marginRight: sizes.s8,
								tintColor: colors.secondary_text,
							}}
							source={this.props.icon}
						/>
					)}
					{this.props.isPassword ? (
						<>
							<TextInput
								ref={this.inputRef}
								value={this.props.value}
								onChangeText={this.props.onChangeText}
								style={[styles.input, { marginRight: sizes.s24 }]}
								placeholder={this.props.label}
								placeholderTextColor={colors.secondary_text}
								secureTextEntry={this.state.hidePassword}
								onFocus={this.onFocus}
								onBlur={this.onBlur}
								multiline={this.props.multiline}
								numberOfLines={2}
							/>
							<TouchableOpacity
								style={{ position: 'absolute', right: BASE_SIZE }}
								onPress={() => this.setState({ hidePassword: !this.state.hidePassword })}>
								<Image
									style={{ ...Style.icon24 }}
									source={this.state.hidePassword ? images.ic_eye : images.ic_eye_close}
								/>
							</TouchableOpacity>
						</>
					) : this.props.isPicker ? (
						<>
							<Text style={[Style.txt16, { width: '80%', flex: 1 }]}>
								{this.props.value || this.props.label}
							</Text>
							{this.props.hideIconClear ? (
								<View style={{ position: 'absolute', right: BASE_SIZE }}>
									<Image source={images.ic_arrow_down} style={Style.icon24} />
								</View>
							) : (
								Boolean(this.props.value) && (
									<TouchableOpacity
										style={{ position: 'absolute', right: BASE_SIZE }}
										onPress={() => this.props.onClear('')}>
										<Image source={images.ic_clear} style={Style.icon24} />
									</TouchableOpacity>
								)
							)}
						</>
					) : (
						<>
							<TextInput
								{...this.props}
								ref={this.inputRef}
								value={this.props.value}
								keyboardType={this.props.keyboardType}
								onChangeText={this.props.onChangeText}
								editable={!this.props.disabled}
								style={[
									styles.input,
									this.props.multiline && {
										paddingVertical: sizes.s5,
									},
									Boolean(this.props.iconRight) && { marginRight: sizes.s24 },
								]}
								placeholder={this.props.label}
								placeholderTextColor={colors.secondary_text}
								onFocus={this.onFocus}
								onBlur={this.onBlur}
								multiline={this.props.multiline}
								numberOfLines={2}
							/>
							{this.iconRight()}
						</>
					)}
				</TouchableOpacity>
				{this.state.message ? (
					<Text style={this.state.success ? styles.messageSuccess : styles.messageError}>
						{this.state.message}
					</Text>
				) : null}
			</>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		...Style.row,
		borderRadius: 100,
		borderWidth: sizes.s1,
		borderColor: colors.border,
		marginTop: sizes.s16,
		paddingHorizontal: sizes.s16,
		backgroundColor: colors.white,
	},
	input: {
		flex: 1,
		borderRadius: 100,
		...Style.txt16,
	},
	messageError: {
		marginHorizontal: 16,
		fontSize: BASE_SIZE * 0.75,
		color: colors.error,
		marginTop: 4,
		marginBottom: -BASE_SIZE / 2,
		fontFamily: fonts.regular,
	},
	messageSuccess: {
		marginHorizontal: 16,
		fontSize: BASE_SIZE * 0.75,
		color: colors.success,
		marginTop: 4,
		marginBottom: -BASE_SIZE / 2,
		fontFamily: fonts.regular,
	},
});
