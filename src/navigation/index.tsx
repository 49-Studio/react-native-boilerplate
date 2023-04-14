import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { navigationRef } from 'navigationRef';
import React from 'react';
import { Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { Welcome } from 'screens';
import { SCREENNAME, STACKNAME } from 'utils/constant';
import AuthenStack from './authenStack';
import HomeStack from './homeStack';

enableScreens();
export const screenOptionsNativeStack: any = {
	headerShown: false,
	customAnimationOnGesture: true,
	fullScreenGestureEnabled: true,
	gestureEnabled: true,
	animationTypeForReplace: 'push',
	animation: 'slide_from_right',
	presentation: Platform.OS === 'android' ? 'modal' : '',
};

export const screenOptionsStack: any = {
	headerShown: false,
	presentation: 'modal',
	gestureEnabled: true,
	...TransitionPresets.SlideFromRightIOS,
};

const MainStack: React.FC = () => {
	const Stack = createNativeStackNavigator();
	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator screenOptions={screenOptionsNativeStack}>
				<Stack.Screen name={SCREENNAME.WELCOME} component={Welcome} />
				<Stack.Screen name={STACKNAME.AUTHENTICATION} component={AuthenStack} />
				<Stack.Screen name={STACKNAME.HOME} component={HomeStack} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};
export default MainStack;
