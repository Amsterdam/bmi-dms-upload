import { NavigateFunction } from 'react-router-dom-v5-compat';
import { select, takeEvery } from 'redux-saga/effects';

import { CustomFileLight } from '../../../../types';
import { getBasePath } from '../../../single/single/store/selectors';
import { buildPath } from '../../../../utils';
import { BulkStepsToRoutes } from '../constants';

import { resetState, stepForward, stepBack } from './slice';
import { getCurrentStep, getFiles } from './selectors';
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
		case CurrentStep.EditFields:
			navigate(buildPath(basePath, BulkStepsToRoutes[CurrentStep.SelectFields]));
			break;
		case CurrentStep.SelectFields:
			navigate(buildPath(basePath, BulkStepsToRoutes[CurrentStep.Upload]));
			break;
		case CurrentStep.Upload:
			navigate(buildPath(basePath, BulkStepsToRoutes[CurrentStep.Button]));
			break;
	}
}

function* forward(action: ActionType) {
	const currentStep: CurrentStep = yield select(getCurrentStep);
	const files: CustomFileLight | undefined = yield select(getFiles);

	const { navigate } = action.payload;
	const basePath: string = yield select(getBasePath);

	switch (currentStep) {
		case CurrentStep.Upload:
			if (files) navigate(buildPath(basePath, BulkStepsToRoutes[CurrentStep.SelectFields]));
			break;
		case CurrentStep.SelectFields:
			navigate(buildPath(basePath, BulkStepsToRoutes[CurrentStep.EditFields]));
			break;
	}
}

/* eslint-disable require-yield */
function* resetRoute(action: ActionType) {
	const { navigate } = action.payload;
	const basePath: string = yield select(getBasePath);
	navigate(buildPath(basePath, BulkStepsToRoutes[0]));
}

export function* bulkSaga() {
	yield takeEvery(resetState.type, resetRoute);
	yield takeEvery(stepBack.type, back);
	yield takeEvery(stepForward.type, forward);
}
