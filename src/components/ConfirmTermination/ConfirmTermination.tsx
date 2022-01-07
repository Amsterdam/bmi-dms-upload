import React from 'react';
import { ConfirmDialog } from '@amsterdam/bmi-component-library';
import { BackDropStyle } from './ConfirmTerminationStyles';
import { createPortal } from 'react-dom';

export interface IState {
	message: string;
	onConfirm: () => void;
	title?: string;
	textCancelButton?: string;
	textConfirmButton?: string;
	onCancel?: () => void;
	size?: string;
	onClose?: () => void;
}

export type Props = {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	hideCloseButton?: boolean;
	backdropOpacity?: number;
};

export interface IDialog extends React.FunctionComponent<Props> {}

const ConfirmTermination: IDialog = ({ size = 'xs', hideCloseButton = true, backdropOpacity = 0.3 }: Props) => {
	return createPortal(
		<>
			<ConfirmDialog
				data-testid="confirm-termination"
				zIndexOffset={2}
				hideCloseButton={hideCloseButton}
				size={size}
				backdropOpacity={backdropOpacity}
				disablePortal={true}
			/>
			{backdropOpacity == 1 && <BackDropStyle zIndexOffset={1} />}
		</>,
		document.body!,
	);
};

export default ConfirmTermination;
