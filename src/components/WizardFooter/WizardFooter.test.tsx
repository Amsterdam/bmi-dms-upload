import React from 'react';
import { screen } from '@testing-library/react';
import renderWithTheme from '../../../tests/utils/withTheme';
import WizardFooter from './WizardFooter';

describe('<WizardFooter />', () => {
	test('Renders default cancel button', () => {
		renderWithTheme(<WizardFooter cancel={{ visible: true, onClick: undefined }} />);
		expect(screen.getByText('Annuleren'));
	});

	test('Renders custom cancel button', () => {
		renderWithTheme(<WizardFooter cancel={{ visible: true, onClick: undefined, label: 'Cancel' }} />);
		expect(screen.getByText('Cancel'));
	});

	test('Renders default previous button', () => {
		renderWithTheme(<WizardFooter previous={{ visible: true, onClick: undefined }} />);
		expect(screen.getByText('Vorige'));
	});

	test('Renders custom previous button', () => {
		renderWithTheme(<WizardFooter previous={{ visible: true, onClick: undefined, label: 'Previous' }} />);
		expect(screen.getByText('Previous'));
	});

	test('Renders default next button', () => {
		renderWithTheme(<WizardFooter next={{ visible: true, onClick: undefined }} />);
		expect(screen.getByText('Volgende'));
	});

	test('Renders custom next button', () => {
		renderWithTheme(<WizardFooter next={{ visible: true, onClick: undefined, label: 'Next' }} />);
		expect(screen.getByText('Next'));
	});

	test('Renders disabled next button', () => {
		renderWithTheme(<WizardFooter next={{ visible: true, onClick: undefined, disabled: true }} />);
		expect(screen.getByText('Volgende')).toBeDisabled();
	});

	test('Renders default save button', () => {
		renderWithTheme(<WizardFooter save={{ visible: true, onClick: undefined }} />);
		expect(screen.getByText('Opslaan'));
	});

	test('Renders custom save button', () => {
		renderWithTheme(<WizardFooter save={{ visible: true, onClick: undefined, label: 'Save' }} />);
		expect(screen.getByText('Save'));
	});

	test('Renders disabled save button', () => {
		renderWithTheme(<WizardFooter save={{ visible: true, onClick: undefined, disabled: true }} />);
		expect(screen.getByText('Opslaan')).toBeDisabled();
	});
});
