import React from 'react';
import { FileUpload, FileUploadProps, CustomFile } from '@amsterdam/bmi-component-library';
import { CustomFileOrRejection } from '@amsterdam/bmi-component-library/lib/common/src/FileUpload/hooks';

type Props = {
	getPostUrl: FileUploadProps['getPostUrl'];
	getHeaders: FileUploadProps['getHeaders'];
	onFileSuccess?: FileUploadProps['onFileSuccess'];
	onFileRemove?: FileUploadProps['onFileRemove'];
	storedFiles?: CustomFile[] | CustomFileOrRejection[];
};

export const Step1: React.FC<Props> = ({ getPostUrl, getHeaders, onFileRemove, onFileSuccess, storedFiles }) => {
	return (
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
			storedFiles={storedFiles as CustomFileOrRejection[]}
		/>
	);
};
