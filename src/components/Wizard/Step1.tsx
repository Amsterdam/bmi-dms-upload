import React, { useEffect } from 'react';
import { CustomFile, FileList, FileUpload, FileUploadProps } from '@amsterdam/bmi-component-library';
import { fetchDocumentsRequest, onDocumentRemove } from '~/store/actions';
import { useDispatch, useSelector } from '~/store/CustomProvider';
import { getDocuments } from '~/store/selectors';
import { ImplementationProps } from './Wizard';

export type CancelCallbackArg<T> = { metadata?: T; file?: CustomFile };

type Props = ImplementationProps & FileUploadProps;

export default function Step1({ objectId, surveyId, onCancel, ...props }: Props) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchDocumentsRequest(objectId));
	}, []);

	const documents: CustomFile[] | false = useSelector(getDocuments);

	console.log('documents', documents);
	return (
		<React.Fragment>
			<FileUpload {...props} />
			{documents && documents.length > 0 && (
				<FileList
					files={documents as any}
					removeLabel="Wissen"
					cancelLabel="Annuleren"
					fileUploadErrorLabel="dit bestand kan niet worden geüpload"
					fileUploadInProgressLabel="wordt geupload"
					onCancel={() => onCancel}
					onFileRemove={(document: any) => {
						dispatch(onDocumentRemove(surveyId, document.id));
					}}
				/>
			)}
		</React.Fragment>
	);
}
