class NotiHandler {
	static requestId = ''
	static deliveryId = ''
	static isPendingRequest = false
	static isPendingDelivery = false
	//////
	static setRequestId(id: string) {
		this.requestId = id
	}

	static setDeliveryId(id: string) {
		this.deliveryId = id
	}

	static setIsPendingRequest() {
		this.isPendingRequest = true
	}

	static setIsPendingDelivery() {
		this.isPendingDelivery = true
	}
	//////
	static clearRequestId() {
		this.requestId = ''
	}

	static clearDeliveryId() {
		this.deliveryId = ''
	}

	static clearIspendingRequest() {
		this.isPendingRequest = false
	}

	static clearIsPendingDelivery() {
		this.isPendingDelivery = false
	}
}

export default NotiHandler
