import { NavigateFunction } from 'react-router-dom-v5-compat';
import { select, takeEvery } from 'redux-saga/effects';

import { CustomFileLight } from '../../../../types';
import { getBasePath } from '../../../single/single/store/selectors';
import { buildPath } from '../../../../utils';
import { BulkStepsToRoutes } from '../constants';

import { resetState, stepForward, stepBack } from './slice';
import { getCurrentStep, getFiles, getIsBulkMode } from './selectors';
import { CurrentStep } from './model';

interface ActionType {
	type: string;
	payload: {
		navigate: NavigateFunction;
	};
}

function* back({ payload }: ActionType) {
	const currentStep: CurrentStep = yield select(getCurrentStep);
	const isBulkMode: boolean = yield select(getIsBulkMode);
	const basePath: string = yield select(getBasePath);
	const { navigate } = payload;

	switch (currentStep) {
		case CurrentStep.EditFields:
			if (isBulkMode) {
				return navigate(buildPath(basePath, BulkStepsToRoutes[CurrentStep.SelectFields]));
			}
			navigate(buildPath(basePath, BulkStepsToRoutes[CurrentStep.Upload]));
			break;
		case CurrentStep.SelectFields:
			navigate(buildPath(basePath, BulkStepsToRoutes[CurrentStep.Upload]), {
				state: { previousPath: 'step-2' },
			});
			break;
		case CurrentStep.Upload:
			navigate(buildPath(basePath, BulkStepsToRoutes[CurrentStep.Button]));
			break;
	}
}

function* forward({ payload }: ActionType) {
	const currentStep: CurrentStep = yield select(getCurrentStep);
	const basePath: string = yield select(getBasePath);
	const isBulkMode: boolean = yield select(getIsBulkMode);
	const files: CustomFileLight[] | undefined = yield select(getFiles);
	const { navigate } = payload;

	switch (currentStep) {
		case CurrentStep.Upload:
			if (files) {
				const nextStep = isBulkMode ? CurrentStep.SelectFields : CurrentStep.EditFields;
				navigate(buildPath(basePath, BulkStepsToRoutes[nextStep]));
			}
			break;
		case CurrentStep.SelectFields:
			navigate(buildPath(basePath, BulkStepsToRoutes[CurrentStep.EditFields]));
			break;
	}
}

function* resetRoute({ payload }: ActionType) {
	const basePath: string = yield select(getBasePath);
	const { navigate } = payload;
	navigate(buildPath(basePath, BulkStepsToRoutes[0]));
}

export function* bulkSaga() {
	yield takeEvery(resetState.type, resetRoute);
	yield takeEvery(stepBack.type, back);
	yield takeEvery(stepForward.type, forward);
}
