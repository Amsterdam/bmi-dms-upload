import React, { ComponentProps, SyntheticEvent, useCallback, useState } from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';
import { CustomFile, Modal, FileUploadProps, confirm } from '@amsterdam/bmi-component-library';
import { Button } from '@amsterdam/asc-ui';
import { ChevronLeft, Close } from '@amsterdam/asc-assets';
import { CustomFile, Modal, FileUploadProps } from '@amsterdam/bmi-component-library';
import { useDispatch, useSelector } from '../../store/CustomProvider';
import { setFile, setMetadata, resetState, removeFileFromStore } from '../../store/dataSlice';
import { getFileFromStore, getMetadataFromStore } from '../../store/selectors';
import Step1, { SupportedHTTPMethods } from './Step1';
import { ModalContentStyle, ModalTopBarStyle } from './WizardStyles';
import { appendTrailingSlash, appendPathSegment } from '../../utils';
import { JsonForms } from '@jsonforms/react';
import MetadataForm from '../MetadataForm/MetadataForm';
import ConfirmTermination from '../ConfirmTermination/ConfirmTermination';
import WizardFooter from '../WizardFooter/WizardFooter';

export type Asset = {
	code: string;
	name: string;
};
export type MetadataDataSubmitCallbackArg<T> = { metadata: T; file: CustomFile };
export type CancelCallbackArg<T> = { file?: CustomFile; metadata?: T };
export type ImplementationProps<T> = {
	asset: Asset;
	// Dynamically get URL to upload file to
	getPostUrl: FileUploadProps['getPostUrl'];
	// Allows for authentication with a token header
	getHeaders: FileUploadProps['getHeaders'];
	// Callback if file was successfully uploaded
	onFileSuccess?: FileUploadProps['onFileSuccess'];
	onFileRemove?: FileUploadProps['onFileRemove'];

	// Props for JsonForms component to render for capturing meta data
	metadataForm: ComponentProps<typeof JsonForms>;

	// At the end of the wizard when all metadata is captured, this callback should be called with the collected data
	onMetadataSubmit: (data: MetadataDataSubmitCallbackArg<T>) => Promise<void>;

	// The uploaded document should have the possibility of deletion again if the wizard were to be cancelled prior
	// to persistence of the metadata
	onCancel: (data: CancelCallbackArg<T>) => Promise<void>;

	// Defaults to '/' or base path of page where this wizard is implemented from
	basePath?: string;
	uploadHTTPMethod?: SupportedHTTPMethods;
};

export type Props<T> = {
	onClose: () => void;
} & ImplementationProps<T>;

export default function Wizard<T>({
	asset: { name },
	onClose,
	onCancel,
	getHeaders,
	getPostUrl,
	onFileRemove,
	onFileSuccess,
	metadataForm,
	onMetadataSubmit,
	basePath = '/',
	uploadHTTPMethod = 'POST',
}: Props<T>) {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const file = useSelector(getFileFromStore);
	const metadata = useSelector(getMetadataFromStore) as T;
	const [isValidForm, setIsValidForm] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const getFile = React.useCallback(
		(file: CustomFile) => {
			onFileSuccess && onFileSuccess(file);
			dispatch(setFile(file));
		},
		[onFileSuccess],
	);

	const handleFileRemove = useCallback(
		(file) => {
			onFileRemove && onFileRemove(file);
			dispatch(removeFileFromStore());
		},
		[onFileRemove],
	);

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

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

	// This is a dummy method extracted from the original wizard implementation
	function clickToCancel() {
		onCancel({ file, metadata }).catch((err) => {
			// TODO handle error gracefully
			console.error(err);
		});
		resetAndClose();
	}

	function terminate() {
		// In case the user presses the escape button on his/her keyboard
		onCancel({ file, metadata }).catch((err) => {
			// TODO handle error gracefully
			console.error(err);
		});
		resetAndClose();
	}

	const props = {
		title: 'Annuleer uploaden',
		message:
			'U gaat het uploaden van de bestanden annuleren. De geuploade bestanden zullen uit het systeem worden verwijderd',
		textCancelButton: '< Terug',
		textConfirmButton: 'Oke >',
		onCancel: () => {
			console.log('Terug');
		},
		onConfirm: () => {
			console.log('Oke');
		},
	};

	return (
<<<<<<< HEAD
		<>
			{isOpen && <ConfirmTermination />}
			{!isOpen && (
		<Modal id="dms-upload-wizard" open={true} onClose={() => terminate()} closeOnBackdropClick={false}>
=======
		<Modal
			id="dms-upload-wizard"
			open={true}
			onClose={() => terminate()}
			closeOnBackdropClick={false}
		>
>>>>>>> test(wizard and rowlayoutrenderer): some tests
			<Modal.TopBar hideCloseButton={false} onCloseButton={() => terminate()}>
				<ModalTopBarStyle>Bestand uploaden voor {name}</ModalTopBarStyle>
			</Modal.TopBar>
			<>
				<Modal.Content>
					<ModalContentStyle>
						<Route
							exact
							path={basePath}
							render={() => (
								<Step1
									getHeaders={getHeaders}
									getPostUrl={getPostUrl}
									onFileRemove={handleFileRemove}
									onFileSuccess={getFile}
									storedFiles={!file ? [] : ([file] as FileUploadProps['storedFiles'])}
									httpMethod={uploadHTTPMethod}
								/>
							)}
						/>
						<Route
							path={appendPathSegment(basePath, 'step2')}
							render={() => (
								<MetadataForm
									{...metadataForm}
									onChange={(data, valid, errors) => {
										dispatch(setMetadata(data));
										setIsValidForm(valid);
									}}
								/>
							)}
						/>
					</ModalContentStyle>
				</Modal.Content>
				<WizardFooter
					cancel={{ visible: true, onClick: clickToCancel }}
					previous={{ visible: true, onClick: () => history.push(basePath) }}
					next={{
						visible: appendTrailingSlash(location.pathname) === basePath ? !!file : false,
						onClick: () => history.push(appendPathSegment(basePath, 'step2')),
					}}
					save={{ visible: true, onClick: handleSubmit }}
				/>
			</>
		</Modal>
			)}
		</>
	);
}
