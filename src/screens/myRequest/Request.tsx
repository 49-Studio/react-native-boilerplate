import { useIsFocused } from '@react-navigation/native'
import { getListDeliveryAction } from 'action/deliveriesAction'
import { getListRequestAction } from 'action/requestAction'
import { colors, sizes } from 'assets'
import { Header, TabViewRequest } from 'components'
import _ from 'lodash'
import { navigate } from 'navigationRef'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { listDeliverySelector } from 'selector/deliveriesSelector'
import { myRequestSelector } from 'selector/requestSelector'
import { SCREENNAME } from 'utils/constant'
import NotiHandler from 'utils/notiHandle'
import FulFilRequest from './FulFilRequest'
import MyRequest from './MyRequest'

const Request: React.FC = ({ route }: any) => {
	const tabViewRef = useRef<any>()
	const dispatch = useDispatch()
	const isFocused = useIsFocused()
	const dataRequest = useSelector(myRequestSelector)
	const listDelivery = useSelector(listDeliverySelector)

	const getData = () => {
		dispatch(getListDeliveryAction())
		dispatch(getListRequestAction())
	}
	useEffect(() => {
		isFocused && getData()
		route.params?.tab && tabViewRef.current?.setTab(route.params?.tab)
	}, [isFocused])

	useEffect(() => {
		if (NotiHandler.requestId && !_.isEmpty(dataRequest)) {
			const data = NotiHandler.isPendingRequest ? dataRequest[1]?.data : dataRequest[0]?.data
			const request = data?.find((e: any) => e?.id === NotiHandler.requestId)
			request && navigate(SCREENNAME.DETAIL_REQUEST, request)
			NotiHandler.clearRequestId()
			NotiHandler.clearIspendingRequest()
		}
	}, [dataRequest])

	useEffect(() => {
		if (NotiHandler.deliveryId && !_.isEmpty(listDelivery)) {
			tabViewRef.current?.setTab(1)
			const data = NotiHandler.isPendingDelivery ? listDelivery[1]?.data : listDelivery[0]?.data
			const delivery = data?.find((e: any) => e?.id === NotiHandler.deliveryId)
			delivery && navigate(SCREENNAME.MESSAGING_ACCEPT, delivery)
			NotiHandler.clearDeliveryId()
			NotiHandler.clearIsPendingDelivery()
		}
	}, [listDelivery])

	return (
		<View style={styles.container}>
			<Header />
			<TabViewRequest
				ref={tabViewRef}
				style={styles.viewTab}
				labelTabLeft="My Request"
				labelTabRight="Fulfil a Request"
				viewLeft={<MyRequest />}
				viewRight={<FulFilRequest />}
			/>
		</View>
	)
}

export default Request

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	viewTab: {
		marginTop: sizes.s24,
	},
})
