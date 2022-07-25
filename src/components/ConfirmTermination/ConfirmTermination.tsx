import React from 'react';
import { ConfirmDialog, initialConfirmDialogState } from '@amsterdam/bmi-component-library';
import { BackDropStyle } from './ConfirmTerminationStyles';
import { createPortal } from 'react-dom';
import { MODAL_SIZES } from '../../enums/MODAL_SIZES';
import { BehaviorSubject } from 'rxjs';

import type { IConfirmDialogStoreState } from '@amsterdam/bmi-component-library';

export type Props = {
	size?: MODAL_SIZES;
	hideCloseButton?: boolean;
	backdropOpacity?: number;
};

export interface IDialog extends React.FunctionComponent<Props> {}

export const customSubject = new BehaviorSubject<IConfirmDialogStoreState>(initialConfirmDialogState);

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
				store={customSubject}
			/>
			{backdropOpacity == 1 && <BackDropStyle zIndexOffset={1} />}
		</>,
		document.body!,
	);
};

export default ConfirmTermination;
