import React from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { CustomFile, Modal, FileUploadProps } from '@amsterdam/bmi-component-library';
import { Button } from '@amsterdam/asc-ui';
import { ChevronLeft } from '@amsterdam/asc-assets';
import { useDispatch, useSelector } from '../../store/CustomProvider';
import { setFile, setMetadata, resetState, removeFileFromStore } from '../../store/dataSlice';
import { getFileFromStore, getMetadataFromStore } from '../../store/selectors';
import { FormProps } from './Step2';
import Step1 from './Step1';
import Step2 from './Step2';
import { PreviousButtonStyle, CancelButtonStyle } from './WizardStyle';

export type MetadataDataSubmitCallbackArg<T> = { metadata: T; file: CustomFile };
export type CancelCallbackArg<T> = { file?: CustomFile; metadata?: T };
export type ImplementationProps<T> = {
	// Dynamically get URL to upload file to
	getPostUrl: FileUploadProps['getPostUrl'];
	// Allows for authentication with a token header
	getHeaders: FileUploadProps['getHeaders'];
	// Callback if file was successfully uploaded
	onFileSuccess?: FileUploadProps['onFileSuccess'];
	onFileRemove?: FileUploadProps['onFileRemove'];

	// Component to render for capturing meta data
	metadataForm: React.FC<FormProps<T>>;
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

export default function Wizard<T>({
	onClose,
	onCancel,
	getHeaders,
	getPostUrl,
	onFileRemove,
	onFileSuccess,
	metadataForm,
	onMetadataValidate,
	onMetadataSubmit,
}: Props<T>) {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const file = useSelector(getFileFromStore);
	const metadata = useSelector(getMetadataFromStore);
	const fileMetadataSubmit = { file, metadata };
	const [formValues, setFormValues] = React.useState({});
	const [isValidForm, setIsValidForm] = React.useState(false);

	const getFile = React.useCallback(
		(file: CustomFile) => {
			onFileSuccess && onFileSuccess(file);
			dispatch(setFile(file));
		},
		[onFileSuccess],
	);

	const handleFileRemove = React.useCallback(
		(file) => {
			onFileRemove && onFileRemove(file);
			dispatch(removeFileFromStore(null));
		},
		[onFileRemove],
	);

	const handleChange = React.useCallback(
		async (e) => {
			const { name, value } = e.target;
			const newFormValues = { ...formValues, ...{ [name]: value } } as T;
			setFormValues(newFormValues);

			const isValid = await onMetadataValidate(newFormValues);
			setIsValidForm(isValid);
			dispatch(setMetadata(newFormValues));
		},
		[formValues, onMetadataValidate],
	);

	const fileIsEmptyObject = (file: CustomFile) => Object.keys(file).length === 0;
	const renderButtons = (location: any, file: CustomFile) => {
		return (
			<>
				{location.pathname === '/' ? (
					!fileIsEmptyObject(file) ? (
						<Button
							variant="primary"
							name="Volgende"
							onClick={() => {
								history.push('/step2');
							}}
						>
							Volgende
						</Button>
					) : null
				) : (
					<div>
						<PreviousButtonStyle
							variant="textButton"
							iconLeft={<ChevronLeft />}
							onClick={() => {
								history.push('/');
							}}
						>
							Vorige
						</PreviousButtonStyle>
						<Button variant="primary" onClick={handleSubmit}>
							Opslaan
						</Button>
					</div>
				)}
			</>
		);
	};

	const handleSubmit = (e: any) => {
		console.log(file);
		e.preventDefault();
		if (!fileIsEmptyObject(file) && isValidForm) {
			onMetadataSubmit(fileMetadataSubmit);
			dispatch(resetState(null));
			onClose();
			history.push('/');
		}
	};

	const handleStoredFiles = () => {
		return fileIsEmptyObject(file) ? undefined : [file];
	};
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
									onFileRemove={handleFileRemove}
									onFileSuccess={getFile}
									storedFiles={handleStoredFiles()}
								/>
							)}
						/>
						<Route
							path="/step2"
							render={() => <Step2 metadataForm={metadataForm} handleChange={handleChange} data={metadata} />}
						/>
					</Switch>
				</Modal.Content>
				<Modal.Actions>
					<Modal.Actions.Left>
						<CancelButtonStyle
							variant="textButton"
							iconLeft={<ChevronLeft />}
							onClick={() => {
								if (file || metadata) {
									onCancel({ file, metadata });
								}
								dispatch(resetState(undefined));
								onClose();
								history.push('/');
							}}
						>
							Annuleren
						</CancelButtonStyle>
					</Modal.Actions.Left>
					<Modal.Actions.Right>{renderButtons(location, file)}</Modal.Actions.Right>
				</Modal.Actions>
			</>
		</Modal>
	);
}
