import { NavigateFunction } from 'react-router-dom';
import { select, takeEvery } from 'redux-saga/effects';

import { CustomFileLight } from '../../../../types';
import { resetState, stepForward, stepBack } from './slice';
import { BulkStepsToRoutes } from '../constants';
import { getCurrentStep, getFiles } from './selectors';
import { CurrentStep } from './model';

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
			case CurrentStep.EditFields:
				navigate(BulkStepsToRoutes[CurrentStep.SelectFields]);
				break;
			case CurrentStep.SelectFields:
				navigate(BulkStepsToRoutes[CurrentStep.Upload]);
				break;
			case CurrentStep.Upload:
				navigate(BulkStepsToRoutes[CurrentStep.Button]);
				break;
		}
	} catch (e: any) {
		console.log('back fail', e);
	}
}

function* forward(action: ActionType) {
	try {
		const currentStep: CurrentStep = yield select(getCurrentStep);
		const files: CustomFileLight | undefined = yield select(getFiles);

		const { navigate } = action.payload;

		switch (currentStep) {
			case CurrentStep.Upload:
				if (files) navigate(BulkStepsToRoutes[CurrentStep.SelectFields]);
				break;
			case CurrentStep.SelectFields:
				navigate(BulkStepsToRoutes[CurrentStep.EditFields]);
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
		navigate(BulkStepsToRoutes[0])
	} catch (e: any) {
		console.log('resetRoute fail', e);
	}
}

export function* bulkSaga() {
	yield takeEvery(resetState.type, resetRoute);
	yield takeEvery(stepBack.type, back);
	yield takeEvery(stepForward.type, forward);
}
