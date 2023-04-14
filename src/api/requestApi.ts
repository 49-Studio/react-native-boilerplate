import _ from 'lodash';
import { ListTransactionPayload, ParamsFilterFavorite, Request, TransactionPayload } from 'models';
import axiosClient from './axiosClient';

class requestApi {
	static getCategory() {
		const url = '/categories';
		return axiosClient.get(url);
	}

	static getListRequest() {
		const url = '/requests';
		return axiosClient.get(url);
	}

	static filterFavorite(params: ParamsFilterFavorite) {
		const sort = params.sort ? `_sort=${params.sort}&` : '';
		const category = !_.isEmpty(params.category)
			? params.category
					?.map((e) => `categories.name_in=${e.name}&`)
					?.toString()
					?.replaceAll(',', '')
			: '';
		const type = !_.isEmpty(params.type)
			? params.type
					?.map((e) => `type_in=${e?.type}&`)
					?.toString()
					?.replaceAll(',', '')
			: '';

		const url = `/requests?${sort}${category}${type}`;

		return axiosClient.get(url);
	}

	static searchRequest(param: any) {
		const url = `/requests${param}`;
		return axiosClient.get(url);
	}

	static addRequestToFavorite(id: string) {
		const url = '/requests/addFavorite';
		return axiosClient.post(url, { requestIds: [id], action: 'add' });
	}

	static removeRequestToFavorite(id: string) {
		const url = '/requests/addFavorite';
		return axiosClient.post(url, { requestIds: [id], action: 'remove' });
	}

	static createRequest(data: Request) {
		const url = '/requests';
		return axiosClient.post(url, data);
	}

	static editRequest(data: Request | any) {
		const url = `/requests/${data.id}`;
		return axiosClient.put(url, data);
	}

	static updateView(data: any) {
		const url = `/requests/${data.id}`;
		return axiosClient.put(url, data);
	}

	static getDetailRequest(data: string) {
		const url = `/requests/${data}`;
		return axiosClient.get(url);
	}

	static deleteRequest(id: string) {
		const url = `/requests/${id}`;
		return axiosClient.delete(url);
	}

	static transaction(data: TransactionPayload | any) {
		const url = '/transactions';
		return axiosClient.post(url, data);
	}

	static getListTransaction(data?: ListTransactionPayload) {
		const jonType = !_.isEmpty(data?.jobType)
			? data?.jobType
					?.map((e) => `job_type=${e?.type}&`)
					?.toString()
					?.replaceAll(',', '')
			: '';
		const startDate = data?.startDate ? `from=${data?.startDate}&` : '';
		const endDate = data?.endDate ? `to=${data?.endDate}` : '';

		const url = `/users/me/transactions?${jonType}${startDate}${endDate}`;
		return axiosClient.get(url);
	}

	static requestPayment(data: any) {
		const url = '/requests/charge';
		return axiosClient.post(url, data);
	}
}
export default requestApi;
