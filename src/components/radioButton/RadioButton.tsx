import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import _ from 'lodash'
import { Style, images, colors, sizes } from 'assets'
interface Props {
	data: any[]
	keyTitle?: string
	onChange?: (value: any) => void
	value?: any
	ref?: any
}

const RadioButton: React.FC<Props> = forwardRef(
	({ data, value, keyTitle = 'title', onChange = () => {} }: Props, ref: any) => {
		const [selected, setSelected] = useState<any>(undefined)

		useImperativeHandle(ref, () => ({
			clearValue: () => clearValue(),
		}))

		const clearValue = () => {
			setSelected(undefined)
		}

		useEffect(() => {
			setSelected(value)
		}, [value])
		return (
			<View>
				{data.map((item, index) => {
					const isChecked = _.isEqual(selected, item)
					return (
						<TouchableOpacity
							key={String(index)}
							style={[Style.row, index !== 0 && Style.top24]}
							activeOpacity={0.7}
							onPress={() => {
								setSelected(item)
								onChange(item)
							}}>
							<Image
								source={isChecked ? images.ic_radio_checked : images.ic_radio_uncheck}
								style={Style.icon24}
							/>
							<Text style={[styles.title, isChecked && { color: colors.black }]}>
								{item[keyTitle]}
							</Text>
						</TouchableOpacity>
					)
				})}
			</View>
		)
	}
)

export default React.memo(RadioButton)

const styles = StyleSheet.create({
	title: {
		...Style.txt16_secondary,
		marginLeft: sizes.s16,
		flex: 1,
	},
})
