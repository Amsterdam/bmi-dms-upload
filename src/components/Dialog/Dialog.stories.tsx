import React from 'react';
import { storiesOf } from '@storybook/react';
import Dialog, { confirm } from './Dialog';

const props = {
	title: 'Waarschuwing',
	message: 'Weet u zeker dat u dit document definitief wilt verwijderen?',
	onCancel: () => {
		confirm(empty);
	},
	onConfirm: () => {
		confirm(empty);
	},
};

const empty = {
	title: '',
	message: '',
	onCancel: () => {},
	onConfirm: () => {},
};

storiesOf('Dialog', module).add('Default', () => (
	<>
		<button
			onClick={() => {
				confirm(props);
			}}
		>
			Annuleren
		</button>
		<Dialog id={'Confirm Termination'} cancelOnBackdropClick={true} />
	</>
));
