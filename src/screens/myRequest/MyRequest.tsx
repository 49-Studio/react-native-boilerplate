import { colors, sizes, Style } from 'assets';
import { ItemRequest } from 'components';
import { ListRequest } from 'models';
import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { userSelector } from 'selector/authenSelector';
import { myRequestSelector } from 'selector/requestSelector';

const MyRequest: React.FC = () => {
	const user = useSelector(userSelector);
	const dataRequest = useSelector(myRequestSelector);

	const renderItem = ({
		item,
		section,
		index,
	}: {
		item: ListRequest;
		section: any;
		index: number;
	}) => {
		if (item?.owner?.id === user?.id) {
			return <ItemRequest {...item} section={section.title} />;
		}

		return <></>;
	};
	return (
		<SectionList
			sections={dataRequest}
			keyExtractor={(index) => String(index)}
			renderItem={renderItem}
			showsVerticalScrollIndicator={false}
			stickySectionHeadersEnabled={false}
			renderSectionHeader={({ section: { title, data } }) => (
				<>
					<View style={styles.title}>
						<Text style={Style.h3_bold}>{title}</Text>
					</View>
				</>
			)}
		/>
	);
};

export default MyRequest;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexGrow: 1,
		backgroundColor: colors.white,
	},
	title: {
		marginTop: sizes.s24,
		marginLeft: sizes.s16,
		marginBottom: sizes.s16,
	},
});
