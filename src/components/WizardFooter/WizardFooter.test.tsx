import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithTheme from '../../../tests/utils/withTheme';
import WizardFooter from './WizardFooter';

describe('<WizardFooter />', () => {
	test.each([
		['cancel', 'default', 'Annuleren'],
		['cancel', 'custom', 'Cancel', 'Cancel'],
		['cancel', 'clicked', 'Annuleren'],
		['previous', 'default', 'Vorige'],
		['previous', 'custom', 'Previous', 'Previous'],
		['previous', 'clicked', 'Vorige'],
		['next', 'default', 'Volgende'],
		['next', 'custom', 'Next', 'Next'],
		['next', 'clicked', 'Volgende'],
		['next', 'disabled', 'Volgende'],
		['save', 'default', 'Opslaan'],
		['save', 'custom', 'Save', 'Save'],
		['save', 'clicked', 'Opslaan'],
		['save', 'disabled', 'Opslaan'],
	])('Renders %s %s button', (buttonType, testCase, buttonLabel, customLabel = undefined) => {
		const onClick = () => console.log(buttonType + ' clicked');
		let props: any;

		if (testCase === 'default') {
			props = { [buttonType]: { visible: true } };
		}

		if (testCase === 'custom') {
			props = { [buttonType]: { visible: true, label: customLabel } };
		}

		if (testCase === 'disabled') {
			props = { [buttonType]: { visible: true, disabled: true } };
		}

		if (testCase === 'clicked') {
			props = { [buttonType]: { visible: true, onClick: onClick } };
		}

		renderWithTheme(<WizardFooter {...props} />);

		if (testCase === 'clicked') {
			const consoleSpy = jest.spyOn(console, 'log');
			fireEvent.click(screen.getByText(buttonLabel));
			expect(consoleSpy).toHaveBeenCalledWith(buttonType + ' clicked');
		}

		if (testCase === 'disabled') {
			expect(screen.getByText(buttonLabel)).toBeDisabled();
		}

		expect(screen.getByText(buttonLabel));
	});
});
