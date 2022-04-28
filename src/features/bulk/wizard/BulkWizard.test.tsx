import React from 'react';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { render } from '../../../tests/utils/testUtils';
import { CurrentStep  } from '../bulk/store/model';
import { asset, files as filesMock, mockData, schema, uischema } from '../bulk/__stubs__';
import { getDocumentViewUrlMock, getHeadersMock, getPostUrlMock, onCancelMock, onChangeMock, onCloseMock, onFileRemoveMock, onFileSuccessMock, onMetadataSubmitMock, setFileDataMock } from '../bulk/__mocks__/bulk';
import BulkWizard from './BulkWizard';

const defaultProps = {
	asset: asset,
	onClose: () => onCloseMock(),
	getPostUrl: getPostUrlMock,
	getHeaders: getHeadersMock,
	getDocumentViewUrl: getDocumentViewUrlMock,
	onFileSuccess: onFileSuccessMock,
	onFileRemove: onFileRemoveMock,
	setFileData: setFileDataMock,
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

describe('<BulkWizard />', () => {
	describe('Cancel button', () => {
		test('is rendered', () => {
			act(() => {
				render(<BulkWizard {...defaultProps} />, {});
			});
			expect(screen.getByText('Annuleer')).toBeDefined();
		});

		test('triggers onCancel', async () => {
			act(() => {
				render(<BulkWizard {...defaultProps} />, {});
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
				render(<BulkWizard {...defaultProps} />, {});
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
				render(<BulkWizard {...defaultProps} />, {});
			});
			expect(screen.queryByText('Vorige')).toBeNull();
		});

		test('is rendered on steps after the first step', () => {
			const store = {
				bulk: {
					currentStep: CurrentStep.SelectFields,
				},
			};

			act(() => {
				render(<BulkWizard {...defaultProps} />, { store });
			});
			expect(screen.queryByText('Vorige')).toBeDefined();
		});
	});

	describe('Next button', () => {
		test('is not rendered on the last step', () => {
			const store = {
				bulk: {
					currentStep: CurrentStep.EditFields,
				},
			};
			act(() => {
				render(<BulkWizard {...defaultProps} />, { store });
			});
			expect(screen.queryByText('Volgende')).toBeNull();
		});

		test('is rendered on steps before the last', () => {
			const store = {
				bulk: {
					currentStep: CurrentStep.Upload,
				},
			};
			act(() => {
				render(<BulkWizard {...defaultProps} />, { store });
			});
			expect(screen.queryByText('Volgende')).toBeDefined();
		});
	});

	describe('Save button', () => {
		test('is disabled on steps before the last', () => {
			act(() => {
				render(<BulkWizard {...defaultProps} />, {});
			});
			expect(screen.queryByText('Opslaan')).toBeDisabled();
		});

		test('is enabled on last step', () => {
			const store = {
				bulk: {
					currentStep: CurrentStep.EditFields,
					files: filesMock
				},
			};
			act(() => {
				render(<BulkWizard {...defaultProps} isValidForm={true} />, { store });
			});
			expect(screen.queryByText('Opslaan')).not.toBeDisabled();
		});

		test('triggers onMetadataSubmit after save', async () => {
			const store = {
				bulk: {
					currentStep: CurrentStep.EditFields,
					files: filesMock
				},
			};

			act(() => {
				render(<BulkWizard {...defaultProps} isValidForm={true} />, { store });
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
