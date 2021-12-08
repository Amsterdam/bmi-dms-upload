import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithTheme from '../../../tests/utils/withTheme';
import WizardFooter from './WizardFooter';

const defaultAndCustomButtons = [
	['cancel', 'default', 'Annuleren'],
	['cancel', 'custom', 'Cancel', 'Cancel'],
	['previous', 'default', 'Vorige'],
	['previous', 'custom', 'Previous', 'Previous'],
	['next', 'default', 'Volgende'],
	['next', 'custom', 'Next', 'Next'],
	['save', 'default', 'Opslaan'],
	['save', 'custom', 'Save', 'Save'],
];

const clickedButtons = [
	['cancel', 'Annuleren'],
	['previous', 'Vorige'],
	['next', 'Volgende'],
	['save', 'Opslaan'],
];

const disabledButtons = [
	['save', 'Opslaan'],
	['next', 'Volgende'],
];

describe('<WizardFooter />', () => {
	test.each(defaultAndCustomButtons)(
		'Renders %s %s button',
		(buttonType, testCase, buttonLabel, customLabel: any = undefined) => {
			let props: any;

			if (testCase === 'default') {
				props = { [buttonType]: { visible: true } };
			}

			if (testCase === 'custom') {
				props = { [buttonType]: { visible: true, label: customLabel } };
			}

			renderWithTheme(<WizardFooter {...props} />);

			expect(screen.getByText(buttonLabel));
		},
	);

	test.each(clickedButtons)('Clicks on %s button', (buttonType, buttonLabel) => {
		const onClick = jest.fn();
		const props = { [buttonType]: { visible: true, onClick: onClick, dataTestId: buttonType } };

		renderWithTheme(<WizardFooter {...props} />);

		fireEvent.click(screen.getByText(buttonLabel));

		console.log(onClick.mock.calls[0][0].type);
		expect(onClick.mock.calls[0][0].type).toEqual('click');
	});

	test.each(disabledButtons)('Renders disabled %s button', (buttonType, buttonLabel) => {
		const props = { [buttonType]: { visible: true, disabled: true } };

		renderWithTheme(<WizardFooter {...props} />);

		expect(screen.getByText(buttonLabel)).toBeDisabled();
	});
});
