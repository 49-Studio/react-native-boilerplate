import NetInfo from '@react-native-community/netinfo';
import { loginAction } from 'action/authenAction';
import { Loading } from 'components';
import withCodePush from 'config/CodePush';
import { getDeviceToken, handleNotify } from 'config/Notification';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import Config from 'react-native-config';
import { Provider } from 'react-redux';
import { getStoreData, keyAsyncStorage } from 'utils/AsyncStorage';
import InternetHelper from 'utils/InternetHelper';

import MainStack from './navigation';
import store from './redux/store';

const { APP_ENV } = Config;
console.log('ENVIRONMENT', APP_ENV);

const App: React.FC = () => {
	const checkLogin = () => {
		getStoreData(keyAsyncStorage.isLogedIn).then((value) => {
			if (value) {
				store?.dispatch(
					loginAction({ identifier: value?.identifier, password: value?.password }),
				);
			}
		});
	};

	useEffect(() => {
		handleNotify();
		getDeviceToken();
		checkLogin();
		// Subscribe
		const unsubscribe = NetInfo.addEventListener((state) => {
			InternetHelper.setNetwork(state.isConnected);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<Provider store={store}>
			<StatusBar backgroundColor={'transparent'} hidden={false} translucent={true} />
			<MainStack />
			<Loading ref={(refs) => Loading.setRef(refs)} />
		</Provider>
	);
};

export default withCodePush(App);
