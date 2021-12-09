import React from 'react';
import { ConfirmDialog } from '@amsterdam/bmi-component-library';
import { BehaviorSubject } from 'rxjs';

export interface IState {
	title: string;
	message: string;
	textCancelButton: string;
	textConfirmButton: string;
	onCancel: () => void;
	onConfirm: () => void;
}

const defaultMessage = 'Bla';

const initialState: IState = {
	title: 'Waarschuwing',
	message: '',
	textCancelButton: 'Nee',
	textConfirmButton: 'Ja',
	onCancel: () => {},
	onConfirm: () => {},
};

const store = new BehaviorSubject(initialState);

export const confirm = ({ ...props }: Partial<IState>) => {
	store.next({ ...initialState, message: defaultMessage, ...props });
};

const ConfirmTermination = () => (
	<>
		<ConfirmDialog />
	</>
);

export default ConfirmTermination;
