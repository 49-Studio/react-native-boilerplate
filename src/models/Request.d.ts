export interface Request {
	id?: string;
	name?: string;
	description?: string;
	type?: 'photo_album' | 'video' | 'livestream' | '';
	deadline?: string | Date;
	delivery_time?: number;
	duration?: number;
	categories?: string[];
	budget?: number;
	picture?: any;
	is_shared?: boolean;
	owner?: string;
	status: 'active' | 'pending' | 'completed' | '';
	lat?: any;
	long?: any;
	address?: string;
	only_visbile_within_50km?: boolean;
	accept_first_request?: boolean;
	promotion?: string;
	created_by?: string;
	updated_by?: string;
	stripe_checkout_id?: string;
}
export interface CreateQuest {
	data: Request;
	totalAmount?: number;
	image?: any;
	amount: number;
	stripe_checkout_id?: string;
}
export interface RequestParams {
	id: string;
	location: string;
	type: any;
	name?: string;
	category: any;
	coordinate: {
		latitude: number;
		longitude: number;
	};
	picture?: any;
	image: {
		uri: string;
		imageName: string;
	};
	duration: number;
	period: any;
	deliveryTime: number;
	budget: number;
	description: string;
	share?: boolean;
	acceptVendor: boolean;
	only_visbile_within_50km: boolean;
	status: 'active' | 'pending' | 'completed' | '';
}
export interface Category {
	is_feature: boolean;
	_id?: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	__v?: number;
	id: string;
}
export interface ListRequest {
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
			formats: any;
			hash: string;
			ext: string;
			mime: string;
			size: 0;
			url: string;
			previewUrl: string;
			provider: string;
			provider_metadata: any;
			related: string;
			created_by: string;
			updated_by: string;
		},
	];
	type: 'photo_album' | 'video' | 'livestream' | '';
	deadline: string;
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
	owner: {
		id: string;
		username: string;
		email: string;
		provider: string;
		password: string;
		resetPasswordToken: string;
		confirmationToken: string;
		confirmed: boolean;
		blocked: boolean;
		role: string;
		name: string;
		phone: string;
		country_code: string;
		lat: number;
		long: number;
		rating: number;
		created_by: string;
		updated_by: string;
	};
	status: 'active' | 'pending' | 'completed' | '';
	lat: number;
	long: number;
	address: string;
	is_favorite: boolean;
	only_visbile_within_50km: boolean;
	accept_first_request: boolean;
	createdAt: Date | string;
	updatedAt: Date | string;
}

export interface ParamsFilterFavorite {
	sort?: any;
	category?: Category[];
	type?: any[];
	screenParam: any;
}

export interface ListTransactionPayload {
	userId?: string;
	jobType?: any[];
	sortBy?: any;
	startDate?: string | number;
	endDate?: string | number;
}

export interface ItemListTransaction {
	amount: number;
	created: number;
	currency: string;
	name: string;
	requestType: string;
}
export interface TransactionPayload {
	from?: string;
	to?: string;
	total: number;
}

export interface TransactionResponse {
	__v: number;
	_id: string;
	createdAt: string;
	from: {
		__v: number;
		_id: string;
		blocked: false;
		confirmed: true;
		country_code: string;
		createdAt: string | Date;
		email: string;
		favoriteRequests: [];
		fcm_token: string;
		id: string;
		lat: number;
		long: number;
		name: string;
		phone: string;
		provider: string;
		role: string;
		updatedAt: string;
		username: string;
	};
	id: string;
	total: number;
	updatedAt: string | Date;
}

export interface WithdrawPayload {
	amount: any;
	currency: string;
}
