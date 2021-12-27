import React, { useEffect } from 'react';
import classNames from 'classnames';
import { BehaviorSubject } from 'rxjs';
import { createPortal } from 'react-dom';
import { DialogStyle, DialogTopBarStyle, DialogBlockStyle, ButtonStyles, BackDropStyle } from './DialogStyles';
import DialogTopBar from './DialogTopBar/DialogTopBar';
import DialogContent from './DialogContent/DialogContent';
import DialogActions from './DialogActions/DialogActions';

type Props = {
	id: string;
	cancelOnBackdropClick?: boolean;
	classnames?: string;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	backdropOpacity?: number;
	zIndexOffset?: number;
};

export interface IState {
	title: string;
	message: string;
	textCancelButton?: string;
	textConfirmButton?: string;
	onCancel?: () => void;
	onConfirm: () => void;
}

const initialState: IState = {
	title: 'Waarschuwing',
	message: '',
	textCancelButton: 'Nee',
	textConfirmButton: 'Ja',
	onCancel: () => {},
	onConfirm: () => {},
};

const store = new BehaviorSubject(initialState);

export const confirm = ({
	title = 'Waarschuwing',
	message = '',
	textConfirmButton = 'Ja',
	textCancelButton = 'Nee',
	onConfirm = () => {},
	onCancel,
}: IState) => {
	store.next({ title, message, textConfirmButton, textCancelButton, onCancel, onConfirm });
};

export interface IDialog extends React.FunctionComponent<Props> {}

const Dialog: IDialog = ({
	id,
	classnames,
	size = 'sm',
	backdropOpacity,
	cancelOnBackdropClick,
	zIndexOffset,
}: Props) => {
	const [state, setState] = React.useState<IState>(initialState);
	const classes = classNames(`modal-${size}`, classnames);

	useEffect(() => {
		store.subscribe((props) => {
			setState({ ...props });
		});
		return () => {
			store.next(initialState);
		};
	}, []);

	return createPortal(
		<>
			{state.message.length > 0 && (
				<DialogStyle id={id} className={classes} zIndexOffset={zIndexOffset}>
					<DialogTopBar>
						<DialogTopBarStyle>{state.title}</DialogTopBarStyle>
					</DialogTopBar>
					<DialogContent>
						<DialogBlockStyle>{state.message}</DialogBlockStyle>
					</DialogContent>
					<DialogActions>
						<DialogActions.Left>
							<ButtonStyles
								data-testid="confirm-button"
								variant="primary"
								onClick={() => {
									state.onConfirm();
								}}
							>
								{state.textConfirmButton}
							</ButtonStyles>
							<ButtonStyles
								data-testid="cancel-button"
								variant="primaryInverted"
								onClick={() => {
									state.onCancel && state.onCancel();
								}}
							>
								{state.textCancelButton}
							</ButtonStyles>
						</DialogActions.Left>
					</DialogActions>
				</DialogStyle>
			)}
			{state.message.length > 0 && (
				<BackDropStyle
					backdropOpacity={backdropOpacity}
					zIndexOffset={zIndexOffset}
					onClick={() => {
						cancelOnBackdropClick && state.onCancel && state.onCancel();
					}}
				/>
			)}
		</>,
		document.querySelector('body')!,
	);
};

export default Dialog;
