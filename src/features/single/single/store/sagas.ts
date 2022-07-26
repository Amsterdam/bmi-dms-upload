import { select, takeEvery } from 'redux-saga/effects';
import { NavigateFunction } from 'react-router-dom-v5-compat';

import { CustomFileLight } from '../../../../types';
import { SingleStepsToRoutes } from '../constants';
import { buildPath } from '../../../../utils';

import { resetState, stepForward, stepBack } from './slice';
import { getBasePath, getCurrentStep, getFile } from './selectors';
import { CurrentStep } from './model';

interface ActionType {
	type: string;
	payload: {
		navigate: NavigateFunction;
	};
}

function* back(action: ActionType) {
	const currentStep: CurrentStep = yield select(getCurrentStep);
	const { navigate } = action.payload;
	const basePath: string = yield select(getBasePath);

	switch (currentStep) {
		case CurrentStep.SelectFields:
			navigate(buildPath(basePath, SingleStepsToRoutes[CurrentStep.Upload]));
			break;
		case CurrentStep.Upload:
			navigate(buildPath(basePath, SingleStepsToRoutes[CurrentStep.Button]));
			break;
	}
}

function* forward(action: ActionType) {
	const currentStep: CurrentStep = yield select(getCurrentStep);
	const file: CustomFileLight | undefined = yield select(getFile);

	const { navigate } = action.payload;
	const basePath: string = yield select(getBasePath);

	switch (currentStep) {
		case CurrentStep.Upload:
			if (file) navigate(buildPath(basePath, SingleStepsToRoutes[CurrentStep.SelectFields]));
			break;
	}
}

/* eslint-disable require-yield */
function* resetRoute(action: ActionType) {
	const { navigate } = action.payload;
	const basePath: string = yield select(getBasePath);
	navigate(buildPath(basePath, SingleStepsToRoutes[0]));
}

export function* singleSaga() {
	yield takeEvery(resetState.type, resetRoute);
	yield takeEvery(stepBack.type, back);
	yield takeEvery(stepForward.type, forward);
}
