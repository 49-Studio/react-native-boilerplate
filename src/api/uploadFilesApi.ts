import { Asset } from 'react-native-image-picker';

import axiosClient from './axiosClient';

export class uploadFilesApi {
	static upload(file?: any) {
		const bodyFormData = new FormData();
		bodyFormData.append('files', file);
		const url = '/upload';
		return new Promise((resolve, reject) => {
			const res: any = axiosClient.post(url, bodyFormData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				transformRequest: (data, headers) => {
					// !!! override data to return formData
					// since axios converts that to string
					return bodyFormData;
				},
			});
			if (res) {
				resolve(res);
			} else {
				reject();
			}
		});
	}

	static uploadMulti(file: Asset[] = []) {
		let bodyFormData = new FormData();
		if (file.length <= 0) {
			return new Promise((resolve, reject) => {
				reject();
			});
		}
		for (let media of file) {
			const files = {
				uri: media.uri,
				type: media.type,
				name: media.fileName,
				fileSize: media.fileSize,
			};
			bodyFormData.append('files', files);
		}

		const url = '/upload';
		return new Promise((resolve, reject) => {
			const res: any = axiosClient.post(url, bodyFormData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				transformRequest: (data, headers) => {
					// !!! override data to return formData
					// since axios converts that to string
					return bodyFormData;
				},
			});
			if (res) {
				resolve(res);
			} else {
				reject();
			}
		});
	}
}
