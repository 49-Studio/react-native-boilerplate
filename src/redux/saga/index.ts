import { all } from 'redux-saga/effects'
import authenSaga from './authenSaga'
import deliveriesSaga from './deliveriesSaga'
import requestSaga from './requestSaga'
import ultilsSaga from './ultilsSaga'
export function* rootSaga() {
	yield all([authenSaga(), requestSaga(), deliveriesSaga(), ultilsSaga()])
}
