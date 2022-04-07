import { select, takeEvery } from 'redux-saga/effects';
import { resetState, stepForward, stepBack } from './slice';
import { SingleStepsToRoutes } from './constants';
import { getCurrentStep, getFile } from './selectors';
import { CurrentStep } from './model';
import { CustomFileLight } from '../../../types';
import { NavigateFunction } from 'react-router-dom';

interface ActionType {
	type: string;
	payload: {
		navigate: NavigateFunction;
	};
}

function* back(action: ActionType) {
	try {
		const currentStep: CurrentStep = yield select(getCurrentStep);
		const { navigate } = action.payload;

		switch (currentStep) {
			case CurrentStep.SelectFields:
				navigate(SingleStepsToRoutes[CurrentStep.Upload]);
				break;
			case CurrentStep.Upload:
				navigate(SingleStepsToRoutes[CurrentStep.Button]);
				break;
		}
	} catch (e: any) {
		console.log('back fail', e);
	}
}

function* forward(action: ActionType) {
	try {
		const currentStep: CurrentStep = yield select(getCurrentStep);
		const file: CustomFileLight | undefined = yield select(getFile);

		const { navigate } = action.payload;

		switch (currentStep) {
			case CurrentStep.Upload:
				if (file) navigate(SingleStepsToRoutes[CurrentStep.SelectFields]);
				break;
		}
	} catch (e: any) {
		console.log('forward fail', e);
	}
}

/* eslint-disable require-yield */
function* resetRoute(action: ActionType) {
	try {
		const { navigate } = action.payload;
		navigate(SingleStepsToRoutes[0])
	} catch (e: any) {
		console.log('resetRoute fail', e);
	}
}

export function* singleSaga() {
	yield takeEvery(resetState.type, resetRoute);
	yield takeEvery(stepBack.type, back);
	yield takeEvery(stepForward.type, forward);
}
