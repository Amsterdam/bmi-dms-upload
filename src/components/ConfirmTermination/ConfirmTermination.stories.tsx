import React from 'react';

import { storiesOf } from '@storybook/react';
import { confirm } from '@amsterdam/bmi-component-library';
import ConfirmTermination from './ConfirmTermination';

const props = {
	title: 'Annuleer uploaden',
	message:
		'U gaat het uploaden van de bestanden annuleren. De geuploade bestanden zullen uit het systeem worden verwijderd',
	textCancelButton: '< Terug',
	textConfirmButton: 'Oke >',
	onCancel: () => {
		console.log('Terug');
	},
	onConfirm: () => {
		console.log('Oke');
	},
};

storiesOf('ConfirmTermination', module).add('Default', () => (
	<>
		<button onClick={() => confirm(props)}>Annuleren</button>
		<ConfirmTermination />
	</>
));
