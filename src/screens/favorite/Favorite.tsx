import { getUserByIdAction } from 'action/authenAction';
import { colors, sizes, Style } from 'assets';
import { Header, ItemEmpty, ItemListJob } from 'components';
import { ListRequest } from 'models';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { listFavoriteSelector } from 'selector/requestSelector';

const Favorite: React.FC<any> = ({ route }: any) => {
	const [typeFilter, setTypeFilter] = useState<string>('all');
	const dataFavorite = useSelector(listFavoriteSelector);

	const dispatch = useDispatch();

	const getData = () => {
		dispatch(getUserByIdAction({}));
	};

	const renderItem = ({ item, index }: { item: ListRequest; index: number }) => {
		return <ItemListJob {...item} typeFilter={typeFilter} />;
	};

	return (
		<View style={styles.container}>
			<Header />

			<View style={[Style.row_between, { marginBottom: sizes.s10 }]}>
				<Text style={[Style.h3_medium, Style.top24, Style.left16]}>My Favourites</Text>
			</View>

			<FlatList
				data={dataFavorite}
				keyExtractor={(item, index) => String(index)}
				showsVerticalScrollIndicator={false}
				renderItem={renderItem}
				refreshing={false}
				contentContainerStyle={{ flexGrow: 1 }}
				ListEmptyComponent={<ItemEmpty title="No item favorite!" />}
				onRefresh={getData}
			/>
		</View>
	);
};

export default Favorite;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
});
