import React from 'react';
import { storiesOf } from '@storybook/react';
import { confirm } from '@amsterdam/bmi-component-library';
import ConfirmTermination, { customSubject } from './ConfirmTermination';
import { MODAL_SIZES } from '../../enums/MODAL_SIZES';

const empty = () =>
	confirm({
		title: '',
		message: '',
		onCancel: () => {},
		onConfirm: () => {},
	});

const callbackMocks = {
	onCancel: empty,
	onConfirm: empty,
	onCloseButton: empty,
};

const props = {
	title: 'Waarschuwing',
	message: 'Weet u zeker dat u dit document definitief wilt verwijderen?',
	...callbackMocks,
};

const customProps = {
	title: 'Warning',
	message: 'Do you want to delete this document?',
	textCancelButton: 'Cancel',
	textConfirmButton: 'Confirm',
	...callbackMocks,
};

const landingPage = (customProps: any) => {
	return (
		<button
			onClick={() => {
				confirm(customProps, customSubject);
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
			<ConfirmTermination size={MODAL_SIZES.MD} />
		</>
	))
	.add('With Custom Buttons', () => (
		<>
			{landingPage(customProps)}
			<ConfirmTermination />
		</>
	));
