import { updateProfileAction } from 'action/authenAction'
import { images, sizes, Style } from 'assets'
import { HeaderWhite } from 'components'
import React from 'react'
import {
	FlatList,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from 'selector/authenSelector'
import { concurrenciesSelector } from 'selector/ultilsSelector'

const ChangeCurrency: React.FC = () => {
	const dispatch = useDispatch()
	const currency = useSelector(concurrenciesSelector)
	const profile = useSelector(userSelector)
	const data = Object.keys(currency)

	const renderItem = ({ item, index }: any) => {
		const isActive = profile.currency === item
		return (
			<TouchableOpacity
				style={styles.touch}
				activeOpacity={0.8}
				onPress={() => {
					dispatch(
						updateProfileAction({
							id: profile._id,
							currency: item.toString(),
						})
					)
				}}>
				<Text style={Style.txt16}>{currency[item] + ` (${item})`}</Text>
				{isActive && <Image source={images.ic_selected} style={Style.icon24} />}
			</TouchableOpacity>
		)
	}
	return (
		<View style={Style.container}>
			<HeaderWhite title="Currency" />
			<FlatList
				data={data}
				keyExtractor={(item, index) => String(index)}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
			/>
			<SafeAreaView />
		</View>
	)
}

export default ChangeCurrency

const styles = StyleSheet.create({
	touch: {
		paddingVertical: sizes.s12,
		paddingHorizontal: sizes.s24,
		...Style.row_between,
	},
})
