import React from 'react';
import {
	DialogActionsStyle,
	DialogActionsLeftStyle,
	DialogActionsRightStyle,
	DialogActionsSplitStyle,
} from './DialogActionsStyles';

export interface Props {
	children?: React.ReactNode | React.ReactNode[] | any;
}
export interface IModalActions extends React.FunctionComponent<Props> {
	Left: React.FunctionComponent<Props>;
	Right: React.FunctionComponent<Props>;
}

const DialogActions = ({ children }: Props) => {
	let hasLeftAndRightContent = false;

	React.Children.map(children, (child) => {
		if (child?.type?.name === 'DialogActionsLeft') {
			hasLeftAndRightContent = true;
		}
	});

	return hasLeftAndRightContent ? (
		<DialogActionsSplitStyle data-testid="dialog-actions">{children}</DialogActionsSplitStyle>
	) : (
		<DialogActionsStyle data-testid="dialog-actions">{children}</DialogActionsStyle>
	);
};

const DialogActionsLeft = ({ children }: Props) => <DialogActionsLeftStyle>{children}</DialogActionsLeftStyle>;
const DialogActionsRight = ({ children }: Props) => <DialogActionsRightStyle>{children}</DialogActionsRightStyle>;

DialogActions.Left = DialogActionsLeft;
DialogActions.Right = DialogActionsRight;
DialogActions.displayName = 'DialogActions';

export default DialogActions;
