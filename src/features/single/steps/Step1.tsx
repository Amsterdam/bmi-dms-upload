import React, { useCallback } from 'react';
import { Props } from '../single/types';
import { FileUpload, FileUploadProps } from '@amsterdam/bmi-component-library';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { CustomFileLight, CustomFileLightOrRejection } from '../../../types';
import SingleWizard from '../wizard/SingleWizard';
import { getFile } from '../single/store/selectors';
import { setFile, removeFile } from '../single/store/slice';
import { Step1Styles } from './styles';

export default function Step1<T>(props: Props<T>) {
	const { getHeaders, getPostUrl, onFileRemove, onFileSuccess, uploadHTTPMethod } = props;

	const dispatch = useAppDispatch();
	const file = useAppSelector(getFile);

	const handleFileRemove = useCallback(
		(file: CustomFileLightOrRejection) => {
			onFileRemove && onFileRemove(file);
			dispatch(removeFile());
		},
		[onFileRemove],
	);

	const handleFileSuccess = useCallback(
		(uploadedFile: CustomFileLight) => {
			onFileSuccess && onFileSuccess(uploadedFile);
			dispatch(setFile(uploadedFile));
		},
		[onFileSuccess],
	);

	return (
		<SingleWizard {...props} isValidForm>
			<Step1Styles>
				<FileUpload
					cancelLabel="Annuleren"
					droppingLabel="bestanden geselecteerd"
					fileUploadErrorLabel="dit bestand kan niet worden geüpload"
					fileUploadInProgressLabel="wordt geupload"
					getHeaders={getHeaders}
					getPostUrl={getPostUrl}
					httpMethod={uploadHTTPMethod}
					onFileRemove={handleFileRemove}
					onFileSuccess={handleFileSuccess}
					options={{ noClick: true, noKeyboard: true, maxFiles: 1 }}
					placeholder="Sleep een bestand in dit vlak of"
					removeLabel="Wissen"
					selectFilesLabel="selecteer bestand"
					storedFiles={!file ? [] : ([file] as FileUploadProps['storedFiles'])}
				/>
			</Step1Styles>
		</SingleWizard>
	);
}
