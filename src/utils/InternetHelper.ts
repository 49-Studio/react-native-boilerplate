import { Alert } from 'react-native';

export default class InternetHelper {
	static isConnected = true;
	static isShowAlert = false;

	static setNetwork(network: any) {
		this.isConnected = Boolean(network);
	}

	static isConnect() {
		if (this.isConnected) {
			this.isShowAlert = false;
			return true;
		} else {
			if (!this.isShowAlert) {
				this.isShowAlert = true;
				Alert.alert('Error', 'No internet connection!', [
					{ text: 'OK', onPress: () => (this.isShowAlert = false) },
				]);
			}
			return false;
		}
	}
}
