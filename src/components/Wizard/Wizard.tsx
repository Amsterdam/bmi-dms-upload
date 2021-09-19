import React, { ReactNode, useEffect } from 'react';
import { CustomFile, Modal, FileUploadProps, FileList } from '@amsterdam/bmi-component-library';
import { Button } from '@amsterdam/asc-ui';
import { ChevronLeft } from '@amsterdam/asc-assets';
import { getDocuments } from '~/store/selectors';
import { onDocumentRemove, fetchDocumentsRequest } from '~/store/actions';
import { useDispatch, useSelector } from '~/store/CustomProvider';

export type MetadataDataSubmitCallbackArg<T> = { metadata: T; file: CustomFile };
export type CancelCallbackArg<T> = { metadata?: T; file?: CustomFile };

export type ImplementationProps = {
	// Dynamically get URL to upload file to
	getPostUrl: FileUploadProps['getPostUrl'];
	// Allows for authentication with a token header
	getHeaders: FileUploadProps['getHeaders'];
	// Callback if file was successfully uploaded
	onFileSuccess?: FileUploadProps['onFileSuccess'];
	onFileRemove?: FileUploadProps['onFileRemove'];

	// Component to render for capturing meta data
	metadataForm: ReactNode;
	// Validation of custom metadata form
	onMetadataValidate: <T>(data: T) => Promise<boolean>;
	// At the end of the wizard when all metadata is captured, this callback should be called with the collected data
	onMetadataSubmit: <T>(data: MetadataDataSubmitCallbackArg<T>) => Promise<void>;

	// The uploaded document should have the possibility of deletion again if the wizard were to be cancelled prior
	// to persistence of the metadata
	onCancel: <T>(data: CancelCallbackArg<T>) => Promise<void>;

	objectId: string | number;
	surveyId: string;
};

function onCancel() {
	console.log('cancel fileUpload');
}

type Props = {
	onClose: () => void;
} & ImplementationProps;

const Wizard: React.FC<Props> = ({ onClose, objectId, surveyId }: Props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchDocumentsRequest(objectId));
		// };
	}, []);
	// Store dispatch/select for scaffold/demo purposes:
	const documents = useSelector(getDocuments);
	// For temporary illustrative purposes:
	console.log('documents', documents);

	return (
		<Modal id="dms-upload-wizard" open={true} onClose={onClose} closeOnBackdropClick={false}>
			<Modal.TopBar hideCloseButton={false}>Bestand uploaden voor ...</Modal.TopBar>
			<>
				<Modal.Content>
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
				</Modal.Content>
				<Modal.Actions>
					<Button variant="textButton" iconLeft={<ChevronLeft />}>
						Annuleren
					</Button>
				</Modal.Actions>
			</>
		</Modal>
	);
};

Wizard.displayName = 'Wizard';

export default Wizard;
