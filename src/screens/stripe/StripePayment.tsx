import { createRequestAction } from 'action/requestAction';
import { HeaderWhite } from 'components';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { useDispatch } from 'react-redux';

const StripePayment: React.FC<any> = ({ route }: any) => {
	const [hasBeenCalled, setHasBeenCalled] = useState<boolean>(false);
	const payment_request = route?.params;
	const webViewRef = useRef<any>(null);
	const [url, setUrl] = useState<string>('');
	const dispatch = useDispatch();

	const onNavigationStateChange = (e: WebViewNavigation) => {
		const data = e;
		if (data.url === 'https://www.snap4me.com/payment/success') {
			if (hasBeenCalled) {
				return;
			}
			dispatch(
				createRequestAction({
					data: payment_request?.data,
					amount: payment_request?.amount,
					totalAmount: payment_request?.totalAmount,
					stripe_checkout_id: payment_request?.stripe_checkout_id,
				}),
			);
			setHasBeenCalled(true);
		}
		return;
	};

	useEffect(() => {
		setUrl(payment_request?.url);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [payment_request]);

	return (
		<View style={styles.container}>
			<HeaderWhite title="Payment" isGoBack />
			<WebView
				ref={webViewRef}
				style={{ flex: 1 }}
				source={{ uri: url ? url : '' }}
				onNavigationStateChange={onNavigationStateChange}
				javaScriptEnabled={true}
				allowsBackForwardNavigationGestures={true}
			/>
		</View>
	);
};

export default StripePayment;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
