import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithTheme from '../../../tests/utils/withTheme';
import Dialog, { confirm } from './Dialog';

describe('<Dialog />', () => {
	const onClick = jest.fn();

	const defaultProps = {
		title: 'Test Title',
		message: 'Test Message',
	};

	const mockedButtonProps = {
		onCancel: onClick,
		onConfirm: onClick,
		onCloseButton: onClick,
	};

	const defaultRenders = [
		['default', 'Test Waarschuwing', 'Weet u zeker dat u dit bestand wilt verwijderen?', 'Ja', 'Nee'],
		['custom', 'Test Warning', 'Are you sure you want to delete this file?', 'Cancel', 'Confirm'],
	];

	const buttons = [
		['confirm', 'confirm-button'],
		['cancel', 'cancel-button'],
		['close', 'dialog-close-button'],
	];

	const backdropClick = [['enabled'], ['disabled']];

	const clickAndRenderDialog = (props: any, element: any) => {
		renderWithTheme(
			<div>
				<button data-testid="open-dialog" onClick={() => confirm(props)} />
				{element}
			</div>,
		);

		const button = screen.getByTestId('open-dialog');
		fireEvent.click(button);
	};

	// checks if the dialog renders
	test.each(defaultRenders)(
		'Renders %s dialog without close button',
		(testCase, title, message, cancelLabel, confirmLabel) => {
			const props: any = {
				title: title,
				message: message,
				textCancelButton: cancelLabel,
				textConfirmButton: confirmLabel,
				...mockedButtonProps,
			};

			clickAndRenderDialog(props, <Dialog id={'test-dialog'} />);

			expect(screen.getByText(title)).toBeInTheDocument();
			expect(screen.getByText(message)).toBeInTheDocument();
			expect(screen.getByText(cancelLabel)).toBeInTheDocument();
			expect(screen.getByText(confirmLabel)).toBeInTheDocument();
			expect(screen.queryByTestId('dialog-close-button')).not.toBeInTheDocument();
		},
	);

	// checks if all buttons are clickable with passed methods
	test.each(buttons)('Test %s button', (testCase, testId) => {
		const props: any = {
			...defaultProps,
			...mockedButtonProps,
		};

		clickAndRenderDialog(props, <Dialog id={'test-dialog'} hideCloseButton={false} />);

		fireEvent.click(screen.getByTestId(testId));
		expect(onClick).toHaveBeenCalled();
	});

	// checks if the backdrop is clickable
	test.each(backdropClick)('Backdrop click %s', (buttonState) => {
		const props: any = {
			...defaultProps,
			...mockedButtonProps,
		};

		clickAndRenderDialog(props, <Dialog id={'test-dialog'} cancelOnBackdropClick={buttonState == 'enabled'} />);

		fireEvent.click(screen.getByTestId('backdrop-button'));

		if (buttonState == 'enabled') {
			expect(onClick).toHaveBeenCalled();
		} else {
			expect(onClick).not.toHaveBeenCalled();
		}
	});

	// checks if a dialog without a message renders
	test('Dialog should not render', () => {
		const props: any = {
			...mockedButtonProps,
		};

		clickAndRenderDialog(props, <Dialog id={'test-dialog'} />);

		expect(screen.queryByTestId('confirm-dialog')).toBeNull();
	});
});
