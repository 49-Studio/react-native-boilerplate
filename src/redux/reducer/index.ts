import { combineReducers } from '@reduxjs/toolkit'
import { authenReducer } from './authen/authenReducer'
import { deliveriesReducer } from './delivery/deliveriesReducer'
import { requestReducer } from './request/requestReducer'
import { ultisReducer } from './ultis/ultilsReducer'

const rootReducer = combineReducers({
	authen: authenReducer,
	request: requestReducer,
	deliveries: deliveriesReducer,
	ultils: ultisReducer,
})
export { rootReducer }
