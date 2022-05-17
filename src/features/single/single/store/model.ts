import { CustomFileLight, MetadataGenericType } from '../../../../types';

export enum CurrentStep {
	Button,
	Upload,
	SelectFields,
}

export interface ISingleState {
	currentStep: CurrentStep;
	file?: CustomFileLight;
	metadata: MetadataGenericType;
}
