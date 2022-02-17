import React, { ComponentProps } from 'react';
import { FileUpload } from '@amsterdam/bmi-component-library';
import { Step1Styles } from './Step1Styles';
import { BulkCustomFile } from '../../features/bulk/store/model';
import { CustomFileOrRejection } from '../../features/bulk/components/BulkUploadWizard/BulkUploadWizard.test';

export type SupportedHTTPMethods = 'POST' | 'PUT';

type FileUploadProps = ComponentProps<typeof FileUpload>;

type Props = {
	getPostUrl: FileUploadProps['getPostUrl'];
	getHeaders: FileUploadProps['getHeaders'];
	onFileSuccess?: (file: BulkCustomFile) => void;
	onFileRemove?: (file: CustomFileOrRejection) => void;
	storedFiles?: FileUploadProps['storedFiles'];
	httpMethod?: SupportedHTTPMethods;
	placeholder?: string;
	maxFiles?: number;
};

export default function Step1({
	getPostUrl,
	getHeaders,
	onFileRemove,
	onFileSuccess,
	storedFiles,
	httpMethod = 'POST',
	placeholder = 'Sleep een bestand in dit vlak of',
	maxFiles = 1,
}: Props) {
	return (
		<Step1Styles>
			<FileUpload
				getPostUrl={getPostUrl}
				placeholder={placeholder}
				droppingLabel="bestanden geselecteerd"
				selectFilesLabel="selecteer bestand"
				removeLabel="Wissen"
				cancelLabel="Annuleren"
				fileUploadErrorLabel="dit bestand kan niet worden geüpload"
				fileUploadInProgressLabel="wordt geupload"
				options={{ noClick: true, noKeyboard: true, maxFiles }}
				onFileRemove={onFileRemove}
				onFileSuccess={onFileSuccess}
				getHeaders={getHeaders}
				storedFiles={storedFiles}
				httpMethod={httpMethod}
			/>
		</Step1Styles>
	);
}

