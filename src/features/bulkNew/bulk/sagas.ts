import { put, takeEvery, select } from 'redux-saga/effects';
import { setCurrentStep, setCurrentStepNext, setCurrentStepPrev, resetState } from './slice';
import { getCurrentStepFromStore, getFilesFromStore } from './selectors';
import { CurrentStep, IBulkFile } from './model';
import { push } from 'redux-first-history';
import { STEP0, STEP1, STEP2, STEP3 } from './constants';

function* prevStep(action: any) {
	try {
		const currentStep: CurrentStep = yield select(getCurrentStepFromStore);
		let route = '/';

		switch (currentStep) {
			case CurrentStep.SelectFields:
				yield put(setCurrentStep(CurrentStep.Upload));
				route = STEP1;
				break;
			case CurrentStep.EditFields:
				yield put(setCurrentStep(CurrentStep.SelectFields));
				route = STEP2;
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

function* nextStep(action: any) {
	try {
		const currentStep: CurrentStep = yield select(getCurrentStepFromStore);
		const filesFromStore: IBulkFile[] = yield select(getFilesFromStore);
		let route = STEP0;
		let newRoute = false;

		switch (currentStep) {
			case CurrentStep.Upload:
				if (filesFromStore.length !== 0) {
					yield put(setCurrentStep(CurrentStep.SelectFields));
					route = STEP2;
					newRoute = true
				}
				break;
			case CurrentStep.SelectFields:
				yield put(setCurrentStep(CurrentStep.EditFields));
				route = STEP3;
				newRoute = true
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

export function* bulkSaga() {
	yield takeEvery(setCurrentStepPrev.type, prevStep);
	yield takeEvery(setCurrentStepNext.type, nextStep);
	yield takeEvery(resetState.type, resetRoute);
}
