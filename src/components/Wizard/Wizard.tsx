import React, { SyntheticEvent } from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';
import { CustomFile, Modal, FileUploadProps } from '@amsterdam/bmi-component-library';
import { Button } from '@amsterdam/asc-ui';
import { ChevronLeft } from '@amsterdam/asc-assets';
import { useDispatch, useSelector } from '../../store/CustomProvider';
import { setFile, setMetadata, resetState, removeFileFromStore } from '../../store/dataSlice';
import { getFileFromStore, getMetadataFromStore } from '../../store/selectors';
import { FormProps } from './Step2';
import Step1, { SupportedHTTPMethods } from './Step1';
import Step2 from './Step2';
import { PreviousButtonStyle, CancelButtonStyle } from './WizardStyles';
import { MetadataGenericType } from '../../store/store';
import appendTrailingSlash from '../../utils/appendTrailingSlash';
import appendPathSegment from '../../utils/appendPathSegment';

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

	// Defaults to '/' or base path of page where this wizard is implemented from
	basePath?: string;
	uploadHTTPMethod?: SupportedHTTPMethods;
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
	basePath = '/',
	uploadHTTPMethod = 'POST',
}: Props<T>) {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const file = useSelector(getFileFromStore);
	const metadata = (useSelector(getMetadataFromStore) as unknown) as T;
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
			dispatch(removeFileFromStore());
		},
		[onFileRemove],
	);

	const handleChange = React.useCallback(
		async (e) => {
			const { name, value } = e.target;
			const newFormValues = { ...formValues, ...{ [name]: value } } as T;
			setFormValues(newFormValues);

			console.log(':: HANDLING CHANGE', newFormValues);

			const isValid = await onMetadataValidate(newFormValues);
			setIsValidForm(isValid);
			console.log(':: isValid', isValid);
			dispatch(setMetadata((newFormValues as unknown) as MetadataGenericType));
		},
		[formValues, onMetadataValidate],
	);

	// const fileIsEmptyObject = (file: CustomFile) => Object.keys(file).length === 0;

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		console.log(':: HANDLING SUBMIT', file, isValidForm);

		if (file && isValidForm) {
			onMetadataSubmit({ file, metadata })
				.then(() => resetAndClose())
				.catch((err) => {
					// TODO handle error gracefully
					console.error(err);
				});
		}
	};

	function resetAndClose() {
		dispatch(resetState());
		onClose();
		history.push(basePath);
	}

	return (
		<Modal
			id="dms-upload-wizard"
			open={true}
			onClose={() => {
				// In case the user presses the escape button on his/her keyboard
				onCancel({ file, metadata }).catch((err) => {
					// TODO handle error gracefully
					console.error(err);
				});
				resetAndClose();
			}}
			closeOnBackdropClick={false}
		>
			<Modal.TopBar hideCloseButton={false}>Bestand uploaden voor ...</Modal.TopBar>
			<>
				<Modal.Content>
					<>
						<Route
							exact
							path={basePath}
							render={() => (
								<Step1
									getHeaders={getHeaders}
									getPostUrl={getPostUrl}
									onFileRemove={handleFileRemove}
									onFileSuccess={getFile}
									storedFiles={!file ? [] : [file]}
									httpMethod={uploadHTTPMethod}
								/>
							)}
						/>
						<Route
							path={appendPathSegment(basePath, 'step2')}
							render={() => <Step2 metadataForm={metadataForm} handleChange={handleChange} data={metadata} />}
						/>
					</>
				</Modal.Content>
				<Modal.Actions>
					<Modal.Actions.Left>
						<CancelButtonStyle
							variant="textButton"
							iconLeft={<ChevronLeft />}
							onClick={() => {
								onCancel({ file, metadata }).catch((err) => {
									// TODO handle error gracefully
									console.error(err);
								});
								resetAndClose();
							}}
						>
							Annuleren
						</CancelButtonStyle>
					</Modal.Actions.Left>
					<Modal.Actions.Right>
						{appendTrailingSlash(location.pathname) === basePath ? (
							file ? (
								<Button
									variant="primary"
									name="Volgende"
									onClick={() => history.push(appendPathSegment(basePath, 'step2'))}
								>
									Volgende
								</Button>
							) : null
						) : (
							<div>
								<PreviousButtonStyle
									variant="textButton"
									iconLeft={<ChevronLeft />}
									onClick={() => history.push(basePath)}
								>
									Vorige
								</PreviousButtonStyle>
								<Button variant="primary" onClick={handleSubmit}>
									Opslaan!
								</Button>
							</div>
						)}
					</Modal.Actions.Right>
				</Modal.Actions>
			</>
		</Modal>
	);
}
