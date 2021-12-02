import React from 'react';
import { screen } from '@testing-library/react';
import renderWithTheme from '../../../tests/utils/withTheme';
import WizardFooter from './WizardFooter';

describe('<WizardFooter />', () => {
	test('Renders default cancel button', () => {
		renderWithTheme(<WizardFooter showCancelButton={true} />);
		expect(screen.getByText('Annuleren'));
	});

	test('Renders custom cancel button', () => {
		renderWithTheme(<WizardFooter showCancelButton={true} cancelLabel={'Cancel'} />);
		expect(screen.getByText('Cancel'));
	});

	test('Renders default previous button', () => {
		renderWithTheme(<WizardFooter showPreviousButton={true} />);
		expect(screen.getByText('Vorige'));
	});

	test('Renders custom previous button', () => {
		renderWithTheme(<WizardFooter showPreviousButton={true} previousLabel={'Previous'} />);
		expect(screen.getByText('Previous'));
	});

	test('Renders default next button', () => {
		renderWithTheme(<WizardFooter showNextButton={true} />);
		expect(screen.getByText('Volgende'));
	});

	test('Renders alternative next button', () => {
		renderWithTheme(<WizardFooter showNextButton={true} altNextButton={true} />);
		expect(screen.getByText('Volgende'));
	});

	test('Renders custom next button', () => {
		renderWithTheme(<WizardFooter showNextButton={true} nextLabel={'Next'} />);
		expect(screen.getByText('Next'));
	});

	test('Renders disabled next button', () => {
		renderWithTheme(<WizardFooter showNextButton={true} preventNextStep={true} />);
		expect(screen.getByText('Volgende')).toBeDisabled();
	});

	test('Renders default save button', () => {
		renderWithTheme(<WizardFooter showSaveButton={true} />);
		expect(screen.getByText('Opslaan'));
	});

	test('Renders alternative save button', () => {
		renderWithTheme(<WizardFooter showSaveButton={true} altSaveButton={true} />);
		expect(screen.getByText('Opslaan'));
	});

	test('Renders custom save button', () => {
		renderWithTheme(<WizardFooter showSaveButton={true} saveLabel={'Save'} />);
		expect(screen.getByText('Save'));
	});

	test('Renders disabled save button', () => {
		renderWithTheme(<WizardFooter showSaveButton={true} preventSave={true} />);
		expect(screen.getByText('Opslaan')).toBeDisabled();
	});
});
