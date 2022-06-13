import React, { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@amsterdam/bmi-component-library';

import useConfirmTermination from '../../../hooks/useConfirmTermination';
import useConfirmSave from '../../../hooks/useConfirmSave';
import ConfirmTermination from '../../../components/ConfirmTermination/ConfirmTermination';
import WizardFooter from '../../../components/WizardFooter/WizardFooter';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { CurrentStep, IBulkFile, IBulkState } from '../bulk/store/model';
import { Props } from '../bulk/types';
import { getChangeIndividualFields, getCurrentStep, getFiles, getState } from '../bulk/store/selectors';
import { resetState, stepBack, stepForward } from '../bulk/store/slice';

import { AlertStyle, ModalContentStyle, ModalStyle, ModalTopBarStyle } from './styles';
import { reduceMetadata } from '../bulk/utils';
import { hasValues } from './utils';

type BulkWizardProps<T> = {
	children?: React.ReactNode;
	isValidForm: boolean;
} & Props<T>;

const makeMetadataObject = (state: IBulkState): IBulkFile[] => {
	return state.files.map((file) => ({
		id: file.id,
		metadata: reduceMetadata(state.fields, file.metadata),
		uploadedFile: file.uploadedFile,
	}));
};

export default function BulkWizard<T>({
	children,
	asset,
	isValidForm = false,
	onCancel,
	onMetadataSubmit,
}: BulkWizardProps<T>) {
	const state = useAppSelector(getState);
	const { isOpen: isConfirmTerminationOpen, confirm: setConfirmTermination } = useConfirmTermination(() =>
		resetAndClose(),
	);
	const { isOpen: isConfirmSaveOpen } = useConfirmSave(() => save());
	const currentStep = useAppSelector(getCurrentStep);
	const dispatch = useAppDispatch();
	const files = useAppSelector(getFiles);
	const individualFields = useAppSelector(getChangeIndividualFields);
	const navigate = useNavigate();

	const handlePrev = useCallback(() => {
		dispatch(stepBack({ navigate }));
	}, [navigate]);

	const handleNext = useCallback(() => {
		dispatch(stepForward({ navigate }));
	}, [navigate]);

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

	const filesContainingInvalidMetadata = () => {
		return files.filter((file) => file.isMetadataValid === false);
	};

	const filesHaveInvalidMetadata = () => {
		return hasValues(filesContainingInvalidMetadata()) ? true : false;
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

		if (currentStep === CurrentStep.SelectFields && hasValues(individualFields) && isValidForm) {
			return true;
		}

		return false;
	}, [currentStep, files, individualFields, isValidForm]);

	const isSaveVisible = useCallback((): boolean => {
		if (currentStep === CurrentStep.SelectFields && !hasValues(individualFields) && isValidForm) {
			return true;
		}
		if (currentStep === CurrentStep.EditFields) {
			return true;
		}

		return false;
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
				onClose={() => setConfirmTermination()}
				closeOnBackdropClick={false}
				size="xl"
				classnames="modal--bulk"
			>
				<Modal.TopBar hideCloseButton={false} onCloseButton={() => setConfirmTermination()}>
					<ModalTopBarStyle styleAs="h4" as="h2">
						Bestanden uploaden voor {asset.code} ({asset.name})
					</ModalTopBarStyle>
				</Modal.TopBar>
				<>
					<Modal.Content>
						<ModalContentStyle>
							{filesHaveInvalidMetadata() && (
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
					cancel={{ visible: true, onClick: setConfirmTermination, dataTestId: 'cancel-wizard' }}
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
