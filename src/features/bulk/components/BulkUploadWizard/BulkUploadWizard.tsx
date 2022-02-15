import React, { useCallback, useState } from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';
import { CustomFile, Modal, FileUploadProps } from '@amsterdam/bmi-component-library';

import { appendTrailingSlash, appendPathSegment } from '../../../../utils';
import { ModalContentStyle, ModalTopBarStyle } from './styles';
import { useDispatch, useSelector } from '../../../CustomProvider';
import { BulkWizardImplementationProps } from '../../../../types';
import ConfirmTermination from '../../../../components/ConfirmTermination/ConfirmTermination';
import MetadataForm from '../../../../components/MetadataForm/MetadataForm';
import useConfirmTermination from '../../../../hooks/useConfirmTermination';
import WizardFooter from '../../../../components/WizardFooter/WizardFooter';
import Step1 from '../../../single-file/components/Wizard/Step1';
import { getCustomFilesFromStore } from '../../store/selectors';
import { setFile, removeFile, resetState } from '../../store/slice';
import { BulkCustomFile } from '../../store/model';

export type Props<T> = {
	onClose: () => void;
} & BulkWizardImplementationProps<T>;

export default function BulkUploadWizard<T>({
	asset: { name },
	metadataForm,
	onClose,
	onCancel,
	getHeaders,
	getPostUrl,
	onFileRemove,
	onFileSuccess,
	basePath = '/',
	uploadHTTPMethod = 'POST',
}: Props<T>) {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const files = useSelector(getCustomFilesFromStore);
	// const metadata = useSelector(getMetadataFromStore) as T;
	const [isValidForm, setIsValidForm] = useState<boolean>(false);
	const { isOpen, confirm } = useConfirmTermination(() => terminate());

	const saveFile = React.useCallback(
		(uploadedFile: BulkCustomFile) => {
			onFileSuccess && onFileSuccess(uploadedFile);
			const { tmpId } = uploadedFile;
			dispatch(
				setFile({
					id: `${tmpId}`,
					url: 'some-url', // @TODO: replace with actual value, from what?
					uploadedFile,
				}),
			);
		},
		[onFileSuccess],
	);

	const handleFileRemove = useCallback(
		(file: CustomFile) => {
			onFileRemove && onFileRemove(file);
			dispatch(removeFile(file));
		},
		[onFileRemove],
	);

	function resetAndClose() {
		dispatch(resetState());
		onClose();
		history.push(basePath);
	}

	function terminate() {
		// In case the user presses the escape button on his/her keyboard
		onCancel({}).catch((err) => {
			// TODO handle error gracefully
			console.error(err);
		});
		resetAndClose();
	}


	return (
		<>
			{isOpen && <ConfirmTermination backdropOpacity={1} />}
			<Modal id="dms-bulk-upload-wizard" open onClose={() => terminate()} closeOnBackdropClick={false}>
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
										onFileSuccess={saveFile}
										storedFiles={!files ? [] : (files as FileUploadProps['storedFiles'])}
										httpMethod={uploadHTTPMethod}
										maxFiles={0}
									/>
								)}
							/>
							<Route
								path={appendPathSegment(basePath, 'step2')}
								render={() => (
									<MetadataForm
										{...metadataForm}
										onChange={(data, valid) => {
											// dispatch(setMetadata(data));
											setIsValidForm(valid);
										}}
									/>
								)}
							/>
							<Route
								path={appendPathSegment(basePath, 'step3')}
								render={() => (
									<>Step3</>
								)}
							/>
						</ModalContentStyle>
					</Modal.Content>
				</>
				<WizardFooter
					cancel={{ visible: true, onClick: confirm, dataTestId: 'cancel-wizard' }}
					previous={{
						visible: appendTrailingSlash(location.pathname) !== basePath,
						onClick: () => {
							switch (location.pathname) {
								case `${basePath}step2`:
									history.push(basePath)
									break;
									case `${basePath}step3`:
									history.push(appendPathSegment(basePath, 'step2'))
									break;
								default:
									break;
							}
						},
						dataTestId: 'previous-button',
					}}
					next={{
						visible: appendTrailingSlash(location.pathname) !== `${basePath}step3/`,
						onClick: () => {
							switch (location.pathname) {
								case `${basePath}`:
									history.push(appendPathSegment(basePath, 'step2'))
									break;
								case `${basePath}step2`:
									history.push(appendPathSegment(basePath, 'step3'))
									break;
								default:
									break;
							}
						},
						dataTestId: 'next-button',
					}}
					save={{
						visible: (appendTrailingSlash(location.pathname) === `${basePath}step3/`),
						disabled: !isValidForm,
						dataTestId: 'save-button',
					}}
				/>
			</Modal>
		</>
	);
}
