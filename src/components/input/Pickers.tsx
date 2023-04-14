import { FlatList, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import TextInputAnimated from './TextInputAnimated'
import BottomSheet from 'components/bottomSheet/BottomSheet'
import { colors, sizes, Style } from 'assets'
import TextInputs from './TextInputs'
import _ from 'lodash'

interface Props {
	label?: string
	value: string
	country?: string
	onChange: (value: any) => void
	style?: any
	data: any[]
	keyTitle?: string
	animatedLabel?: boolean
	bottomSheetStyle?: any
	isShowSearch?: boolean
}

const Pickers: React.FC<Props> = (props: Props) => {
	const refs = useRef<any>()
	const [data, setData] = useState<any[]>([])

	useEffect(() => {
		setData([...props.data] || [])
	}, [props.data])

	const openPicker = () => refs.current.open()
	const onChange = (value: any) => {
		setData([...props.data] || [])

		refs.current.close(() => props.onChange(value))
	}

	const TextComponent = props.animatedLabel ? TextInputAnimated : TextInputs

	const onSearch = (txt: string) => {
		if (!txt) setData([...props.data])
		else searchThrottle(txt)
	}
	const searchThrottle = _.throttle(
		(txt) => {
			const dataSearch = props.data.filter((e) =>
				e?.name?.toLowerCase().includes(txt.toLowerCase())
			)
			setData([...dataSearch])
		},
		300,
		{ trailing: true }
	)
	return (
		<>
			<TextComponent
				isPicker
				value={props.value}
				label={props.label || ''}
				style={props.style}
				onPress={openPicker}
				hideIconClear
			/>
			<BottomSheet ref={refs} hideTitle style={props.bottomSheetStyle}>
				<View style={[Style.top16, Style.bottom16, Style.paddingHorizontal]}>
					{props?.isShowSearch && <TextInputAnimated label="Search" onChangeText={onSearch} />}
					<FlatList
						data={data}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item, index) => String(index)}
						renderItem={({ item, index }) => (
							<TouchableHighlight
								key={index}
								underlayColor={colors.background}
								style={styles.item}
								activeOpacity={0.8}
								onPress={() => onChange(item)}>
								<Text style={[Style.txt16, Style.txtCenter]}>
									{props?.country === undefined
										? item[String(props?.keyTitle)]
										: item[String(props?.keyTitle)] + ' ' + item[String(props?.country)]}
								</Text>
							</TouchableHighlight>
						)}
					/>
					<SafeAreaView />
				</View>
			</BottomSheet>
		</>
	)
}
Pickers.defaultProps = {
	keyTitle: 'title',
}
export default Pickers

const styles = StyleSheet.create({
	item: {
		paddingVertical: sizes.s16,
	},
})
