import React, { ReactNode } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { CustomFile, Modal, FileUploadProps } from '@amsterdam/bmi-component-library';
import { Button } from '@amsterdam/asc-ui';
import { ChevronLeft } from '@amsterdam/asc-assets';
import { useDispatch } from '../../store/CustomProvider';
import { setFile } from '../../store/dataSlice';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

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
	metadataForm: ReactNode;
	// Validation of custom metadata form
	onMetadataValidate: (data: T) => Promise<boolean>;
	// At the end of the wizard when all metadata is captured, this callback should be called with the collected data
	onMetadataSubmit: (data: MetadataDataSubmitCallbackArg<T>) => Promise<void>;

	// The uploaded document should have the possibility of deletion again if the wizard were to be cancelled prior
	// to persistence of the metadata
	onCancel: (data: CancelCallbackArg<T>) => Promise<void>;
};

type Props<T> = {
	onClose: () => void;
} & ImplementationProps<T>;

export default function Wizard<T>({ onClose, getHeaders, getPostUrl, onFileRemove, onFileSuccess }: Props<T>) {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();

	const getFile = React.useCallback(
		(file) => {
			onFileSuccess && onFileSuccess(file);
			dispatch(setFile(file));
		},
		[onFileSuccess],
	);

	return (
		<Modal id="dms-upload-wizard" open={true} onClose={onClose} closeOnBackdropClick={false}>
			<Modal.TopBar hideCloseButton={false}>Bestand uploaden voor ...</Modal.TopBar>
			<>
				<Modal.Content>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Step1
									getHeaders={getHeaders}
									getPostUrl={getPostUrl}
									onFileRemove={onFileRemove}
									onFileSuccess={getFile}
								/>
							)}
						/>
						<Route path="/step2" render={() => <Step2 />} />
					</Switch>
				</Modal.Content>
				<Modal.Actions>
					<Modal.Actions.Left>
						<Button
							variant="textButton"
							iconLeft={<ChevronLeft />}
							onClick={() => {
								onClose();
								history.push('/');
							}}
						>
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
									onClick={() => {
										onClose();
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
