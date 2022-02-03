import { CustomFile } from '@amsterdam/bmi-component-library';
import { IBulkMetadataState } from 'src/features/bulk/store/model';
import { MetadataGenericType } from '../types';

export interface DMSUpload {
	file?: CustomFile;
	metadata: MetadataGenericType;
}

export interface Store {
	upload: DMSUpload;
	bulk: IBulkMetadataState
}
