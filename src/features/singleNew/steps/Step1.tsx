import React, { useEffect } from 'react';
import { Props } from '../single/types';
import { FileUpload, FileUploadProps } from '@amsterdam/bmi-component-library';
import { useDispatch, useSelector } from 'react-redux';

import { CustomFileLight, CustomFileLightOrRejection } from '../../../types';
import SingleWizard from '../wizard/SingleWizard';
import { getFileFromStore } from '../single/selectors';
import { setFile, removeFileFromStore, setMetadata } from '../single/slice';
import { ISingleState } from '../single/model';
import { Step1Styles } from './styles';

export default function Step1<T>(props: Props<T>) {
	const { getHeaders, getPostUrl, onFileRemove, onFileSuccess } = props;

	const dispatch = useDispatch();
	const file = useSelector(getFileFromStore);

	const handleFileRemove = React.useCallback(
		(file: CustomFileLightOrRejection) => {
			onFileRemove && onFileRemove(file);
			dispatch(removeFileFromStore());
		},
		[onFileRemove],
	);

	const handleFileSuccess = React.useCallback(
		(uploadedFile: CustomFileLight) => {
			onFileSuccess && onFileSuccess(uploadedFile);
			dispatch(setFile(uploadedFile));
		},
		[onFileSuccess],
	);

	return (
		<SingleWizard {...props}>
			<Step1Styles>
				<FileUpload
					cancelLabel="Annuleren"
					droppingLabel="bestanden geselecteerd"
					fileUploadErrorLabel="dit bestand kan niet worden geüpload"
					fileUploadInProgressLabel="wordt geupload"
					getHeaders={getHeaders}
					getPostUrl={getPostUrl}
					httpMethod="POST"
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
