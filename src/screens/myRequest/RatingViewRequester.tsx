import { reviewUserAction } from 'action/deliveriesAction'
import authApi from 'api/authApi'
import { colors, images, sizes, Style } from 'assets'
import { Button, HeaderWhite, ParagraphInput, StarRating } from 'components'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from 'selector/authenSelector'
import { API_URL } from 'utils/https'

const RatingViewRequester: React.FC = ({ route }: any) => {
	const [star, setStar] = useState<number>(0)
	const [message, setMessage] = useState<string>('')
	const [user, setUser] = useState<any>(null)
	const id = route?.params?.id
	const dispatch = useDispatch()
	const userData = useSelector(userSelector)

	useEffect(() => {
		getProfileRequester()
	}, [])

	const getProfileRequester = () => {
		authApi.getProfileId(id).then((res) => {
			setUser(res)
		})
	}

	const onSubmitReview = () => {
		dispatch(
			reviewUserAction({
				star,
				comment: message.trim(),
				owner: userData.id,
				receiver: id,
			})
		)
	}

	return (
		<KeyboardAvoidingView
			style={Style.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
			<HeaderWhite iconClose />
			<ScrollView
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}>
				<FastImage
					source={{
						uri: user?.avatar ? API_URL + user?.avatar : images.no_img_uri,
					}}
					style={styles.avatar}
				/>
				<Text style={[Style.top16, Style.h2, Style.txtCenter]}>
					What do you think about{'\n'}“
					{<Text style={{ color: colors.primary }}>{user?.name}</Text>}”?
				</Text>
				<StarRating style={styles.star} value={star} onChange={setStar} />
				<ParagraphInput
					style={styles.message}
					label="Your resonse"
					value={message}
					onChangeText={setMessage}
				/>
				<Button
					title="Submit"
					disable={!star || !message}
					onPress={onSubmitReview}
					styles={[Style.left24, Style.right24]}
				/>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default RatingViewRequester

const styles = StyleSheet.create({
	avatar: {
		marginTop: sizes.s64,
		alignSelf: 'center',
		width: sizes.s72,
		height: sizes.s72,
		borderRadius: sizes.s72,
	},
	star: {
		marginTop: sizes.s24,
		marginHorizontal: sizes.s40,
	},
	message: {
		marginHorizontal: sizes.s24,
		marginTop: sizes.s24,
		marginBottom: sizes.s32,
	},
})
