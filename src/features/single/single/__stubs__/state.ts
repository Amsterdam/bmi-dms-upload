import { CurrentStep, ISingleState } from "../store/model";
import { file } from './file'

export const state: ISingleState = {
	currentStep: CurrentStep.Button,
	file,
	metadata: {},
};
