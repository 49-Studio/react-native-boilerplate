/**
 * @format
 */
import messaging, { firebase } from '@react-native-firebase/messaging';
import { AppRegistry, YellowBox, Text } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

if (__DEV__) {
	// network logger for debugging using react-native-debugger
	global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
} else {
	console.log = () => null;
	console.info = () => null;
	console.warn = () => null;
	console.error = () => null;
	console.groupCollapsed = () => null;
	console.groupEnd = () => null;
}

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
YellowBox.ignoreWarnings(['']);
// push notification
firebase.messaging().subscribeToTopic('AllDevices');
messaging().setBackgroundMessageHandler(async (remoteMessage) => {});
AppRegistry.registerComponent(appName, () => App);
