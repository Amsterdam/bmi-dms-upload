import React, { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@amsterdam/bmi-component-library';

import useConfirmTermination from '../../../hooks/useConfirmTermination';
import ConfirmTermination from '../../../components/ConfirmTermination/ConfirmTermination';
import WizardFooter from '../../../components/WizardFooter/WizardFooter';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { CurrentStep, IBulkFile, IBulkState } from '../bulk/store/model';
import { Props } from '../bulk/types';
import { getChangeIndividualFields, getCurrentStep, getFiles, getState } from '../bulk/store/selectors';
import { resetState, stepBack, stepForward } from '../bulk/store/slice';

import { ModalContentStyle, ModalStyle, ModalTopBarStyle } from './styles';
import { reduceMetadata } from '../bulk/utils';

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
	const { isOpen, confirm } = useConfirmTermination(() => resetAndClose());
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

	function resetAndClose() {
		dispatch(resetState({ navigate }));
		onCancel({}).catch((err) => {
			console.error(err); // @TODO handle error gracefully
		});
	}

	function close() {
		dispatch(resetState({ navigate }));
	}

	const handleSubmit = useCallback(
		(e: SyntheticEvent) => {
			e.preventDefault();
			if (files && isValidForm) {
				onMetadataSubmit(makeMetadataObject(state))
					.then(() => close())
					.catch((err) => {
						console.error(err); // @TODO handle error gracefully
					});
			}
		},
		[files, isValidForm],
	);

	const isSaveDisabled = useCallback((): boolean => {
		let isAllValid = false;
		const hasFiles = files && files.length > 0;
		const hasIndividualFields = individualFields && individualFields.length > 0;

		// Show save in step 2 when:
		// - hasFiles = true
		// - isValidForm = true
		// - hasIndividualFields = false
		if (currentStep === CurrentStep.SelectFields) {
			isAllValid = hasFiles && !hasIndividualFields && isValidForm;
		}

		// Show save in step 3 when:
		// - hasIndividualFields = false
		// else:
		// - hasFiles = true
		// - isValidForm = true
		else if (currentStep === CurrentStep.EditFields) {
			isAllValid = !hasIndividualFields ? true : hasFiles && isValidForm
		}

		return !isAllValid;
	}, [files, individualFields, isValidForm]);

	return (
		<>
			{isOpen && <ConfirmTermination backdropOpacity={1} />}
			<ModalStyle
				id="dms-upload-wizard"
				open
				onClose={() => confirm()}
				closeOnBackdropClick={false}
				size="xl"
				classnames="modal--bulk"
			>
				<Modal.TopBar hideCloseButton={false} onCloseButton={() => confirm()}>
					<ModalTopBarStyle styleAs="h4" as="h2">
						Bestanden uploaden voor {asset.name}
					</ModalTopBarStyle>
				</Modal.TopBar>
				<>
					<Modal.Content>
						<ModalContentStyle>{children}</ModalContentStyle>
					</Modal.Content>
				</>
				<WizardFooter
					cancel={{ visible: true, onClick: confirm, dataTestId: 'cancel-wizard' }}
					previous={{
						visible: currentStep > CurrentStep.Upload,
						onClick: handlePrev,
						dataTestId: 'previous-button',
					}}
					next={{
						visible: currentStep < CurrentStep.EditFields,
						disabled: !isValidForm,
						onClick: handleNext,
						dataTestId: 'next-button',
					}}
					save={{
						visible: true,
						onClick: handleSubmit,
						disabled: isSaveDisabled(),
						dataTestId: 'save-button',
					}}
				/>
			</ModalStyle>
		</>
	);
}
