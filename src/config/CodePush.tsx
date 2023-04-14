import { UpdateView } from 'components';
import React from 'react';
import CodePush from 'react-native-code-push';

//auto check when open app
const CODE_PUSH_OPTIONS = {
	checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
};

const withCodePush = (WrappedComponent: any) => {
	class WrappedApp extends React.PureComponent<any, any> {
		state = {
			loading: false,
			percent: 0,
		};
		componentDidMount() {
			CodePush.sync(
				{
					// updateDialog: {
					//    title: 'Thông báo cập nhật',
					//    optionalIgnoreButtonLabel: 'Để sau',
					//    optionalInstallButtonLabel: 'Cập nhật',
					//    optionalUpdateMessage: 'Đã có bản cập nhật mới, bạn vui lòng cập nhật ứng dụng',
					// },
					installMode: CodePush.InstallMode.IMMEDIATE,
				},
				(status) => {
					if (status === CodePush.SyncStatus.UPDATE_INSTALLED) {
						this.setState({ loading: false });
					}
				},
				(process) => {
					this.setState({
						loading: true,
						percent: Math.round((process.receivedBytes / process.totalBytes) * 100),
					});
				},
			);
		}

		render() {
			return (
				<>
					<UpdateView
						visible={this.state.loading}
						percent={`${String(this.state.percent)}%`}
					/>
					<WrappedComponent />
				</>
			);
		}
	}
	return CodePush(CODE_PUSH_OPTIONS)(WrappedApp);
};
export default withCodePush;
