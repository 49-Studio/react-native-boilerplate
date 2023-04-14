export interface ItemListJobType {
	id: number | string
	title: string
	image: string
	author: string
	price: number | string
	rate: number | string
	type: 'Live' | 'Picture' | 'Video'
}
