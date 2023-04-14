import { colors, fonts, images, sizes, Style } from 'assets'
import { format } from 'date-fns'
import _ from 'lodash'
import { ListDelivery, User } from 'models'
import { navigate } from 'navigationRef'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { SCREENNAME } from 'utils/constant'
import { API_URL } from 'utils/https'

const ItemVender: React.FC<ListDelivery> = (props: ListDelivery) => {
	const goToMessage = () => {
		navigate(SCREENNAME.MESSAGING_REQUEST, props)
	}
	return (
		<TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={goToMessage}>
			<FastImage
				source={{
					uri: props?.owner?.avatar ? API_URL + props?.owner.avatar : images.no_img_uri,
				}}
				style={styles.image}
			/>
			<View style={styles.content}>
				<View style={Style.row_between}>
					<View style={Style.row}>
						<Text style={[Style.txt16, { marginRight: sizes.s6 }]}>
							{props?.owner.name || ''}
						</Text>
						<Text style={Style.txt12_secondary}>
							<Image source={images.ic_star_mini} style={styles.iconStart} /> {1}
						</Text>
					</View>
					{props?.status === 'awaiting_request_confirmation' ? (
						<View style={styles.dot} />
					) : (
						<Image
							source={images.ic_check}
							style={[Style.icon20, { tintColor: colors.secondary_text }]}
						/>
					)}
				</View>
				<View style={Style.row_between}>
					<Text numberOfLines={2} style={Style.txt14_secondary}>
						{_.last(props?.messages || '')?.content}
					</Text>
					<Text style={Style.txt12_secondary}>
						{format(new Date(props.createdAt), 'HH:mm') || '0'}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default React.memo(ItemVender)

const styles = StyleSheet.create({
	container: {
		marginBottom: sizes.s16,
		padding: sizes.s16,
		borderRadius: sizes.s12,
		backgroundColor: colors.white,
		...Style.row,
	},
	image: {
		width: sizes.s44,
		height: sizes.s44,
		borderRadius: sizes.s100,
	},
	content: {
		flex: 1,
		marginLeft: sizes.s12,
	},
	icon: {
		...Style.icon20,
	},
	txt: {
		...Style.txt12,
		fontFamily: fonts.bold,
		marginLeft: sizes.s5,
	},
	iconStart: {
		width: sizes.s12,
		height: sizes.s12,
	},
	dot: {
		backgroundColor: colors.primary,
		width: sizes.s8,
		height: sizes.s8,
		borderRadius: sizes.s8,
	},
})
