import { CustomFileLight } from '../../../../types';
import { DMSUpload } from '../../../store';

export const file = {
	tmpId: 1,
	progress: 33,
	type: 'application/pdf',
	name: 'Untitled',
	lastModified: 0,
	size: 10000,
} as CustomFileLight;

export const metadata = { foo: 'bar' };

export const stateWithFile: DMSUpload = {
	file,
	metadata: {},
};

export const stateWithFileAndMetadata: DMSUpload = {
	file,
	metadata,
};

export const stateAfterReset: DMSUpload = {
	metadata: {},
};
