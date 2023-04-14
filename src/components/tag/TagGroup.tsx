import { images, Style } from 'assets';
import _ from 'lodash';
import React, { PureComponent } from 'react';
import { Image, Text, View } from 'react-native';

import { Tag } from './Tag';

interface Props {
	style?: any;
	data: any[];
	keyTitle: string;
	onChange: (value: any) => void;
	value?: any;
}
interface States {
	selected: any;
	error: boolean;
	txtError: string;
}
export class TagGroup extends PureComponent<Props, States> {
	constructor(props: Props) {
		super(props);
		this.state = {
			selected: [],
			error: false,
			txtError: '',
		};
	}
	static defaultProps = {
		keyTitle: 'name',
	};
	clearValue() {
		this.setState({ selected: [] });
		this.props.onChange([]);
	}
	showError = (txt: string) => {
		this.setState({ error: true, txtError: txt });
	};
	componentDidMount() {
		this.setState({ selected: this.props.value || [] });
	}

	render() {
		return (
			<View>
				<View style={[Style.row_wrap, { alignContent: 'center', justifyContent: 'center' }]}>
					{this.props?.data?.map((item, index) => {
						const isSelected = this.state.selected?.some((e: any) => e?.id == item?.id);
						return (
							<Tag
								key={index}
								error={this.state.error}
								selected={isSelected}
								title={item[this.props?.keyTitle]}
								onChange={() => {
									if (isSelected) {
										_.remove(this.state.selected, (e: any) => e?.id == item?.id);
									} else {
										this.state.selected.push(item);
									}
									this.setState(
										{
											selected: [...this.state.selected],
											error: false,
											txtError: '',
										},
										() => {
											this.props.onChange(this.state.selected);
										},
									);
								}}
							/>
						);
					})}
				</View>
				{Boolean(this.state.txtError) && (
					<View style={Style.row}>
						<Image source={images.ic_error} style={Style.icon20} />
						<Text style={Style.txt12_error}>{` ${this.state.txtError}`}</Text>
					</View>
				)}
			</View>
		);
	}
}

export default TagGroup;
