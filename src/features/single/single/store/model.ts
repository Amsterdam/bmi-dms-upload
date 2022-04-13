import { CustomFileLight, MetadataGenericType } from '../../../../types';
import { FileRejection } from 'react-dropzone';

export enum CurrentStep {
	Button,
	Upload,
	SelectFields,
}

export type CustomFileLightOrRejection = CustomFileLight & FileRejection;

export interface ISingleState {
	currentStep: CurrentStep;
	file?: CustomFileLight;
	metadata: MetadataGenericType;
}
