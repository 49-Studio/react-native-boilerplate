import React from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'

interface Props {
	backgroundColor?: string
	lightContent?: boolean
}
const StatusBarView: React.FC<Props> = (props: Props) => {
	return (
		<View style={{ zIndex: -1 }}>
			<SafeAreaView style={{ backgroundColor: props.backgroundColor }} />
			<View
				style={{ height: StatusBar.currentHeight, backgroundColor: props.backgroundColor }}
			/>
			<StatusBar
				barStyle={props?.lightContent ? 'light-content' : 'dark-content'}
				backgroundColor={'transparent'}
				hidden={false}
				translucent={true}
			/>
		</View>
	)
}

export default StatusBarView
