import React, { SyntheticEvent, useCallback } from 'react';
import { Modal } from '@amsterdam/bmi-component-library';
import { push } from 'redux-first-history';
import { useAppDispatch, useAppSelector } from '../../hooks';

import useConfirmTermination from '../../../hooks/useConfirmTermination';
import ConfirmTermination from '../../../components/ConfirmTermination/ConfirmTermination';
import WizardFooter from '../../../components/WizardFooter/WizardFooter';

import { BulkStepsToRoutes, STEP0 } from '../bulk/constants';
import { CurrentStep } from '../bulk/model';
import { getCurrentStepFromStore, getFilesFromStore } from '../bulk/selectors';
import { resetState } from '../bulk/slice';
import { Props } from '../bulk/types';

import { ModalContentStyle, ModalTopBarStyle } from './styles';

type BulkWizardProps<T> = {
	children?: React.ReactNode;
} & Props<T>;

export default function BulkWizard<T>({ children, asset, onCancel, onMetadataSubmit }: BulkWizardProps<T>) {
	const { isOpen, confirm } = useConfirmTermination(() => resetAndClose());

	const dispatch = useAppDispatch();
	const currentStep = useAppSelector(getCurrentStepFromStore);
	const files = useAppSelector(getFilesFromStore);
	const isValidForm = true;

	const handlePrev = useCallback(() => {
		switch (currentStep) {
			case CurrentStep.EditFields:
				dispatch(push(BulkStepsToRoutes[CurrentStep.SelectFields]));
				break;
			case CurrentStep.SelectFields:
				dispatch(push(BulkStepsToRoutes[CurrentStep.Upload]));
				break;
			case CurrentStep.Upload:
				dispatch(push(BulkStepsToRoutes[CurrentStep.Button]));
				break;
		}
	}, [currentStep])

	const handleNext = useCallback(() => {
		switch (currentStep) {
			case CurrentStep.Upload:
				if (files) dispatch(push(BulkStepsToRoutes[CurrentStep.SelectFields]));
				break;
			case CurrentStep.SelectFields:
				if (files) dispatch(push(BulkStepsToRoutes[CurrentStep.EditFields]));
				break;
		}
	}, [currentStep, files]);

	const close = useCallback(() => {
		dispatch(resetState());
		dispatch(push(STEP0));
	}, []);

	function resetAndClose() {
		dispatch(resetState());
		push(STEP0);

		onCancel({}).catch((err) => {
			console.error(err); // @TODO handle error gracefully
		});
	}

	const handleSubmit = useCallback(
		(e: SyntheticEvent) => {
			e.preventDefault();
			if (files) {
				onMetadataSubmit({ todo: true })
					.then(() => close())
					.catch((err) => {
						console.error(err); // @TODO handle error gracefully
					});
			}
		}, [files, isValidForm])

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
						disabled: (files?.length === 0 && !isValidForm) || currentStep !== CurrentStep.EditFields,
						dataTestId: 'save-button',
					}}
				/>
			</Modal>
		</>
	);
}
