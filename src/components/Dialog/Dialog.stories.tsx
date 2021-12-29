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
	onCloseButton: () => {
		confirm(empty);
	},
};

const alt = {
	title: 'Warning',
	message: 'Are you sure you want to delete this document?',
	textCancelButton: 'Cancel',
	textConfirmButton: 'Confirm',
	onCancel: () => {
		confirm(empty);
	},
	onConfirm: () => {
		confirm(empty);
	},
	onCloseButton: () => {
		confirm(empty);
	},
};

const empty = {
	title: '',
	message: '',
	onCancel: () => {},
	onConfirm: () => {},
};

storiesOf('Dialog', module)
	.add('Default', () => (
		<>
			<button
				onClick={() => {
					confirm(props);
				}}
			>
				Open Dialog
			</button>
			<Dialog id={'confirm-termination-modal'} />
		</>
	))
	.add('With Close Button', () => (
		<>
			<button
				onClick={() => {
					confirm(props);
				}}
			>
				Open Dialog
			</button>
			<Dialog id={'confirm-termination-modal'} hideCloseButton={false} />
		</>
	))
	.add('Cancel On Backdrop', () => (
		<>
			<button
				onClick={() => {
					confirm(props);
				}}
			>
				Open Dialog
			</button>
			<Dialog id={'confirm-termination-modal'} cancelOnBackdropClick={true} />
		</>
	))
	.add('Custom Buttons', () => (
		<>
			<button
				onClick={() => {
					confirm(alt);
				}}
			>
				Open Dialog
			</button>
			<Dialog id={'confirm-termination-modal'} />
		</>
	));
