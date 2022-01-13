import React from 'react';
import { ConfirmDialog } from '@amsterdam/bmi-component-library';
import { BackDropStyle } from './ConfirmTerminationStyles';
import { createPortal } from 'react-dom';
import { MODAL_SIZES } from '../../enums/MODAL_SIZES';

export type Props = {
	size?: MODAL_SIZES;
	hideCloseButton?: boolean;
	backdropOpacity?: number;
};

export interface IDialog extends React.FunctionComponent<Props> {}

const ConfirmTermination: IDialog = ({
	size = MODAL_SIZES.XS,
	hideCloseButton = true,
	backdropOpacity = 0.3,
}: Props) => {
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
