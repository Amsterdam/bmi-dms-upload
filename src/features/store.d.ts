import { IBulkMetadataState } from 'src/features/bulk/store/model';
import { CustomFileLight, MetadataGenericType } from '../types';

export interface DMSUpload {
	file?: CustomFileLight;
	metadata: MetadataGenericType;
}

export interface Store {
	upload: DMSUpload;
	bulk: IBulkMetadataState
}
