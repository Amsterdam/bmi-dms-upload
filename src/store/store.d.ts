import { CustomFile } from '@amsterdam/bmi-component-library';
import { MetadataGenericType } from '../types';

export interface DMSUpload {
	file?: CustomFile;
	metadata: MetadataGenericType;
}

export namespace Store {
	export interface file {
		file: CustomFile;
	}

	export interface metadata {
		metadata: DMSUpload['metadata'];
	}
}
