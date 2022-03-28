import { FileUploadProps } from '@amsterdam/bmi-component-library';
import { JsonForms } from '@jsonforms/react';
import { ComponentProps } from 'react';

import { CustomFileLight, CustomFileLightOrRejection } from '../../../types';

export type Asset = {
	code: string;
	name: string;
};
export type MetadataDataSubmitCallbackArg<T> = { metadata: T; file: CustomFileLight };
export type CancelCallbackArg<T> = { file?: CustomFileLight; metadata?: T };
export type SupportedHTTPMethods = 'POST' | 'PUT';
export interface Props<T> {
	onCancel: (data: CancelCallbackArg<T>) => Promise<void>;
	onClose: () => void;
	onFileSuccess?: (file: CustomFileLight) => void;
	onFileRemove?: (file: CustomFileLightOrRejection) => void
	onMetadataSubmit: (data: MetadataDataSubmitCallbackArg<T>) => Promise<void>;

	getPostUrl: (file: CustomFileLight) => Promise<string>;
	getHeaders: FileUploadProps['getHeaders'];

	asset: Asset;
	metadataForm: ComponentProps<typeof JsonForms>;
	basePath?: string;
	uploadHTTPMethod?: SupportedHTTPMethods;
}
