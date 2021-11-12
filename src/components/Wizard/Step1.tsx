import * as React from 'react';
import { FileUpload } from '@amsterdam/bmi-component-library';
import { Step1Styles } from './Step1Styles';
import { ComponentProps } from 'react';

export type SupportedHTTPMethods = 'POST' | 'PUT';

type FileUploadProps = ComponentProps<typeof FileUpload>;

type Props = {
	getPostUrl: FileUploadProps['getPostUrl'];
	getHeaders: FileUploadProps['getHeaders'];
	onFileSuccess?: FileUploadProps['onFileSuccess'];
	onFileRemove?: FileUploadProps['onFileRemove'];
	storedFiles?: FileUploadProps['storedFiles'];
	httpMethod?: SupportedHTTPMethods;
};

const Step1: React.FC<Props> = ({
	getPostUrl,
	getHeaders,
	onFileRemove,
	onFileSuccess,
	storedFiles,
	httpMethod = 'POST',
}) => {
	return (
		<Step1Styles>
			<FileUpload
				getPostUrl={getPostUrl}
				placeholder="Sleep de png bestanden in dit vlak of"
				droppingLabel="bestanden geselecteerd"
				selectFilesLabel="selecteer bestanden"
				removeLabel="Wissen"
				cancelLabel="Annuleren"
				fileUploadErrorLabel="dit bestand kan niet worden geüpload"
				fileUploadInProgressLabel="wordt geupload"
				options={{ noClick: true, noKeyboard: true }}
				onFileRemove={onFileRemove}
				onFileSuccess={onFileSuccess}
				getHeaders={getHeaders}
				storedFiles={storedFiles}
				httpMethod={httpMethod}
			/>
		</Step1Styles>
	);
};

export default Step1;
