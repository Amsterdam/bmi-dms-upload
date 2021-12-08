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
		const onClickEvent = () => console.log(buttonType + ' clicked');
		let renderComponent: any;

		if (testCase === 'default') {
			switch (buttonType) {
				case 'cancel':
					renderComponent = <WizardFooter cancel={{ visible: true }} />;
					break;
				case 'previous':
					renderComponent = <WizardFooter previous={{ visible: true }} />;
					break;
				case 'next':
					renderComponent = <WizardFooter next={{ visible: true }} />;
					break;
				case 'save':
					renderComponent = <WizardFooter save={{ visible: true }} />;
					break;
			}
		}

		if (testCase === 'custom') {
			switch (buttonType) {
				case 'cancel':
					renderComponent = <WizardFooter cancel={{ visible: true, label: customLabel }} />;
					break;
				case 'previous':
					renderComponent = <WizardFooter previous={{ visible: true, label: customLabel }} />;
					break;
				case 'next':
					renderComponent = <WizardFooter next={{ visible: true, label: customLabel }} />;
					break;
				case 'save':
					renderComponent = <WizardFooter save={{ visible: true, label: customLabel }} />;
					break;
			}
		}

		if (testCase === 'disabled') {
			switch (buttonType) {
				case 'next':
					renderComponent = <WizardFooter next={{ visible: true, disabled: true }} />;
					break;
				case 'save':
					renderComponent = <WizardFooter save={{ visible: true, disabled: true }} />;
					break;
			}
		}

		if (testCase === 'clicked') {
			switch (buttonType) {
				case 'cancel':
					renderComponent = <WizardFooter cancel={{ visible: true, onClick: onClickEvent }} />;
					break;
				case 'previous':
					renderComponent = <WizardFooter previous={{ visible: true, onClick: onClickEvent }} />;
					break;
				case 'next':
					renderComponent = <WizardFooter next={{ visible: true, onClick: onClickEvent }} />;
					break;
				case 'save':
					renderComponent = <WizardFooter save={{ visible: true, onClick: onClickEvent }} />;
					break;
			}
		}

		renderWithTheme(renderComponent);

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
