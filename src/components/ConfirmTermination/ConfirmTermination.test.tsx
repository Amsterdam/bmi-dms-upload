import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithTheme from '~/tests/utils/withTheme';
import { confirm } from '@amsterdam/bmi-component-library';
import ConfirmTermination, { Props } from './ConfirmTermination';

describe('<ConfirmTermination />', () => {
	const onClick = jest.fn();

	type ConfirmArg = Parameters<typeof confirm>[0];

	const defaultArg: ConfirmArg = {
		title: 'Test Title',
		message: 'Test Message',
		onConfirm: onClick,
	};

	const callbackMocks = {
		onConfirm: onClick,
	};

	const clickAndRenderDialog = (args: ConfirmArg = defaultArg, props: Partial<Props> = {}) => {
		// @ts-ignore
		renderWithTheme(
			<>
				<button data-testid="open-dialog" onClick={() => confirm(args)} />
				<ConfirmTermination {...props} />
			</>,
		);
		const button = screen.getByTestId('open-dialog');
		fireEvent.click(button);
	};

	// checks if the dialog renders
	test.each([
		['default', 'Test Waarschuwing', 'Weet u zeker dat u dit bestand wilt verwijderen?', 'Ja', 'Nee'],
		['custom', 'Test Warning', 'Are you sure you want to delete this file?', 'Cancel', 'Confirm'],
	])('Renders %s dialog without close button', (testCase, title, message, cancelLabel, confirmLabel) => {
		clickAndRenderDialog(
			{
				title: title,
				message: message,
				textCancelButton: cancelLabel,
				textConfirmButton: confirmLabel,
				...callbackMocks,
			},
			{},
		);
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText(message)).toBeInTheDocument();
		expect(screen.getByText(cancelLabel)).toBeInTheDocument();
		expect(screen.getByText(confirmLabel)).toBeInTheDocument();
		expect(screen.queryByTestId('modal-close-button')).not.toBeInTheDocument();
	});

	// checks if all buttons are clickable with passed methods
	test.each([
		['confirm', 'confirm-button'],
		['cancel', 'cancel-button'],
		['close', 'modal-close-button'],
	])('Test %s button', (testCase, testId) => {
		clickAndRenderDialog(
			{
				...defaultArg,
				...callbackMocks,
			},
			{
				hideCloseButton: false,
			},
		);
		fireEvent.click(screen.getByTestId(testId));
		expect(onClick).toHaveBeenCalled();
	});

	// checks if a dialog without a message renders
	test('Dialog should not render', () => {
		// @ts-ignore
		clickAndRenderDialog(callbackMocks);
		expect(screen.queryByTestId('confirm-dialog')).toBeNull();
	});

	test('Should not show close button', () => {
		clickAndRenderDialog();
		expect(screen.queryByTestId('modal-close-button')).not.toBeInTheDocument();
	});
});
