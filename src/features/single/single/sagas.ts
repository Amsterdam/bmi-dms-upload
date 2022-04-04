import { put, takeEvery } from 'redux-saga/effects';
import { setCurrentStep, resetState } from './slice';
import { push, LOCATION_CHANGE } from 'redux-first-history';
import { SingleRoutesToSteps, STEP0 } from './constants';

function* pushLocationChange(action: any) {
	try {
		const { pathname } = action.payload.location;
		yield put(setCurrentStep(SingleRoutesToSteps[pathname]));
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

export function* singleSaga() {
	yield takeEvery(resetState.type, resetRoute);
	yield takeEvery(LOCATION_CHANGE, pushLocationChange);
}
