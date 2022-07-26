import { CurrentStep, ISingleState } from '../store/model';
import { file } from './file';

export const state: ISingleState = {
	basePath: '/',
	currentStep: CurrentStep.Button,
	file,
	metadata: {},
};
