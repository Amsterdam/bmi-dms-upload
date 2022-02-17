import React, { SyntheticEvent, useCallback, useState } from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';
import { CustomFile, Modal, FileUploadProps } from '@amsterdam/bmi-component-library';
import { useDispatch, useSelector } from '../../../CustomProvider';
import { setFile, setMetadata, resetState, removeFileFromStore } from '../../store/dataSlice';
import { getFileFromStore, getMetadataFromStore } from '../../store/selectors';
import Step1 from './Step1';
import { ModalContentStyle, ModalTopBarStyle } from './WizardStyles';
import { appendTrailingSlash, appendPathSegment } from '../../../../utils';
import MetadataForm from '../../../../components/MetadataForm/MetadataForm';
import WizardFooter from '../../../../components/WizardFooter/WizardFooter';
import ConfirmTermination from '../../../../components/ConfirmTermination/ConfirmTermination';
import useConfirmTermination from '../../../../hooks/useConfirmTermination';
import { WizardImplementationProps } from '../../../../types'

export type Props<T> = {
	onClose: () => void;
} & WizardImplementationProps<T>;

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
	const [isValidForm, setIsValidForm] = useState<boolean>(false);
	const { isOpen, confirm } = useConfirmTermination(() => terminate());

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

	function terminate() {
		// In case the user presses the escape button on his/her keyboard
		onCancel({ file, metadata }).catch((err) => {
			// TODO handle error gracefully
			console.error(err);
		});
		resetAndClose();
	}

	return (
		<>
			{isOpen && <ConfirmTermination backdropOpacity={1} />}
			<Modal id="dms-upload-wizard" open onClose={() => terminate()} closeOnBackdropClick={false}>
				<Modal.TopBar hideCloseButton={false} onCloseButton={() => terminate()}>
					<ModalTopBarStyle styleAs="h4" as="h2">
						Bestand uploaden voor {name}
					</ModalTopBarStyle>
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
										onChange={(data, valid) => {
											dispatch(setMetadata(data));
											setIsValidForm(valid);
										}}
									/>
								)}
							/>
						</ModalContentStyle>
					</Modal.Content>
					<WizardFooter
						cancel={{ visible: true, onClick: confirm, dataTestId: 'cancel-wizard' }}
						previous={{
							visible: appendTrailingSlash(location.pathname) !== basePath,
							onClick: () => history.push(basePath),
							dataTestId: 'previous-button',
						}}
						next={{
							visible: !!(appendTrailingSlash(location.pathname) === basePath && file),
							onClick: () => history.push(appendPathSegment(basePath, 'step2')),
							disabled: !file,
							dataTestId: 'next-button',
						}}
						save={{
							visible: appendTrailingSlash(location.pathname) !== basePath,
							disabled: !isValidForm,
							onClick: handleSubmit,
							dataTestId: 'save-button',
						}}
					/>
				</>
			</Modal>
		</>
	);
}
