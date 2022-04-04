import React, { SyntheticEvent, useCallback } from 'react';
import { Modal } from '@amsterdam/bmi-component-library';
import { useAppDispatch, useAppSelector } from '../../hooks';

import useConfirmTermination from '../../../hooks/useConfirmTermination';
import ConfirmTermination from '../../../components/ConfirmTermination/ConfirmTermination';
import WizardFooter from '../../../components/WizardFooter/WizardFooter';

import { CurrentStep } from '../single/model';
import { getCurrentStepFromStore, getFileFromStore, getMetadataFromStore } from '../single/selectors';
import { resetState } from '../single/slice';
import { Props } from '../single/types';

import { ModalContentStyle, ModalTopBarStyle } from './styles';
import { push } from 'redux-first-history';
import { SingleStepsToRoutes, STEP0 } from '../single/constants';

type SingleWizardProps<T> = {
	children?: React.ReactNode;
	isValidForm: boolean;
} & Props<T>;

export default function SingleWizard<T>({
	asset,
	children,
	isValidForm,
	onCancel,
	onMetadataSubmit,
}: SingleWizardProps<T>) {
	const { isOpen, confirm } = useConfirmTermination(() => resetAndClose());
	const dispatch = useAppDispatch();
	const currentStep = useAppSelector(getCurrentStepFromStore);
	const file = useAppSelector(getFileFromStore);
	const metadata = useAppSelector(getMetadataFromStore) as T;

	const handlePrev = useCallback(() => {
		switch (currentStep) {
			case CurrentStep.SelectFields:
				dispatch(push(SingleStepsToRoutes[CurrentStep.Upload]));
				break;
			case CurrentStep.Upload:
				dispatch(push(SingleStepsToRoutes[CurrentStep.Button]));
				break;
		}
	}, [currentStep]);
	const handleNext = useCallback(() => {
		switch (currentStep) {
			case CurrentStep.Upload:
				if (file) dispatch(push(SingleStepsToRoutes[CurrentStep.SelectFields]));
				break;
		}
	}, [currentStep, file]);

	const close = useCallback(() => {
		dispatch(resetState());
		dispatch(push(STEP0));
	}, []);

	const resetAndClose = useCallback(() => {
		dispatch(resetState());
		dispatch(push(STEP0));
		onCancel({}).catch((err) => {
			console.error(err); // @TODO handle error gracefully
		});
	}, []);

	const handleSubmit = useCallback(
		(e: SyntheticEvent) => {
			e.preventDefault();

			if (file) {
				onMetadataSubmit({ file, metadata })
					.then(() => close())
					.catch((err) => {
						console.error(err); // @TODO handle error gracefully
					});
			}
		},
		[file, metadata],
	);

	return (
		<>
			{isOpen && <ConfirmTermination backdropOpacity={1} />}
			<Modal id="dms-upload-wizard" open onClose={() => confirm()} closeOnBackdropClick={false}>
				<Modal.TopBar hideCloseButton={false} onCloseButton={() => confirm()}>
					<ModalTopBarStyle styleAs="h4" as="h2">
						Bestand uploaden voor {asset.name}
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
						visible: currentStep >= CurrentStep.SelectFields,
						onClick: handlePrev,
						dataTestId: 'previous-button',
					}}
					next={{
						visible: currentStep <= CurrentStep.Upload,
						disabled: !file,
						onClick: handleNext,
						dataTestId: 'next-button',
					}}
					save={{
						visible: true,
						onClick: handleSubmit,
						disabled: (!file && !isValidForm) || currentStep !== CurrentStep.SelectFields,
						dataTestId: 'save-button',
					}}
				/>
			</Modal>
		</>
	);
}
