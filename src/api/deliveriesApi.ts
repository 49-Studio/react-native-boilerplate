import { CreateDeliveryPayload, ListDelivery, ReviewPayload } from 'models';

import axiosClient from './axiosClient';

class deliveriesApi {
	static createDelivery(data: CreateDeliveryPayload) {
		const url = '/deliveries';
		return axiosClient.post(url, data);
	}

	static updateDeliveries(id = '', data: any) {
		const url = `/deliveries/${id}`;
		return axiosClient.put(url, data);
	}

	static getListDelivery() {
		const url = '/deliveries';
		return axiosClient.get(url);
	}

	static getDetailDelivery(id: string) {
		const url = `/deliveries/${id}`;
		return axiosClient.get(url);
	}

	static getDetailDeliveryByRequestId(id: string): ListDelivery[] | any {
		const url = `deliveries?request=${id}`;
		return axiosClient.get(url);
	}

	static acceptVendorDelivery(id = '', type: 'accept' | 'reject') {
		const url = `deliveries/${id}`;
		const body =
			type === 'accept'
				? {
						status: 'pending_delivery',
				  }
				: {
						requester_status: 'awaiting_delivery',
				  };

		return axiosClient.put(url, body);
	}

	static updateStatusReviewDeliveries(id = '') {
		const url = `deliveries/${id}`;
		const body = {
			requester_status: 'review_delivery',
			status: 'pending_review',
		};
		return axiosClient.put(url, body);
	}

	static updateStatusDeliveries(id = '', type: 'accept' | 'reject') {
		const url = `deliveries/${id}`;
		const body =
			type === 'accept'
				? {
						status: 'completed',
						requester_status: 'completed',
				  }
				: {
						status: 'rejected',
						requester_status: 'rejected',
				  };
		return axiosClient.put(url, body);
	}

	static sendMessageMyRequest({ content, id }: any) {
		const url = `messages`;
		return axiosClient.post(url, {
			is_from_requester: true,
			content: content,
			delivery: id,
		});
	}

	static sendMessageFullfilRequest({ content, delivery, files }: any) {
		const url = `messages`;
		return axiosClient.post(url, {
			is_from_requester: false,
			content: content,
			delivery: delivery,
			files: files || [],
		});
	}

	static reviewUser(data: ReviewPayload) {
		const url = `ratings`;
		return axiosClient.post(url, data);
	}

	static getReviewByUser(id = '') {
		const url = `ratings?receiver=${id}`;
		return axiosClient.get(url);
	}
}
export default deliveriesApi;
