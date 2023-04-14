import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts, images, screenWidth, sizes } from 'assets'
import { goBack, navigate } from 'navigationRef'
import { ButtonSubmit2, StatusBarView, TextInputAnimated } from 'components'
import { SCREENNAME } from 'utils/constant'
import FastImage from 'react-native-fast-image'
const ChangeImage: React.FC = ({ route }: any) => {
	const [name, setName] = useState<string>('')
	const onChangeImage = () => {
		const screenName = route?.params?.isEdit ? SCREENNAME.EDIT_REQUEST : SCREENNAME.CREATE_REQUEST
		navigate(screenName, { image: { ...route.params, imageName: name } })
	}
	return (
		<View style={styles.container}>
			<StatusBarView />
			<View style={styles.header}>
				<TouchableOpacity style={styles.iconLeft} onPress={() => goBack()}>
					<Image source={images.ic_close} />
				</TouchableOpacity>
				<Text style={styles.title}>Change Picture</Text>
			</View>
			<ScrollView contentContainerStyle={{ flexGrow: 1, padding: sizes.s24 }}>
				<FastImage source={{ uri: route.params?.uri }} style={styles.img} />
				<TextInputAnimated label="Picture Name" value={name} onChangeText={setName} />
			</ScrollView>
			<ButtonSubmit2
				titleLeft="Cancel"
				titleRight="Save"
				onPressLeft={() => goBack()}
				onPressRight={onChangeImage}
			/>
		</View>
	)
}

export default ChangeImage

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: sizes.s20,
		borderBottomWidth: sizes.s1,
		borderColor: colors.dividers,
	},
	title: {
		fontSize: sizes.s16,
		lineHeight: sizes.s24,
		fontWeight: '500',
		fontFamily: fonts.bold,
	},
	iconLeft: {
		position: 'absolute',
		top: sizes.s22,
		left: sizes.s22,
	},
	img: {
		width: screenWidth - sizes.s48,
		height: screenWidth - sizes.s48,
		borderRadius: sizes.s12,
	},
})
