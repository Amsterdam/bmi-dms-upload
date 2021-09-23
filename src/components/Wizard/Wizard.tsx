//@ts-nocheck
import React, { ReactNode } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { CustomFile, Modal, FileUploadProps } from '@amsterdam/bmi-component-library';
import { Button } from '@amsterdam/asc-ui';
import { ChevronLeft } from '@amsterdam/asc-assets';
import Step1 from './Step1';
import Step2 from './Step2';

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

	objectId: string;
	surveyId: string;
};

function renderButtons() {
	const location = useLocation();
	const history = useHistory();
	console.log('patname', location.pathname);
	return location.pathname === '/' ? (
		<Button
			onClick={() => {
				history.push('/step2');
			}}
		>
			Volgende
		</Button>
	) : (
		<Button>Opslaan</Button>
	);
}
function onCancel() {
	console.log('cancel fileUpload');
}

type Props = {
	onClose: () => void;
} & ImplementationProps;

const Wizard: React.FC<Props> = ({ onClose, objectId, surveyId, metadataForm, ...props }: Props) => {
	return (
		<Modal id="dms-upload-wizard" open={true} onClose={onClose} closeOnBackdropClick={false}>
			<Modal.TopBar hideCloseButton={false}>Bestand uploaden voor ...</Modal.TopBar>
			<>
				<Modal.Content>
					<Switch>
						<Route
							exact
							path="/"
							render={() => <Step1 objectId={objectId} surveyId={surveyId} onCancel={onCancel} {...props} />}
						/>
						<Route path="/step2" render={() => <Step2 metadataForm={metadataForm} />} />
					</Switch>
				</Modal.Content>
				<Modal.Actions>
					<Modal.Actions.Left>
						<Button variant="textButton" iconLeft={<ChevronLeft />}>
							Annuleren
						</Button>
					</Modal.Actions.Left>
					<Modal.Actions.Right>{renderButtons()}</Modal.Actions.Right>
				</Modal.Actions>
			</>
		</Modal>
	);
};

Wizard.displayName = 'Wizard';

export default Wizard;
