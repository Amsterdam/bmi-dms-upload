import { BulkCustomFile, IBulkMetadataState } from 'src/features/bulk/store/model';
import { MetadataGenericType } from '../types';

export interface DMSUpload {
	file?: BulkCustomFile;
	metadata: MetadataGenericType;
}

export interface Store {
	upload: DMSUpload;
	bulk: IBulkMetadataState
}
