import React, { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@amsterdam/bmi-component-library';

import useConfirmTermination from '../../../hooks/useConfirmTermination';
import ConfirmTermination from '../../../components/ConfirmTermination/ConfirmTermination';
import WizardFooter from '../../../components/WizardFooter/WizardFooter';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { CurrentStep } from '../bulk/model';
import { getCurrentStep, getFiles } from '../bulk/selectors';
import { resetState, stepBack, stepForward } from '../bulk/slice';
import { Props } from '../bulk/types';

import { ModalContentStyle, ModalTopBarStyle } from './styles';

type BulkWizardProps<T> = {
	children?: React.ReactNode;
	isValidForm?: boolean;
} & Props<T>;

export default function BulkWizard<T>({
	children,
	asset,
	isValidForm,
	onCancel,
	onMetadataSubmit,
}: BulkWizardProps<T>) {
	const { isOpen, confirm } = useConfirmTermination(() => resetAndClose());
	const currentStep = useAppSelector(getCurrentStep);
	const dispatch = useAppDispatch();
	const files = useAppSelector(getFiles);
	const navigate = useNavigate();

	const handlePrev = useCallback(() => {
		dispatch(stepBack({ navigate }));
	}, [navigate]);

	const handleNext = useCallback(() => {
		dispatch(stepForward({ navigate }));
	}, [navigate]);

	const close = useCallback(() => {
		dispatch(resetState({ navigate }));
	}, [navigate]);

	function resetAndClose() {
		dispatch(resetState({ navigate }));
		onCancel({}).catch((err) => {
			console.error(err); // @TODO handle error gracefully
		});
	}

	const handleSubmit = useCallback(
		(e: SyntheticEvent) => {
			e.preventDefault();
			if (files && isValidForm) {
				onMetadataSubmit({ todo: true })
					.then(() => close())
					.catch((err) => {
						console.error(err); // @TODO handle error gracefully
					});
			}
		},
		[files, isValidForm],
	);

	function isSaveDisabled() {
		const hasFiles = files && files.length > 0;
		const isSaveStep = currentStep === CurrentStep.EditFields;
		const isAllValid = hasFiles && isValidForm && isSaveStep;
		return !isAllValid;
	}

	return (
		<>
			{isOpen && <ConfirmTermination backdropOpacity={1} />}
			<Modal id="dms-upload-wizard" open onClose={() => confirm()} closeOnBackdropClick={false}>
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
						disabled: files?.length === 0,
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
			</Modal>
		</>
	);
}
