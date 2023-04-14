import { colors, images, sizes, Style } from 'assets';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Button from './Button';

interface Props {
	isLiked: boolean;
	addToFavorite: (like: boolean) => void;
	acceptRequest: () => void;
}

const AcceptRequestButton: React.FC<Props> = (props: Props) => {
	const [like, setLike] = useState<boolean>(Boolean(props.isLiked));
	const addFavorite = () => {
		setLike(!like);
		props.addToFavorite(!like);
	};
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={addFavorite}>
				<Image source={like ? images.ic_like : images.ic_unlike} />
			</TouchableOpacity>
			<Button title="Accept Request" onPress={props.acceptRequest} styles={styles.btn} />
		</View>
	);
};

export default React.memo(AcceptRequestButton);

const styles = StyleSheet.create({
	container: {
		paddingTop: sizes.s8,
		paddingBottom: sizes.s8 + getBottomSpace(),
		paddingHorizontal: sizes.s24,
		...Style.row_between,
		...Style.shadow5,
		backgroundColor: colors.white,
	},
	btn: {
		flex: 1,
		marginLeft: sizes.s16,
	},
});
