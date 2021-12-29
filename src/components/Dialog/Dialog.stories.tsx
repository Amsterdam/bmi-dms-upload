import React from 'react';
import { storiesOf } from '@storybook/react';
import Dialog, { confirm } from './Dialog';

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

const loremIpsum = {
	title: 'Lorem Ipsum',
	message:
		'Quasi quo aliquid molestiae impedit. Laborum et ratione qui quia molestias ab adipisci. Veritatis animi atque officia rerum reprehenderit aut repudiandae. Temporibus labore ipsum exercitationem. Nostrum dolores dolorum excepturi sapiente et tenetur. Commodi iusto nemo odio dolores perspiciatis non officiis laborum.',
	...emptyButtons,
};

const alt = {
	title: 'Warning',
	message: 'Are you sure you want to delete this document?',
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
			Open Dialog
		</button>
	);
};

storiesOf('Dialog', module)
	.add('Default', () => (
		<>
			{landingPage(props)}
			<Dialog id={'confirm-termination-modal'} />
		</>
	))
	.add('With Close Button', () => (
		<>
			{landingPage(props)}
			<Dialog id={'confirm-termination-modal'} hideCloseButton={false} />
		</>
	))
	.add('Cancel On Backdrop', () => (
		<>
			{landingPage(props)}
			<Dialog id={'confirm-termination-modal'} cancelOnBackdropClick={true} />
		</>
	))
	.add('Custom Buttons', () => (
		<>
			{landingPage(alt)}
			<Dialog id={'confirm-termination-modal'} />
		</>
	))
	.add('Different Dialog Size', () => (
		<>
			{landingPage(loremIpsum)}
			<Dialog id={'confirm-termination-modal'} size={'lg'} />
		</>
	));
