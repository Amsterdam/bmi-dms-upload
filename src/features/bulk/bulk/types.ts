import { FileUploadProps } from '@amsterdam/bmi-component-library';
import { JsonForms } from '@jsonforms/react';
import { ComponentProps } from 'react';

import { CustomFileLight, CustomFileLightOrRejection } from '../../../types';
import { IBulkField, IBulkFile, IBulkState } from './store/model';

export type Asset = {
	code: string;
	name: string;
};

export type MetadataDataSubmitCallbackArg<T> = { metadata: T; file: CustomFileLight };
export type CancelCallbackArg<T> = { file?: CustomFileLight; metadata?: T };
export type SupportedHTTPMethods = 'POST' | 'PUT';
export type TGetDocumentViewUrl = (id: string) => Promise<string>;
export interface Props<T> {
	onCancel: (data: CancelCallbackArg<T>) => Promise<void>;
	onClose: () => void;
	onFileSuccess: (file: CustomFileLight) => Promise<IBulkFile>;
	onFileRemove?: (file: CustomFileLightOrRejection) => void;
	onMetadataSubmit: (data: IBulkState) => Promise<void>;

	getPostUrl: (file: CustomFileLight) => Promise<string>;
	getHeaders: FileUploadProps['getHeaders'];
	getDocumentViewUrl: TGetDocumentViewUrl;

	asset: Asset;
	metadataForm: ComponentProps<typeof JsonForms>;
	metadataFields?: IBulkField[];
	basePath?: string;
	uploadHTTPMethod?: SupportedHTTPMethods;
}
