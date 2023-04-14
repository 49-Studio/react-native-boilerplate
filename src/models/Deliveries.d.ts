import { User } from './User';

export interface CreateDeliveryPayload {
	request: string;
	owner: string;
	status: 'awaiting_request_confirmation';
	requester_status: 'awaiting_delivery';
}

export type DeliveryStatus =
	| 'awaiting_request_confirmation'
	| 'pending_delivery'
	| 'pending_review'
	| 'pending_revision'
	| 'completed'
	| 'rejected';

export type DeliveryRequesterStatus =
	| 'awaiting_delivery'
	| 'review_delivery'
	| 'completed'
	| 'rejected';

export interface DeliveryRequest {
	id: string;
	name: string;
	description: string;
	viewer: number;
	picture: [
		{
			id: string;
			name: string;
			alternativeText: string;
			caption: string;
			width: 0;
			height: 0;
			formats: {};
			hash: string;
			ext: string;
			mime: string;
			size: 0;
			url: string;
			previewUrl: string;
			provider: string;
			provider_metadata: {};
			related: string;
			created_by: string;
			updated_by: string;
		},
	];
	type: 'photo_album' | 'video' | 'livestream' | '';
	deadline: Date | string;
	delivery_time: number;
	duration: number;
	categories: [
		{
			id: string;
			name: string;
			is_feature: boolean;
			created_by: string;
			updated_by: string;
		},
	];
	budget: number;
	is_shared: boolean;
	owner: string; //id user của người tạo request
	status: 'active' | 'pending' | 'complete' | '';
	lat: number;
	long: number;
	address: string;
	is_favorite: boolean;
	only_visbile_within_50km: boolean;
	accept_first_request: boolean;
	createdAt: Date | string;
	updatedAt: Date | string;
}

export interface Message {
	__v: number;
	_id: string;
	content: string;
	createdAt: string;
	delivery: string;
	id: string;
	is_from_requester: boolean;
	published_at: string;
	updatedAt: string;
	files: Files[];
}
export interface Files {
	_id: string;
	createdAt: string;
	ext: string;
	hash: string;
	height: any;
	id: string;
	mime: string;
	name: string;
	provider: string;
	related: string[];
	size: 7799.73;
	updatedAt: string;
	url: string;
	width: any;
}
export interface ListDelivery {
	status: DeliveryStatus;
	requester_status: DeliveryRequesterStatus;
	media: any[];
	_id: string;
	createdAt: string | Date | '';
	updatedAt: string | Date | '';
	owner: User; // user infor của người accept request
	request: DeliveryRequest;
	messages: Message[];
	id: string;
	reject_count?: number;
	livestream_url?: string;
	playback_url?: string;
}

export interface ReviewPayload {
	star: number;
	comment: string;
	owner: string;
	receiver: string;
}
export interface Review {
	_id: string;
	star: number;
	comment: string;
	published_at: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	owner: User;
	receiver: User;
	id: string;
}
