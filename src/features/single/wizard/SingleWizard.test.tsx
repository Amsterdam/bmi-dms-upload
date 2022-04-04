import React from 'react';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MetadataExample } from '../../../types';
import { createTestEnv, render } from '../../../tests/utils/testUtils';
import { CurrentStep } from '../single/model';
import { asset, schema, uischema, file as fileMock } from '../single/__stubs__';
import SingleWizard from './SingleWizard';

const onCloseMock = jest.fn();
const onMetadataSubmitMock = jest.fn().mockImplementation(() => Promise.resolve());
const onFileSuccessMock = jest.fn().mockImplementation(() => Promise.resolve());
const onFileRemoveMock = jest.fn().mockImplementation(() => Promise.resolve());
const onCancelMock = jest.fn().mockImplementation(() => Promise.resolve());

const mockData: MetadataExample = {
	documentDescription: 'test',
	executionDate: '12-10-2021',
};

const defaultProps = {
	asset: asset,
	onClose: () => onCloseMock(),
	getPostUrl: jest.fn(),
	getHeaders: jest.fn(),
	onFileSuccess: onFileSuccessMock,
	onFileRemove: onFileRemoveMock,
	metadataForm: {
		schema,
		uischema,
		data: mockData,
		onChange: jest.fn(),
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
				const { store, reduxHistory } = createTestEnv();
				render(<SingleWizard {...defaultProps} />, { store, reduxHistory });
			});
			expect(screen.getByText('Annuleer')).toBeDefined();
		});

		test('triggers onCancel', async () => {
			act(() => {
				const { store, reduxHistory } = createTestEnv();
				render(<SingleWizard {...defaultProps} />, { store, reduxHistory });
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
				const { store, reduxHistory } = createTestEnv();
				render(<SingleWizard {...defaultProps} />, { store, reduxHistory });
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
			const { store, reduxHistory } = createTestEnv();

			act(() => {
				render(<SingleWizard {...defaultProps} />, { store, reduxHistory });
			});
			expect(screen.queryByText('Vorige')).toBeNull();
		});

		test('is rendered on steps after the first step', () => {
			const { store, reduxHistory } = createTestEnv({
				single: {
					currentStep: CurrentStep.SelectFields,
				},
			});

			act(() => {
				render(<SingleWizard {...defaultProps} />, { store, reduxHistory });
			});
			expect(screen.queryByText('Vorige')).toBeDefined();
		});
	});

	describe('Next button', () => {
		test('is not rendered on the last step', () => {
			const { store, reduxHistory } = createTestEnv({
				single: {
					currentStep: CurrentStep.SelectFields,
				},
			});
			act(() => {
				render(<SingleWizard {...defaultProps} />, { store, reduxHistory });
			});
			expect(screen.queryByText('Volgende')).toBeNull();
		});

		test('is rendered on steps before the last', () => {
			const { store, reduxHistory } = createTestEnv({
				single: {
					currentStep: CurrentStep.Upload,
				},
			});
			act(() => {
				render(<SingleWizard {...defaultProps} />, { store, reduxHistory });
			});
			expect(screen.queryByText('Volgende')).toBeDefined();
		});
	});

	describe('Save button', () => {
		test('is disabled on steps before the last', () => {
			const { store, reduxHistory } = createTestEnv();
			act(() => {
				render(<SingleWizard {...defaultProps} />, { store, reduxHistory });
			});
			expect(screen.queryByText('Opslaan')).toBeDisabled();
		});

		test('is enabled on last step', () => {
			const { store, reduxHistory } = createTestEnv({
				single: {
					currentStep: CurrentStep.SelectFields,
					file: fileMock,
				},
			});
			act(() => {
				render(<SingleWizard {...defaultProps} />, { store, reduxHistory });
			});

			expect(screen.queryByText('Opslaan')).toBeEnabled();
		});

		test('triggers onMetadataSubmit after save', async () => {
			const { store, reduxHistory } = createTestEnv({
				single: {
					currentStep: CurrentStep.SelectFields,
					file: fileMock,
				},
			});

			act(() => {
				render(<SingleWizard {...defaultProps} />, { store, reduxHistory });
			});

			const button = screen.getByText('Opslaan')

			expect(button).not.toBeDisabled();

			await waitFor(() => {
				fireEvent.click(button);
				expect(onMetadataSubmitMock).toHaveBeenCalled();
			});
		});
	});
});
