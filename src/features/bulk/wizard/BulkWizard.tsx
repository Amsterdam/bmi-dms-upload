import React, { SyntheticEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom-v5-compat';
import { Modal } from '@amsterdam/bmi-component-library';

import { resetState, stepBack, stepForward } from '../bulk/store/slice';
import { getChangeIndividualFields, getCurrentStep, getFiles, getIsBulkMode, getState } from '../bulk/store/selectors';

import useConfirmTermination from '../../../hooks/useConfirmTermination';
import useConfirmSave from '../../../hooks/useConfirmSave';
import ConfirmTermination from '../../../components/ConfirmTermination/ConfirmTermination';
import WizardFooter from '../../../components/WizardFooter/WizardFooter';
import { convertBulkFieldsToBulkFileMetadata, reduceMetadata } from '../bulk/utils';
import { hasValues } from './utils';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { CurrentStep, IBulkFile, IBulkState } from '../bulk/store/model';
import { BulkUploadProps } from '../bulk/types';
import { AlertStyle, ModalContentStyle, ModalStyle, ModalTopBarStyle } from './styles';

type BulkWizardProps<T> = {
	children?: React.ReactNode;
	isValidForm: boolean;
	canShowErrorMessage?: boolean;
} & BulkUploadProps<T>;

const makeMetadataObject = (state: IBulkState): IBulkFile[] => {
	return state.files.map((file) => ({
		id: file.id,
		metadata: reduceMetadata(convertBulkFieldsToBulkFileMetadata(state.fields), file.metadata),
		uploadedFile: file.uploadedFile,
	}));
};

export default function BulkWizard<T>({
	children,
	asset,
	isValidForm = false,
	onCancel,
	onMetadataSubmit,
	canShowErrorMessage,
}: BulkWizardProps<T>) {
	const dispatch = useAppDispatch();

	const state = useAppSelector(getState);
	const currentStep = useSelector(getCurrentStep);
	const files = useSelector(getFiles);
	const individualFields = useSelector(getChangeIndividualFields);
	const isBulkMode = useAppSelector(getIsBulkMode);

	const navigate = useNavigate();

	const { isOpen: isConfirmTerminationOpen, confirm: setConfirmTermination } = useConfirmTermination(() =>
		resetAndClose(),
	);
	const { isOpen: isConfirmSaveOpen } = useConfirmSave(() => save());

	const handlePrev = useCallback(() => {
		dispatch(stepBack({ navigate }));
	}, [navigate]);

	const handleNext = useCallback(() => {
		dispatch(stepForward({ navigate }));
	}, [navigate, files]);

	const resetAndClose = useCallback(() => {
		dispatch(resetState({ navigate }));
		onCancel({}).catch((err) => {
			console.error(err); // @TODO handle error gracefully
		});
	}, [navigate]);

	const close = useCallback(() => {
		dispatch(resetState({ navigate }));
	}, [navigate]);

	const save = useCallback(() => {
		onMetadataSubmit(makeMetadataObject(state))
			.then(() => close())
			.catch((err) => {
				console.error(err); // @TODO handle error gracefully
			});
	}, [state]);

	const fileIndexesContainingInvalidMetadata = () => {
		return files.reduce((acc: number[], file: IBulkFile, index: number) => {
			if (file.isMetadataValid === false) {
				return [...acc, index + 1];
			}
			return acc;
		}, []);
	};

	const filesHaveInvalidMetadata = (): boolean => {
		return files.filter((file) => file.isMetadataValid === false).length > 0;
	};

	const handleSubmit = useCallback(
		(e: SyntheticEvent) => {
			e.preventDefault();
			save();
		},
		[state],
	);

	const isNextVisible = useCallback((): boolean => {
		if (currentStep === CurrentStep.Upload && hasValues(files)) {
			return true;
		}

		return currentStep === CurrentStep.SelectFields && hasValues(individualFields) && isValidForm;
	}, [currentStep, files, individualFields, isValidForm]);

	const isSaveVisible = useCallback((): boolean => {
		if (currentStep === CurrentStep.SelectFields && !hasValues(individualFields) && isValidForm) {
			return true;
		}
		return currentStep === CurrentStep.EditFields;
	}, [currentStep, individualFields, isValidForm]);

	const isSaveDisabled = useCallback((): boolean => {
		return filesHaveInvalidMetadata();
	}, [files]);

	return (
		<>
			{isConfirmTerminationOpen && <ConfirmTermination backdropOpacity={1} />}
			{isConfirmSaveOpen && <ConfirmTermination backdropOpacity={1} />}
			<ModalStyle
				id="dms-upload-wizard"
				open
				onClose={files.length > 0 ? () => setConfirmTermination() : undefined}
				closeOnBackdropClick={false}
				size="xl"
				classnames="modal--bulk"
			>
				<Modal.TopBar hideCloseButton={false} onCloseButton={() => setConfirmTermination(files.length === 0)}>
					<ModalTopBarStyle styleAs="h4" as="h2">
						Bestanden uploaden voor {asset.code} ({asset.name})
					</ModalTopBarStyle>
				</Modal.TopBar>
				<>
					<Modal.Content>
						<ModalContentStyle>
							{/* This error message is only allowed to be visible on the final step and when in bulk mode. */}
							{filesHaveInvalidMetadata() && isBulkMode && canShowErrorMessage && (
								<AlertStyle level="error">
									Er zit een fout in de metadata van het bestand op pagina&apos;s:{' '}
									{fileIndexesContainingInvalidMetadata().join(', ')}
								</AlertStyle>
							)}
							{children}
						</ModalContentStyle>
					</Modal.Content>
				</>
				<WizardFooter
					cancel={{ visible: true, onClick: () => setConfirmTermination(), dataTestId: 'cancel-wizard' }}
					previous={{
						visible: currentStep > CurrentStep.Upload,
						onClick: handlePrev,
						dataTestId: 'previous-button',
					}}
					next={{
						visible: isNextVisible(),
						onClick: handleNext,
						dataTestId: 'next-button',
					}}
					save={{
						visible: isSaveVisible(),
						disabled: isSaveDisabled(),
						onClick: handleSubmit,
						dataTestId: 'save-button',
					}}
				/>
			</ModalStyle>
		</>
	);
}
