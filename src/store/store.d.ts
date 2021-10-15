import { CustomFile } from '@amsterdam/bmi-component-library';

export interface DMSUpload {
	file: CustomFile;
	metadata: any;
}

export namespace Store {
	export interface file {
		file: CustomFile;
	}

	export interface metadata {
		metadata: any;
	}
}
