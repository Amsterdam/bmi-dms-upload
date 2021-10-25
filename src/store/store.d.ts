import { CustomFile } from '@amsterdam/bmi-component-library';

export type MetadataGenericType = Record<string, unknown>;

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
