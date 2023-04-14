import deliveriesApi from 'api/deliveriesApi'
import { colors, images, sizes, Style } from 'assets'
import { AvatarProfile, Headers } from 'components'
import _ from 'lodash'
import { Review } from 'models'
import { naviPush } from 'navigationRef'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { SCREENNAME } from 'utils/constant'
import { API_URL } from 'utils/https'

const ProfileAnother: React.FC = ({ route }: any) => {
	const userData = route?.params.owner
	const [dataReview, setDataReview] = useState<Review[]>([])
	useEffect(() => {
		deliveriesApi.getReviewByUser(userData._id).then((res: any) => {
			setDataReview(res)
		})
	}, [])

	return (
		<View style={Style.container}>
			<Headers isShowBack title={`${userData?.name}`} />
			<AvatarProfile
				disable
				name={userData.name === '' ? userData.username : userData.name}
				rate={userData?.rating || 0}
				avatar={userData.avatar && API_URL + userData.avatar}
			/>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingVertical: sizes.s32 }}>
				<View>
					<View style={Style.row_between}>
						<Text style={styles.title}>About me</Text>
					</View>
					<Text style={[Style.txt14_secondary, Style.top8, Style.paddingHorizontal]}>
						{userData?.description}
					</Text>
				</View>

				<View style={styles.break} />

				<View style={[Style.row_between, Style.paddingHorizontal]}>
					<Text style={Style.txt16}>Review</Text>
					<View style={styles.numberReview}>
						<Text style={Style.txt14}>{`${dataReview.length} reviews`}</Text>
					</View>
				</View>
				{dataReview.map((item) => (
					<TouchableOpacity
						onPress={() => {}}
						key={item?.id}
						style={[Style.row_start, Style.paddingHorizontal, Style.top24]}>
						<FastImage
							source={{
								uri: item?.owner?.avatar
									? API_URL + item?.owner?.avatar
									: images.no_img_uri,
							}}
							style={Style.icon32_radius}
						/>
						<View style={[Style.left12, Style.flex]}>
							<View style={Style.row_between}>
								<Text style={Style.txt12}>{item?.owner?.name}</Text>
								<View style={Style.row}>
									{[...Array(5)].map((x, idx) => (
										<Image
											source={
												idx < item.star ? images.ic_star_rated : images.ic_star_unrate
											}
											style={[Style.icon16, Style.left4]}
										/>
									))}
								</View>
							</View>
							<Text style={[Style.txt12_secondary, Style.top4]}>{item?.comment}</Text>
						</View>
					</TouchableOpacity>
				))}

				<View style={styles.break} />
			</ScrollView>
		</View>
	)
}

export default ProfileAnother

const styles = StyleSheet.create({
	break: {
		height: sizes.s8,
		backgroundColor: colors.background,
		marginVertical: sizes.s24,
	},
	numberReview: {
		paddingHorizontal: sizes.s4,
		backgroundColor: colors.background,
		borderRadius: sizes.s4,
	},
	title: {
		...Style.txt16,
		...Style.paddingHorizontal,
	},
	borderTop: {
		paddingTop: sizes.s16,
		borderTopColor: colors.background,
		borderTopWidth: sizes.s1,
		marginTop: sizes.s16,
	},
	bts: {
		paddingTop: sizes.s32,
		paddingBottom: getBottomSpace() + sizes.s54,
		paddingHorizontal: sizes.s24,
	},
	modalAbout: {},
})
