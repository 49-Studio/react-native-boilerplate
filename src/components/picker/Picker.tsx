import { colors, images, screenHeight, sizes, Style } from 'assets';
import { BottomSheet } from 'components';
import React, { memo, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface Props {
	label: string;
	style?: ViewStyle;
	value?: any;
	data: any;
	labelKey?: string;
	height?: number;
	callBack: (item: any) => void;
}
const Picker: React.FC<Props> = (props: Props) => {
	const [selectedItem, setSelectedItem] = useState<any>(props.value);
	const [title, setTitle] = useState<any>('Choose');
	const BottomSheetRef = useRef<any>();
	const open = (): void => {
		BottomSheetRef.current.open();
	};
	const onChangeItem = (item: any) => {
		setSelectedItem(item);
		BottomSheetRef.current.close();
		props?.callBack && props?.callBack?.(item);
		setTitle(item?.title);
	};

	const renderItem = ({ item, index }: any) => (
		<Item
			key={index}
			title={item.title}
			selected={selectedItem === item}
			onChangeItem={() => onChangeItem(item)}
		/>
	);
	return (
		<>
			<TouchableOpacity style={styles.picker} onPress={open}>
				<Text style={styles.titlePicker}>{props?.value || title}</Text>
				<View style={styles.iconPicker}>
					<Image style={{ ...Style.icon24 }} source={images.ic_arrow_down} />
				</View>
			</TouchableOpacity>

			<BottomSheet
				ref={BottomSheetRef}
				title={props.label}
				style={{ height: screenHeight * 0.6 }}>
				<FlatList
					data={props.data}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item, index) => String(index)}
					renderItem={renderItem}
					contentContainerStyle={{ flexGrow: 1 }}
					style={{ paddingBottom: sizes.s24 }}
				/>
			</BottomSheet>
		</>
	);
};

export default Picker;
// eslint-disable-next-line react/display-name
const Item = memo(({ onChangeItem, selected, title }: any) => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={onChangeItem}
			style={[styles.item, selected && { backgroundColor: colors.primary }]}>
			<Image source={selected && images.ic_selected} style={Style.icon24} />
			<Text style={[styles.text, selected && { color: colors.white }]}>{title}</Text>
		</TouchableOpacity>
	);
});
Picker.defaultProps = {
	height: screenHeight * 0.5,
};
const styles = StyleSheet.create({
	picker: {
		...Style.row,
		// width: sizes.s100,
		height: sizes.s52,
		borderRadius: 100,
		borderWidth: sizes.s1,
		borderColor: colors.border,
		marginTop: sizes.s16,
		paddingHorizontal: sizes.s16,
		backgroundColor: colors.white,
	},
	titlePicker: {
		...Style.txt16,
	},
	iconPicker: { position: 'absolute', top: sizes.s13, right: sizes.s16 },
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		height: sizes.s52,
		paddingHorizontal: sizes.s16,
		borderBottomColor: colors.border,
		borderBottomWidth: 1,
		backgroundColor: colors.white,
	},
	text: {
		...Style.content14,
		marginLeft: sizes.s16,
	},
	button: {
		marginVertical: sizes.s24,
		marginHorizontal: sizes.s16,
	},
});
