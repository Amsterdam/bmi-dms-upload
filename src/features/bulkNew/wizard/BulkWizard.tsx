import React from 'react';
import { Modal } from '@amsterdam/bmi-component-library';
import { push } from 'redux-first-history';
import { useDispatch, useSelector } from 'react-redux';

import useConfirmTermination from '../../../hooks/useConfirmTermination';
import ConfirmTermination from '../../../components/ConfirmTermination/ConfirmTermination';
import WizardFooter from '../../../components/WizardFooter/WizardFooter';

import { STEP0 } from '../bulk/constants';
import { CurrentStep } from '../bulk/model';
import { getCurrentStepFromStore } from '../bulk/selectors';
import { resetState, setCurrentStepNext, setCurrentStepPrev } from '../bulk/slice';
import { Props } from '../bulk/types';

import { ModalContentStyle, ModalTopBarStyle } from './styles';

type BulkWizardProps<T> = {
	children: React.ReactNode;
} & Props<T>;

export default function BulkWizard<T>({ children, onCancel, onClose }: BulkWizardProps<T>) {
	const { isOpen, confirm } = useConfirmTermination(() => terminate());

	const dispatch = useDispatch();
	const currentStep = useSelector(getCurrentStepFromStore);

	const handlePrev = () => dispatch(setCurrentStepPrev())
	const handleNext = () => dispatch(setCurrentStepNext())

	function handleOnClose() {
		onCancel({}).catch((err) => {
			console.error(err); // @TODO handle error gracefully
		});
	}

	function resetAndClose() {
		dispatch(resetState());
		push(STEP0);
		handleOnClose();
	}

	function terminate() {
		handleOnClose();
		resetAndClose();
	}

	return (
		<>
			{isOpen && <ConfirmTermination backdropOpacity={1} />}
			<Modal id="dms-bulk-upload-wizard" open onClose={() => confirm()} closeOnBackdropClick={false}>
				<Modal.TopBar hideCloseButton={false} onCloseButton={() => confirm()}>
					<ModalTopBarStyle styleAs="h4" as="h2">
						Bestanden uploaden voor {name}
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
						visible: currentStep !== CurrentStep.Upload,
						onClick: handlePrev,
						dataTestId: 'previous-button',
					}}
					next={{
						visible: currentStep !== CurrentStep.EditFields,
						onClick: handleNext,
						dataTestId: 'next-button',
					}}
					save={{
						visible: true,
						disabled: currentStep !== CurrentStep.EditFields,
						dataTestId: 'save-button',
					}}
				/>
			</Modal>
		</>
	);
}
