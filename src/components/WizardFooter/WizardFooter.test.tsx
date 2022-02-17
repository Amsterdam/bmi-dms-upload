import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithTheme from '../../tests/utils/withTheme';
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

const disabledButtons = [
	['save', 'Opslaan'],
	['next', 'Volgende'],
];

const clickableButtons = [['cancel', 'Annuleren'], ['previous', 'Vorige'], ...disabledButtons];

describe('<WizardFooter />', () => {
	// Renders buttons with default and custom labels
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

	// Triggers onClick on rendered buttons
	test.each(clickableButtons)('Clicks on %s button', (buttonType, buttonLabel) => {
		const onClick = jest.fn();
		const props = { [buttonType]: { visible: true, onClick: onClick } };

		renderWithTheme(<WizardFooter {...props} />);

		fireEvent.click(screen.getByText(buttonLabel));

		expect(onClick).toHaveBeenCalled();
	});

	// Renders disabled buttons
	test.each(disabledButtons)('Renders disabled %s button', (buttonType, buttonLabel) => {
		const props = { [buttonType]: { visible: true, disabled: true } };

		renderWithTheme(<WizardFooter {...props} />);

		expect(screen.getByText(buttonLabel)).toBeDisabled();
	});
});
