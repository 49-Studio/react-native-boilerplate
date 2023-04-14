import { colors, sizes, Style } from 'assets'
import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import PinInputCustom from './PinInputCustom'
interface Props {
	value: string
	onChange: (value: string) => void
	onFulfill?: (code: string) => void
	style?: StyleProp<ViewStyle>
	message?: string
	codeLength?: number
	password?: boolean
}
interface States {
	errorMessage: string
	isShowCountDown: boolean
	second: number
}

export default class PinInput extends React.PureComponent<Props, States> {
	private interval: any
	constructor(props: Props) {
		super(props)
		this.state = {
			errorMessage: '',
			isShowCountDown: false,
			second: 60,
		}
	}
	showError(message: string) {
		this.setState({ errorMessage: message })
	}
	showCountDown() {
		this.setState({ isShowCountDown: true }, this.countdown)
	}
	countdown() {
		this.interval = setInterval(() => this.setState({ second: this.state.second - 1 }), 1000)
	}
	componentDidUpdate() {
		if (this.state.second === 0) {
			clearInterval(this.interval)
			this.setState({ isShowCountDown: false, second: 60 })
		}
	}
	componentWillUnmount() {
		clearInterval(this.interval)
	}
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				{this.props.message && (
					<Text
						style={[styles.message, this.state.errorMessage !== '' && styles.errorMessage]}>
						{this.state.errorMessage || this.props.message}
					</Text>
				)}

				{this.state.isShowCountDown ? (
					<Text style={styles.message}>
						Thử lại sau{' '}
						<Text style={{ color: colors.black }}>{`${this.state.second} giây`}</Text>
					</Text>
				) : (
					<PinInputCustom
						password={this.props.password}
						mask={<View style={styles.dot} />}
						cellSize={sizes.s50}
						cellStyle={styles.cell}
						cellStyleFocused={styles.cellFocused}
						outCellStyle={styles.outCellStyle}
						outCellStyleFocused={styles.outCellStyleFocused}
						textStyle={styles.text}
						value={this.props.value}
						onTextChange={this.props.onChange}
						onFulfill={this.props.onFulfill}
						onFocus={() => this.setState({ errorMessage: '' })}
						codeLength={this.props?.codeLength}
					/>
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	dot: {
		width: sizes.s10,
		height: sizes.s10,
		backgroundColor: colors.black,
		borderRadius: sizes.s8,
	},
	outCellStyle: {
		borderRadius: sizes.s8,
		borderWidth: sizes.s1,
		marginRight: sizes.s2,
		borderColor: 'transparent',
	},
	outCellStyleFocused: {
		// borderColor: colors.primary,
	},
	cell: {
		borderWidth: sizes.s1,
		borderColor: colors.border,
		borderRadius: sizes.s8,
		marginHorizontal: sizes.s2,
	},
	cellFocused: {
		borderWidth: 1,
		borderColor: colors.primary,
	},
	text: {
		...Style.h2,
	},
	message: {
		...Style.content14,
		color: colors.primary_text,
		marginBottom: sizes.s24,
	},
	errorMessage: {
		color: colors.error,
	},
})
