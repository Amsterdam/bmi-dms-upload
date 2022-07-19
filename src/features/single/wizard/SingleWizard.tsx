import React, { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom-v5-compat';
import { Modal } from '@amsterdam/bmi-component-library';

import useConfirmTermination from '../../../hooks/useConfirmTermination';
import ConfirmTermination from '../../../components/ConfirmTermination/ConfirmTermination';
import WizardFooter from '../../../components/WizardFooter/WizardFooter';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { CurrentStep } from '../single/store/model';
import { getCurrentStep, getFile, getMetadata } from '../single/store/selectors';
import { resetState, stepBack, stepForward } from '../single/store/slice';
import { Props } from '../single/types';

import { ModalContentStyle, ModalTopBarStyle } from './styles';

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
	const currentStep = useAppSelector(getCurrentStep);
	const dispatch = useAppDispatch();
	const file = useAppSelector(getFile);
	const metadata = useAppSelector(getMetadata) as T;
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

	const resetAndClose = useCallback(() => {
		dispatch(resetState({ navigate }));
		onCancel({}).catch((err) => {
			console.error(err); // @TODO handle error gracefully
		});
	}, []);

	const handleSubmit = useCallback(
		(e: SyntheticEvent) => {
			e.preventDefault();

			if (file && isValidForm) {
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
