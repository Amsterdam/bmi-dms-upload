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
	hideCloseButton?: boolean;
};

export interface IState {
	title: string;
	message: string;
	textCancelButton?: string;
	textConfirmButton?: string;
	onCancel?: () => void;
	onConfirm: () => void;
	onCloseButton?: () => void;
}

const initialState: IState = {
	title: 'Waarschuwing',
	message: '',
	textCancelButton: 'Nee',
	textConfirmButton: 'Ja',
	onCancel: () => {},
	onConfirm: () => {},
	onCloseButton: () => {},
};

const store = new BehaviorSubject(initialState);

export const confirm = ({
	title = 'Waarschuwing',
	message = '',
	textConfirmButton = 'Ja',
	textCancelButton = 'Nee',
	onConfirm = () => {},
	onCancel,
	onCloseButton,
}: IState) => {
	store.next({ title, message, textConfirmButton, textCancelButton, onCancel, onConfirm, onCloseButton });
};

export interface IDialog extends React.FunctionComponent<Props> {}

const Dialog: IDialog = ({
	id,
	classnames,
	size = 'xs',
	backdropOpacity,
	cancelOnBackdropClick,
	zIndexOffset,
	hideCloseButton = true,
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
				<DialogStyle id={id} data-testid="confirm-dialog" className={classes} zIndexOffset={zIndexOffset}>
					<DialogTopBar
						hideCloseButton={hideCloseButton}
						onCloseButton={() => {
							state.onCloseButton && state.onCloseButton();
						}}
					>
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
					data-testid="backdrop-button"
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
