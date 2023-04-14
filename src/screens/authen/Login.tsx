import { colors, sizes } from 'assets';
import { KeyboardAvoidingViews, StatusBarView, TabView } from 'components';
import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

const Login: React.FC = ({ route }: any) => {
	const tabViewRef = useRef<any>();

	useEffect(() => {
		if (route?.params?.isSignup) {
			tabViewRef.current.setTab(1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<KeyboardAvoidingViews style={styles.container}>
			<StatusBarView backgroundColor={colors.primary} lightContent />
			<TabView
				ref={tabViewRef}
				style={styles.tab}
				labelTabLeft="Log In"
				labelTabRight="Sign Up"
				viewLeft={<LoginScreen />}
				viewRight={<SignUpScreen />}
			/>
		</KeyboardAvoidingViews>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
	},
	tab: {
		marginTop: sizes.s24,
	},
});
