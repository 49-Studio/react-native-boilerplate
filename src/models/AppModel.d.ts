import { AuthenState } from 'redux/reducer/authen/authenReducer';
import { DeliveriesState } from 'redux/reducer/delivery/deliveriesReducer';
import { RequestState } from 'redux/reducer/request/requestReducer';

//state of redux
export interface RootState {
	authen: AuthenState;
	request: RequestState;
	deliveries: DeliveriesState;
}

export interface ResponseType {
	statusCode: 200 | 400 | 403 | 404 | 405 | 500 | null;
	data?: any;
	message?: string;
	error?: string;
	status?: any;
}

export interface UploadFilesResponse {
	_id: string;
	name: string;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	width: number;
	height: number;
	url: string;
	formats: {
		thumbnail: {
			name: string;
			hash: string;
			ext: string;
			mime: string;
			width: number;
			height: number;
			size: number;
			path: null;
			url: string;
		};
	};
	provider: 'local';
	related: any[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	id: string;
}
