import { updateProfileAction } from 'action/authenAction'
import authApi from 'api/authApi'
import { Style } from 'assets'
import {
	CountDownTime,
	HeaderWhite,
	KeyboardAvoidingViews,
	Loading,
	PinInput,
	SubmitButton,
} from 'components'
import { navigate } from 'navigationRef'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from 'selector/authenSelector'
import { SCREENNAME } from 'utils/constant'
import { phoneCodeNumber } from 'utils/function'

const VerifyCodeChangePhoneNumber: React.FC = ({ route }: any) => {
	const [code, setCode] = useState<string>('')
	const detailProfile = useSelector(userSelector)

	const dispatch = useDispatch()
	const onSubmit = () => {
		Loading.show()
		authApi
			.verifyOtp({
				phone: phoneCodeNumber(route?.params?.country_code, route?.params?.phone),
				code,
			})
			.then((res: any) => {
				if (res.valid) {
					dispatch(
						updateProfileAction({
							id: detailProfile._id,
							phone: route?.params?.phone,
							country_code: route?.params?.country_code,
							stayHere: true,
						})
					)
					navigate(SCREENNAME.SUCCESS_CHANGE_PHONE_NUMBER)
				} else {
					Alert.alert('Warning', 'Code is not valid')
				}
			})
			.catch((err) => Alert.alert('Warning', 'Code is not valid'))
			.finally(() => {
				Loading.hide()
			})
	}

	return (
		<KeyboardAvoidingViews>
			<HeaderWhite />
			<View style={[Style.container, Style.paddingHorizontal]}>
				<Text style={[Style.h2, Style.top24]}>Verification Code</Text>
				<Text style={[Style.txt14_secondary, Style.top8]}>
					Enter the verification code that has been entered into your phone number
					{` ${route?.params?.phone}`}
				</Text>
				<PinInput value={code} onChange={setCode} codeLength={6} password style={Style.top24} />
				<CountDownTime style={Style.top64} seconds={60 * 4} />
			</View>
			<SubmitButton title="Verify" onPress={onSubmit} disable={code.length < 6} />
		</KeyboardAvoidingViews>
	)
}

export default VerifyCodeChangePhoneNumber
