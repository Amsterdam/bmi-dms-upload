import { asset } from './asset';
import { mockData } from './data';
import { schema } from './schema';
import { uischema } from './uischema';

import {
	getPostUrlMock,
	getHeadersMock,
	getDocumentViewUrlMock,
	onFileSuccessMock,
	onFileRemoveMock,
	onChangeMock,
	onMetadataSubmitMock,
	onCancelMock,
} from '../__mocks__/bulk';

export const defaultProps = {
	asset: asset,
	getPostUrl: getPostUrlMock,
	getHeaders: getHeadersMock,
	getDocumentViewUrl: getDocumentViewUrlMock,
	onFileSuccess: onFileSuccessMock,
	onFileRemove: onFileRemoveMock,
	metadataForm: {
		schema,
		uischema,
		data: mockData,
		onChange: onChangeMock,
		renderers: [],
	},
	onMetadataSubmit: onMetadataSubmitMock,
	onCancel: onCancelMock,
	basePath: '/',
	isValidForm: false,
};
