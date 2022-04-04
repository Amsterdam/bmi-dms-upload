import React from 'react';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { createTestEnv, render } from '../../../tests/utils/testUtils';
import { MetadataExample } from '../../../types';
import { CurrentStep  } from '../bulk/model';
import { asset, files as filesMock, schema, uischema } from '../bulk/__stubs__';
import BulkWizard from './BulkWizard';

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
};

afterEach(() => {
	jest.restoreAllMocks();
});

describe('<BulkWizard />', () => {
	describe('Cancel button', () => {
		test('is rendered', () => {
			act(() => {
				const { store, reduxHistory } = createTestEnv();
				render(<BulkWizard {...defaultProps} />, { store, reduxHistory });
			});
			expect(screen.getByText('Annuleer')).toBeDefined();
		});

		test('triggers onCancel', async () => {
			act(() => {
				const { store, reduxHistory } = createTestEnv();
				render(<BulkWizard {...defaultProps} />, { store, reduxHistory });
				fireEvent.click(screen.getByText('Annuleer'));
			});

			const buttonAccept = await screen.getByText('Akkoord')
			act(() => {
				fireEvent.click(buttonAccept);
			});

			expect(onCancelMock).toHaveBeenCalled();
		});

		test('closes modal on accept', async () => {
			act(() => {
				const { store, reduxHistory } = createTestEnv();
				render(<BulkWizard {...defaultProps} />, { store, reduxHistory });
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
				render(<BulkWizard {...defaultProps} />, { store, reduxHistory });
			});
			expect(screen.queryByText('Vorige')).toBeNull();
		});

		test('is rendered on steps after the first step', () => {
			const { store, reduxHistory } = createTestEnv({
				bulk: {
					currentStep: CurrentStep.SelectFields,
				},
			});

			act(() => {
				render(<BulkWizard {...defaultProps} />, { store, reduxHistory });
			});
			expect(screen.queryByText('Vorige')).toBeDefined();
		});
	});

	describe('Next button', () => {
		test('is not rendered on the last step', () => {
			const { store, reduxHistory } = createTestEnv({
				bulk: {
					currentStep: CurrentStep.EditFields,
				},
			});
			act(() => {
				render(<BulkWizard {...defaultProps} />, { store, reduxHistory });
			});
			expect(screen.queryByText('Volgende')).toBeNull();
		});

		test('is rendered on steps before the last', () => {
			const { store, reduxHistory } = createTestEnv({
				bulk: {
					currentStep: CurrentStep.Upload,
				},
			});
			act(() => {
				render(<BulkWizard {...defaultProps} />, { store, reduxHistory });
			});
			expect(screen.queryByText('Volgende')).toBeDefined();
		});
	});

	describe('Save button', () => {
		test('is disabled on steps before the last', () => {
			const { store, reduxHistory } = createTestEnv();
			act(() => {
				render(<BulkWizard {...defaultProps} />, { store, reduxHistory });
			});
			expect(screen.queryByText('Opslaan')).toBeDisabled();
		});

		test('is enabled on last step', () => {
			const { store, reduxHistory } = createTestEnv({
				bulk: {
					currentStep: CurrentStep.EditFields,
					files: filesMock
				},
			});
			act(() => {
				render(<BulkWizard {...defaultProps} />, { store, reduxHistory });
			});
			expect(screen.queryByText('Opslaan')).not.toBeDisabled();
		});

		test('triggers onMetadataSubmit after save', async () => {
			const { store, reduxHistory } = createTestEnv({
				bulk: {
					currentStep: CurrentStep.EditFields,
					files: filesMock
				},
			});

			act(() => {
				render(<BulkWizard {...defaultProps} />, { store, reduxHistory });
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
