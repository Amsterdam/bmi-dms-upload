import { CustomFileLight, MetadataGenericType } from '../../_shared/types';
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

export interface DMSUpload {

}
