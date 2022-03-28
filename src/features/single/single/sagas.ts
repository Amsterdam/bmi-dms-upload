import { put, takeEvery, select } from 'redux-saga/effects';
import { setCurrentStep, setCurrentStepNext, setCurrentStepPrev, resetState } from './slice';
import { getCurrentStepFromStore, getFileFromStore } from './selectors';
import { CurrentStep } from './model';
import { push } from 'redux-first-history';
import { CustomFileLight } from '../../../types';
import { STEP0, STEP1, STEP2 } from './constants';

function* prevStep() {
	try {
		const currentStep: CurrentStep = yield select(getCurrentStepFromStore);
		let route = '/';

		switch (currentStep) {
			case CurrentStep.SelectFields:
				yield put(setCurrentStep(CurrentStep.Upload));
				route = STEP1;
				break;
			default:
				yield put(setCurrentStep(CurrentStep.Button));
				route = STEP0;
				break;
		}
		yield put(push(route));
	} catch (e: any) {
		console.log('prevStep fail', e);
	}
}

function* nextStep() {
	try {
		const currentStep: CurrentStep = yield select(getCurrentStepFromStore);
		const fileFromStore: CustomFileLight = yield select(getFileFromStore);
		let route = STEP0;
		let newRoute = false;

		switch (currentStep) {
			case CurrentStep.Upload:
				if (fileFromStore) {
					yield put(setCurrentStep(CurrentStep.SelectFields));
					route = STEP2;
					newRoute = true
				}
				break;
			default:
				yield put(setCurrentStep(CurrentStep.Upload));
				route = STEP1;
				newRoute = true
				break;
		}

		if (newRoute) yield put(push(route));
	} catch (e: any) {
		console.log('nextStep fail', e);
	}
}

function* resetRoute() {
	try {
		yield put(setCurrentStep(CurrentStep.Button));
		yield put(push(STEP0));
	} catch (e: any) {
		console.log('resetRoute fail', e);
	}
}

export function* singleSaga() {
	yield takeEvery(setCurrentStepPrev.type, prevStep);
	yield takeEvery(setCurrentStepNext.type, nextStep);
	yield takeEvery(resetState.type, resetRoute);
}
