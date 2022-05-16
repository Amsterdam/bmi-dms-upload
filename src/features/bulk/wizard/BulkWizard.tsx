import React, { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@amsterdam/bmi-component-library';

import useConfirmTermination from '../../../hooks/useConfirmTermination';
import ConfirmTermination from '../../../components/ConfirmTermination/ConfirmTermination';
import WizardFooter from '../../../components/WizardFooter/WizardFooter';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { CurrentStep, IBulkFile, IBulkState } from '../bulk/store/model';
import { Props } from '../bulk/types';
import { getCurrentStep, getFiles, getState } from '../bulk/store/selectors';
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

	const handleSubmit = useCallback(
		(e: SyntheticEvent) => {
			e.preventDefault();
			if (files && isValidForm) {
				onMetadataSubmit(makeMetadataObject(state))
					.then(() => resetAndClose())
					.catch((err) => {
						console.error(err); // @TODO handle error gracefully
					});
			}
		},
		[files, isValidForm],
	);

	function isSaveDisabled(): boolean {
		const hasFiles = files && files.length > 0;
		const isSaveStep = currentStep === CurrentStep.EditFields;
		const isAllValid = hasFiles && isValidForm && isSaveStep;
		return !isAllValid;
	}

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
