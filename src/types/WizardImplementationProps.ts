import { ComponentProps } from 'react';
import { JsonForms } from '@jsonforms/react';
import { FileUploadProps } from '@amsterdam/bmi-component-library';
import { IBulkMetadataField, IBulkMetadataFile } from '../features/bulk/store/model';
import { CustomFileLight, CustomFileLightOrRejection } from '../types'

export type Asset = {
	code: string;
	name: string;
};

export type MetadataDataSubmitCallbackArg<T> = { metadata: T; file: CustomFileLight };
export type CancelCallbackArg<T> = { file?: CustomFileLight; metadata?: T };
export type SupportedHTTPMethods = 'POST' | 'PUT';

export interface WizardImplementationProps<T> {
	asset: Asset;
	// Dynamically get URL to upload file to
	getPostUrl: (file: CustomFileLight) => Promise<string>;
	// Allows for authentication with a token header
	getHeaders: FileUploadProps['getHeaders'];
	// Callback if file was successfully uploaded
	onFileSuccess?: (file: CustomFileLight) => void;
	onFileRemove?: (file: CustomFileLightOrRejection) => void

	// Props for JsonForms component to render for capturing metadata
	metadataForm: ComponentProps<typeof JsonForms>;

	// At the end of the wizard when all metadata is captured, this callback should be called with the collected data
	onMetadataSubmit: (data: MetadataDataSubmitCallbackArg<T>) => Promise<void>;

	// The uploaded document should have the possibility of deletion again if the wizard were to be cancelled prior
	// to persistence of the metadata
	onCancel: (data: CancelCallbackArg<T>) => Promise<void>;

	// Defaults to '/' or base path of page where this wizard is implemented from
	basePath?: string;
	uploadHTTPMethod?: SupportedHTTPMethods;
}

export interface BulkWizardImplementationProps<T> extends Omit<WizardImplementationProps<T>, "onMetadataSubmit">  {
	getDocumentViewUrl: (metadataFile: IBulkMetadataFile) => Promise<string>;
	metadataFields?: IBulkMetadataField[]
}