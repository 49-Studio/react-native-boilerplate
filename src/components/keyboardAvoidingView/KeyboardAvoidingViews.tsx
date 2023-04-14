import { Style } from 'assets'
import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'

interface Props {
	children: any
	style?: any
}
const KeyboardAvoidingViews: React.FC<Props> = (props: Props) => {
	return (
		<KeyboardAvoidingView
			style={[Style.container, props.style]}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
			{props.children}
		</KeyboardAvoidingView>
	)
}

export default KeyboardAvoidingViews
