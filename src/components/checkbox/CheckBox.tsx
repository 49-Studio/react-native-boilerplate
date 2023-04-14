import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { colors, images, sizes, Style } from 'assets';
import _ from 'lodash';
interface Props {
	data: any[];
	value?: any[];
	onChange?: (value: any) => void;
}

const CheckBox: React.FC<Props> = ({ data = [], value = [], onChange = () => {} }: Props) => {
	const dataSelected: any[] = value;
	return (
		<View style={styles.container}>
			{data.map((item, index) => {
				const isSelected = dataSelected.some((e) => e.id === item.id);
				return (
					<Item
						key={index}
						title={item.title}
						isSelected={isSelected}
						onChange={(selected: boolean) => {
							if (selected) {
								dataSelected.push(item);
							} else {
								for (let index = 0; index < dataSelected.length; index++) {
									if (item.id === dataSelected[index].id) {
										dataSelected.splice(index, 1);
									}
								}
							}
							onChange(dataSelected);
						}}
					/>
				);
			})}
		</View>
	);
};

const Item = memo((props: any) => {
	useEffect(() => {
		setSelected(props.isSelected);
	}, [props.isSelected]);
	const [selected, setSelected] = useState<boolean>(props.isSelected);
	return (
		<TouchableOpacity
			style={Style.row}
			onPress={() => {
				setSelected(!selected);
				props.onChange(!selected);
			}}>
			<Image
				source={selected ? images.ic_checkbox_checked : images.ic_checkbox_uncheck}
				style={[Style.icon24, !selected ? { tintColor: colors.disable_text } : null]}
			/>
			<Text style={[Style.txt14_secondary, { marginLeft: sizes.s10 }]}>{props.title}</Text>
		</TouchableOpacity>
	);
});

export default React.memo(CheckBox);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: sizes.s30,
	},
});
