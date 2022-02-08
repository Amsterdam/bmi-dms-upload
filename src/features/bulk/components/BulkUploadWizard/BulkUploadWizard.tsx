import React, { SyntheticEvent, useCallback, useState } from 'react';
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
import { setFile } from '../../store/slice'
import { IBulkMetadataFile } from '../../store/model';

export type Props<T> = {
	onClose: () => void;
} & BulkWizardImplementationProps<T>;

export default function BulkUploadWizard<T>({
	asset: { name },
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

	function resetAndClose() {
		// dispatch(resetState());
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

	const handleFileRemove = () => console.log('handleFileRemove');

	const getFile = React.useCallback(
		(uploadedFile: CustomFile) => {
			console.log('getFile', uploadedFile)
			const file: IBulkMetadataFile = {
				id: `${uploadedFile.tmpId}`,
				url: 'some-url',
				uploadedFile,
			}
			console.log('!!! getFile', file)
			// onFileSuccess && onFileSuccess(files);
			dispatch(setFile(file));
		},
		[onFileSuccess],
	);

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
										onFileSuccess={getFile}
										storedFiles={!files ? [] : (files as FileUploadProps['storedFiles'])}
										httpMethod={uploadHTTPMethod}
										maxFiles={10}
									/>
								)}
							/>
						</ModalContentStyle>
					</Modal.Content>
				</>
				<WizardFooter
					cancel={{ visible: true, onClick: confirm, dataTestId: 'cancel-wizard' }}
					previous={{
						visible: appendTrailingSlash(location.pathname) !== basePath,
						onClick: () => history.push(basePath),
						dataTestId: 'previous-button',
					}}
					next={{
						visible: !!(appendTrailingSlash(location.pathname) === basePath),
						onClick: () => history.push(appendPathSegment(basePath, 'step2')),
						dataTestId: 'next-button',
					}}
					save={{
						visible: appendTrailingSlash(location.pathname) !== basePath,
						disabled: !isValidForm,
						onClick: () => console.log('save'),
						dataTestId: 'save-button',
					}}
				/>
			</Modal>
		</>
	);
}
