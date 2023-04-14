import PushNotificationIOS from '@react-native-community/push-notification-ios'
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging'
import { getDetailDeliveryAcceptAction, getDetailDeliveryAction } from 'action/deliveriesAction'
import { navigate } from 'navigationRef'
import { Platform } from 'react-native'
import { SCREENNAME, userInfo } from 'utils/constant'
import NotiHandler from 'utils/notiHandle'
import store from '../redux/store'
var PushNotification = require('react-native-push-notification')
const requestUserPermission = async () => {
	const authStatus = await messaging().requestPermission()
	// const requets = await messaging().registerDeviceForRemoteMessages();
	const enabled =
		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authStatus === messaging.AuthorizationStatus.PROVISIONAL
	if (enabled) {
		// console.log('Authorization status:', authStatus);
	}
}

const getDeviceToken = async () => {
	try {
		const token = await firebase.messaging().getToken()
		userInfo.tokenFCM = token
		return token
	} catch (error) {
		return ''
	}
}
let deviceToken = ''
var callBack = () => { }
const handleNotiServer = (notification) => {
	if (notification?.data?.id) {
		store.dispatch(getDetailDeliveryAction(notification?.data?.id))
		store.dispatch(getDetailDeliveryAcceptAction(notification?.data?.deliveryId))
	} else {
		return
	}
}

const handleTouch = (notification) => {
	const type = notification?.data?.type
	switch (type) {
		case 'create_delivery':
			NotiHandler.setRequestId(notification?.data?.id)
			navigate(SCREENNAME.REQUEST)
			break
		case "accept_create_delivery":
		case 'accept_delivery':
			NotiHandler.setDeliveryId(notification?.data?.deliveryId)
			navigate(SCREENNAME.REQUEST)
			break
		case 'requester_chat':
			NotiHandler.setIsPendingDelivery()
			NotiHandler.setDeliveryId(notification?.data?.deliveryId)
			navigate(SCREENNAME.REQUEST)
			break
		case 'fulfil_chat':
			NotiHandler.setIsPendingRequest()
			NotiHandler.setRequestId(notification?.data?.id)
			navigate(SCREENNAME.REQUEST)
			break
		default:
			break
	}
}

const handleNotify = async (navigation) => {
	requestUserPermission()
	await callBack() // remove IOS callBack
	if (Platform.OS == 'ios')
		callBack = messaging().onMessage((mess) => {
			showForegroundIOS(mess)
		})

	PushNotification.configure({
		// (optional) Called when Token is generated (iOS and Android)
		onRegister: function (token) {
			deviceToken = token?.token
		},

		// (required) Called when a remote is received or opened, or local notification is opened
		onNotification: function (notification) {
			handleNotiServer(notification)
			if (Platform.OS == 'ios') {
				handleTouch(notification)
				// (required) Called when a remote is received or opened, or local notification is opened
				notification.finish(PushNotificationIOS.FetchResult.NoData)
			} else {
				if (notification.userInteraction) {
					handleTouch(notification)
					return
				}
				if (notification.foreground) {
					showForeground({ notification })
				}
			}
		},

		// (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
		onRegistrationError: function (err) {
			// console.error(err.message, err)
		},

		// IOS ONLY (optional): default: all - Permissions to register.
		permissions: {
			alert: true,
			badge: true,
			sound: true,
		},

		// Should the initial notification be popped automatically
		// default: true
		popInitialNotification: true,

		/**
		 * (optional) default: true
		 * - Specified if permissions (ios) and token (android and ios) will requested or not,
		 * - if not, you must call PushNotificationsHandler.requestPermissions() later
		 * - if you are not using remote notification or do not have Firebase installed, use this:
		 *     requestPermissions: Platform.OS === 'ios'
		 */
		requestPermissions: true,
	})
}

const showForeground = ({ notification }) => {
	PushNotification.createChannel(
		{
			channelId: 'channel-id', // (required)
			channelName: 'My channel', // (required)
			channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
			soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
			importance: 4, // (optional) default: 4. Int value of the Android notification importance
			vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
		},
		(created) => { } // (optional) callback returns whether the channel was created, false means it already existed.
	)
	PushNotification.localNotification({
		/* Android Only Properties */
		channelId: 'channel-id', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
		ticker: 'My Notification Ticker', // (optional)import { useDispatch } from 'react-redux';

		showWhen: true, // (optional) default: true
		autoCancel: true, // (optional) default: true
		largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
		largeIconUrl: 'ic_launcher', // (optional) default: undefined
		smallIcon: 'ic_launcher', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
		bigText: notification.message, // (optional) default: "message" prop
		subText: '', // (optional) default: none
		bigPictureUrl: 'ic_launcher', // (optional) default: undefined
		vibrate: true, // (optional) default: true
		vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
		tag: 'some_tag', // (optional) add tag to message
		group: 'group', // (optional) add group to message
		groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
		ongoing: false, // (optional) set whether this is an "ongoing" notification
		priority: 'high', // (optional) set notification priority, default: high
		visibility: 'private', // (optional) set notification visibility, default: private
		ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
		shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
		onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

		when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
		usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
		timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

		messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

		invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

		/* iOS only properties */
		alertAction: 'view', // (optional) default: view
		category: '', // (optional) default: empty string

		/* iOS and Android properties */
		// id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
		title: notification.title, // (optional)
		message: notification.message, // (required)
		userInfo: notification.data ? notification.data : {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
		playSound: true, // (optional) default: true
		soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
	})
}

const showForegroundIOS = (notification) => {
	handleNotiServer(notification)
	PushNotificationIOS.presentLocalNotification({
		alertTitle: notification.notification.title,
		alertBody: notification.notification.body,
		applicationIconBadgeNumber: 0,
		userInfo: notification.data ? notification.data : {},
	})
}
export {
	getDeviceToken,
	requestUserPermission,
	handleNotify,
	showForeground,
	showForegroundIOS,
	deviceToken,
}
