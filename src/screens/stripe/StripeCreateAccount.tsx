import { HeaderWhite } from 'components';
import { goBack } from 'navigationRef';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';

const StripeCreateAccount: React.FC<any> = ({ route }: any) => {
	const linkCreateAccount = route?.params?.data?.data.url;
	const webViewRef = useRef<any>(null);

	const onNavigationStateChange = (e: WebViewNavigation) => {
		if (e?.url.includes('https://www.snap4me.com/strapi/return')) {
			goBack();
		}
	};
	return (
		<View style={styles.container}>
			<HeaderWhite title="Create Account Stripe" />
			<WebView
				ref={webViewRef}
				style={{ flex: 1 }}
				source={{ uri: linkCreateAccount }}
				onNavigationStateChange={onNavigationStateChange}
				javaScriptEnabled={true}
				javaScriptCanOpenWindowsAutomatically={true}
				allowsBackForwardNavigationGestures={true}
			/>
		</View>
	);
};

export default StripeCreateAccount;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
