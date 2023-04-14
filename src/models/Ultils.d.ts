export interface Term {
	_id: string;
	name: string;
	title: string;
	body: string;
	published_at: string | Date;
	createdAt: string | Date;
	updatedAt: string | Date;
	__v: number;
	id: string;
}
export interface Policy {
	_id: string;
	name: string;
	title: string;
	body: string;
	published_at: string | Date;
	createdAt: string | Date;
	updatedAt: string | Date;
	__v: number;
	id: string;
}
export interface Concurrencies {
	AUD: string;
	BGN: string;
	BRL: string;
	CAD: string;
	CHF: string;
	CNY: string;
	CZK: string;
	DKK: string;
	EUR: string;
	GBP: string;
	HKD: string;
	HRK: string;
	HUF: string;
	IDR: string;
	ILS: string;
	INR: string;
	ISK: string;
	JPY: string;
	KRW: string;
	MXN: string;
	MYR: string;
	NOK: string;
	NZD: string;
	PHP: string;
	PLN: string;
	RON: string;
	SEK: string;
	SGD: string;
	THB: string;
	TRY: string;
	USD: string;
	ZAR: string;
}
