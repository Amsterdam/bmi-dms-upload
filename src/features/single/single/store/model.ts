import { CustomFileLight, MetadataGenericType } from '../../../../types';

export enum CurrentStep {
	Button,
	Upload,
	SelectFields,
	UploadMP,
}

export interface ISingleState {
	basePath: string;
	currentStep: CurrentStep;
	file?: CustomFileLight;
	metadata: MetadataGenericType;
}
