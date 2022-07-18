import { select, takeEvery } from 'redux-saga/effects';
import { NavigateFunction } from 'react-router-dom-v5-compat';

import { CustomFileLight } from '../../../../types';
import { SingleStepsToRoutes } from '../constants';
import { CurrentStep } from './model';
import { resetState, stepForward, stepBack } from './slice';
import { getCurrentStep, getFile } from './selectors';

interface ActionType {
	type: string;
	payload: {
		navigate: NavigateFunction;
	};
}

function* back(action: ActionType) {
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
}

function* forward(action: ActionType) {
	const currentStep: CurrentStep = yield select(getCurrentStep);
	const file: CustomFileLight | undefined = yield select(getFile);

	const { navigate } = action.payload;

	switch (currentStep) {
		case CurrentStep.Upload:
			if (file) navigate(SingleStepsToRoutes[CurrentStep.SelectFields]);
			break;
	}
}

/* eslint-disable require-yield */
function* resetRoute(action: ActionType) {
	const { navigate } = action.payload;
	navigate(SingleStepsToRoutes[0]);
}

export function* singleSaga() {
	yield takeEvery(resetState.type, resetRoute);
	yield takeEvery(stepBack.type, back);
	yield takeEvery(stepForward.type, forward);
}
