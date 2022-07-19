import React from 'react';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { render } from '../../../tests/utils/testUtils';
import { CurrentStep } from '../single/store/model';
import { asset, schema, uischema, file as fileMock, mockData } from '../single/__stubs__';
import SingleWizard from './SingleWizard';
import {
	getHeadersMock,
	getPostUrlMock,
	onCancelMock,
	onChangeMock,
	onFileRemoveMock,
	onFileSuccessMock,
	onMetadataSubmitMock,
} from '../single/__mocks__/single';

const defaultProps = {
	asset: asset,
	getPostUrl: getPostUrlMock,
	getHeaders: getHeadersMock,
	onFileSuccess: onFileSuccessMock,
	onFileRemove: onFileRemoveMock,
	metadataForm: {
		schema,
		uischema,
		data: mockData,
		onChange: onChangeMock,
		renderers: [],
	},
	onMetadataSubmit: onMetadataSubmitMock,
	onCancel: onCancelMock,
	basePath: '/',
	isValidForm: false,
};

afterEach(() => {
	jest.restoreAllMocks();
});

describe('<SingleWizard />', () => {
	describe('Cancel button', () => {
		test('is rendered', () => {
			act(() => {
				render(<SingleWizard {...defaultProps} />, {});
			});
			expect(screen.getByText('Annuleer')).toBeDefined();
		});

		test('triggers onCancel', async () => {
			act(() => {
				render(<SingleWizard {...defaultProps} />, {});
				fireEvent.click(screen.getByText('Annuleer'));
			});
			const buttonAccept = screen.getByText('Akkoord');
			act(() => {
				fireEvent.click(buttonAccept);
			});

			expect(onCancelMock).toHaveBeenCalled();
		});

		test('closes modal on accept', async () => {
			act(() => {
				render(<SingleWizard {...defaultProps} />, {});
				fireEvent.click(screen.getByText('Annuleer'));
			});

			const buttonAccept = screen.getByText('Akkoord');
			act(() => {
				fireEvent.click(buttonAccept);
			});

			expect(buttonAccept).not.toBeInTheDocument();
		});
	});

	describe('Previous button', () => {
		test('is not rendered on the first step', () => {
			act(() => {
				render(<SingleWizard {...defaultProps} />, {});
			});
			expect(screen.queryByText('Vorige')).toBeNull();
		});

		test('is rendered on steps after the first step', () => {
			const store = {
				single: {
					currentStep: CurrentStep.SelectFields,
				},
			};

			act(() => {
				render(<SingleWizard {...defaultProps} />, { store });
			});
			expect(screen.queryByText('Vorige')).toBeDefined();
		});
	});

	describe('Next button', () => {
		test('is not rendered on the last step', () => {
			const store = {
				single: {
					currentStep: CurrentStep.SelectFields,
				},
			};
			act(() => {
				render(<SingleWizard {...defaultProps} />, { store });
			});
			expect(screen.queryByText('Volgende')).toBeNull();
		});

		test('is rendered on steps before the last', () => {
			const store = {
				single: {
					currentStep: CurrentStep.Upload,
				},
			};
			act(() => {
				render(<SingleWizard {...defaultProps} />, { store });
			});
			expect(screen.queryByText('Volgende')).toBeDefined();
		});
	});

	describe('Save button', () => {
		test('is disabled on steps before the last', () => {
			act(() => {
				render(<SingleWizard {...defaultProps} />, {});
			});
			expect(screen.queryByText('Opslaan')).toBeDisabled();
		});

		test('is enabled on last step', () => {
			const store = {
				single: {
					currentStep: CurrentStep.SelectFields,
					file: fileMock,
				},
			};
			act(() => {
				render(<SingleWizard {...defaultProps} />, { store });
			});

			expect(screen.queryByText('Opslaan')).toBeEnabled();
		});

		test('triggers onMetadataSubmit after save', async () => {
			const store = {
				single: {
					currentStep: CurrentStep.SelectFields,
					file: fileMock,
				},
			};

			act(() => {
				render(<SingleWizard {...defaultProps} isValidForm={true} />, { store });
			});

			const button = screen.getByText('Opslaan');

			expect(button).not.toBeDisabled();

			await waitFor(() => {
				fireEvent.click(button);
			});
			expect(onMetadataSubmitMock).toHaveBeenCalled();
		});
	});
});
