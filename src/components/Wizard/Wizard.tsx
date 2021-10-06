//@ts-nocheck
import React from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { CustomFile, Modal, FileUploadProps } from '@amsterdam/bmi-component-library';
import { Button } from '@amsterdam/asc-ui';
import { ChevronLeft } from '@amsterdam/asc-assets';
import Step1 from './Step1';
import Step2 from './Step2';

export type MetadataDataSubmitCallbackArg<T> = { metadata: T; file: CustomFile };
export type CancelCallbackArg<T> = { metadata?: T; file?: CustomFile };

export type ImplementationProps<T> = {
	// Dynamically get URL to upload file to
	getPostUrl: FileUploadProps['getPostUrl'];
	// Allows for authentication with a token header
	getHeaders: FileUploadProps['getHeaders'];
	// Callback if file was successfully uploaded
	onFileSuccess?: FileUploadProps['onFileSuccess'];
	onFileRemove?: FileUploadProps['onFileRemove'];

	// Component to render for capturing meta data
	metadataForm: React.FunctionComponent<any>;
	// Validation of custom metadata form
	onMetadataValidate: (data: T) => Promise<boolean>;
	// At the end of the wizard when all metadata is captured, this callback should be called with the collected data
	onMetadataSubmit: (data: MetadataDataSubmitCallbackArg<T>) => Promise<void>;

	// The uploaded document should have the possibility of deletion again if the wizard were to be cancelled prior
	// to persistence of the metadata
	onCancel: <T>(data: CancelCallbackArg<T>) => Promise<void>;
};

type Props<T> = {
	onClose: () => void;
} & ImplementationProps<T>;

export default function Wizard<T>({
	metadataForm,
	onMetadataValidate,
	onMetadataSubmit,
	onClose,
	onFileSuccess,
	...props
}: Props<T>) {
	const location = useLocation();
	const history = useHistory();
	const [formValues, setFormValues] = React.useState({});
	const [isValidForm, setIsValidForm] = React.useState(false);

	const handleChange = React.useCallback(
		(e) => {
			const { name, value } = e.target;
			const newFormValues = { ...formValues, ...{ [name]: value } };
			setFormValues(newFormValues);
			const isValid = onMetadataValidate(newFormValues);
			setIsValidForm(isValid);
		},
		[formValues, onMetadataValidate],
	);

	const getFile = React.useCallback(
		(file) => {
			console.log('test');
			if (onFileSuccess) {
				console.log('success');
				onFileSuccess(file);
				console.log('uploadedfile', file);

				//send file to store
			}
		},
		[onFileSuccess],
	);

	return (
		<Modal id="dms-upload-wizard" open={true} closeOnBackdropClick={false}>
			<Modal.TopBar hideCloseButton={false} onCloseButton={onClose}>
				Bestand uploaden voor ...
			</Modal.TopBar>
			<>
				<Modal.Content>
					<Switch>
						<Route exact path="/" render={() => <Step1 onFileSuccess={getFile} {...props} />} />
						<Route
							path="/step2"
							render={() => <Step2 metadataForm={metadataForm} handleChange={handleChange} {...props} />}
						/>
					</Switch>
				</Modal.Content>
				<Modal.Actions>
					<Modal.Actions.Left>
						<Button variant="textButton" iconLeft={<ChevronLeft />}>
							Annuleren
						</Button>
					</Modal.Actions.Left>
					<Modal.Actions.Right>
						{location.pathname === '/' ? (
							<Button
								onClick={() => {
									history.push('/step2');
								}}
							>
								Volgende
							</Button>
						) : (
							<div>
								<Button
									onClick={() => {
										history.push('/');
									}}
								>
									Vorige
								</Button>
								<Button
									onClick={(e) => {
										isValidForm &&
											onMetadataSubmit({
												metadata: formValues,
												//get file from store
												file: {},
											});
										onClose(e);
										history.push('/');
									}}
								>
									Opslaan
								</Button>
							</div>
						)}
					</Modal.Actions.Right>
				</Modal.Actions>
			</>
		</Modal>
	);
}
