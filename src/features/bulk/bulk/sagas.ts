import { put, takeEvery } from 'redux-saga/effects';
import { setCurrentStep, resetState } from './slice';
import { LOCATION_CHANGE, push } from 'redux-first-history';
import { BulkRoutesToSteps, STEP0} from './constants';

function* pushLocationChange(action: any) {
	try {
		const { pathname } = action.payload.location;
		console.log("BULK: ", BulkRoutesToSteps[pathname])
		yield put(setCurrentStep(BulkRoutesToSteps[pathname]));
	} catch (e: any) {
		console.log('pushLocationChange fail: ', e);
	}
}

function* resetRoute() {
	try {
		yield put(push(STEP0));
	} catch (e: any) {
		console.log('resetRoute fail', e);
	}
}

export function* bulkSaga() {
	yield takeEvery(resetState.type, resetRoute);
	yield takeEvery(LOCATION_CHANGE, pushLocationChange);
}
