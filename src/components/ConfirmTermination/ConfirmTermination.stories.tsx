import React from 'react';
import { storiesOf } from '@storybook/react';
import { confirm } from '@amsterdam/bmi-component-library';
import ConfirmTermination from './ConfirmTermination';

const emptyButtons = {
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

const props = {
	title: 'Waarschuwing',
	message: 'Weet u zeker dat u dit document definitief wilt verwijderen?',
	...emptyButtons,
};

const customProps = {
	title: 'Warning',
	message: 'Do you want to delete this document?',
	textCancelButton: 'Cancel',
	textConfirmButton: 'Confirm',
	...emptyButtons,
};

const empty = {
	title: '',
	message: '',
	onCancel: () => {},
	onConfirm: () => {},
};

const landingPage = (customProps: any) => {
	return (
		<button
			onClick={() => {
				confirm(customProps);
			}}
		>
			Open ConfirmTermination
		</button>
	);
};

storiesOf('ConfirmTermination', module)
	.add('Default', () => (
		<>
			{landingPage(props)}
			<ConfirmTermination />
		</>
	))
	.add('With Close Button', () => (
		<>
			{landingPage(props)}
			<ConfirmTermination hideCloseButton={false} />
		</>
	))
	.add('Different Dialog Size', () => (
		<>
			{landingPage(props)}
			<ConfirmTermination size={'md'} />
		</>
	))
	.add('With Custom Buttons', () => (
		<>
			{landingPage(customProps)}
			<ConfirmTermination />
		</>
	));
