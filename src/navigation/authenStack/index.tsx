import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screenOptionsNativeStack } from 'navigation';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import {
	CongratScreen,
	ForgotPassword,
	Login,
	NewPassword,
	PhoneScreen,
	VerificationScreen,
	VerifiResetPassword,
} from 'screens';
import { SCREENNAME } from 'utils/constant';
enableScreens();

function AuthenStack() {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator screenOptions={screenOptionsNativeStack}>
			<Stack.Screen name={SCREENNAME.LOGIN} component={Login} />
			<Stack.Screen name={SCREENNAME.PHONE} component={PhoneScreen} />
			<Stack.Screen name={SCREENNAME.VERIFICATION} component={VerificationScreen} />
			<Stack.Screen name={SCREENNAME.CONGRAT} component={CongratScreen} />
			<Stack.Screen name={SCREENNAME.FORGOTPASSWORD} component={ForgotPassword} />
			<Stack.Screen name={SCREENNAME.VERIFIRESETPASSWORD} component={VerifiResetPassword} />
			<Stack.Screen name={SCREENNAME.NEWPASSWORD} component={NewPassword} />
		</Stack.Navigator>
	);
}

export default AuthenStack;
