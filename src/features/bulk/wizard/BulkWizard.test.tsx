import React from 'react';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';

import BulkWizard from './BulkWizard';
import { CurrentStep } from '../bulk/store/model';

import { render } from '~/tests/utils/testUtils';
import { state as mockState, defaultProps } from '../bulk/__stubs__';
import { onCancelMock, onMetadataSubmitMock } from '../bulk/__mocks__/bulk';

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
			});
			act(() => {
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
				render(<BulkWizard {...defaultProps} />, {});
			});

			act(() => {
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

		test('is rendered on steps after the first step', async () => {
			act(() => {
				render(<BulkWizard {...defaultProps} />, { bulk: mockState });
			});
			await waitFor(()=>{
				screen.findByText('Vorige').then((previousBtn) => {
					expect(previousBtn).toBeDefined();
				});

			});
		});
	});

	describe('Next button', () => {
		test('is not rendered on the last step', () => {
			const store = {
				bulk: {
					...mockState,
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
					...mockState,
					currentStep: CurrentStep.Upload,
				},
			};
			act(() => {
				render(<BulkWizard {...defaultProps} />, { store });
			});
			expect(screen.getByText('Volgende')).toBeDefined();
		});
	});

	describe('Save button', () => {
		test('is not in the document on step 2 when there are no files', () => {
			const store = {
				bulk: {
					...mockState,
					files: [],
					currentStep: CurrentStep.SelectFields,
				},
			};
			act(() => {
				render(<BulkWizard {...defaultProps} />, { store });
			});
			expect(screen.queryByText('Opslaan')).not.toBeInTheDocument();
		});

		test('is not in the document on step 2 when form is not valid', () => {
			const store = {
				bulk: {
					...mockState,
					currentStep: CurrentStep.SelectFields,
				},
			};
			act(() => {
				render(<BulkWizard {...defaultProps} />, { store });
			});
			expect(screen.queryByText('Opslaan')).not.toBeInTheDocument();
		});

		test('is enabled on step 2 when there are files, form is valid and there are no individual fields', () => {
			const store = {
				bulk: {
					...mockState,
					fields: [mockState.fields[0]],
					currentStep: CurrentStep.SelectFields,
				},
			};
			act(() => {
				render(<BulkWizard {...defaultProps} isValidForm />, { store });
			});
			expect(screen.queryByText('Opslaan')).toBeEnabled();
		});

		test('is enabled on step 3 when there are files, form is valid and there individual fields', async () => {
			const store = {
				bulk: {
					...mockState,
					currentStep: CurrentStep.EditFields,
				},
			};

			act(() => {
				render(<BulkWizard {...defaultProps} isValidForm />, { store });
			});

			await waitFor(async () => {
				expect(screen.queryByText('Opslaan')).toBeEnabled();
			});
		});

		test('triggers onMetadataSubmit after save', async () => {
			const store = {
				bulk: {
					...mockState,
					currentStep: CurrentStep.EditFields,
				},
			};

			act(() => {
				render(<BulkWizard {...defaultProps} isValidForm />, { store });
			});

			const button = screen.getByText('Opslaan');
			expect(button).toBeEnabled();

			fireEvent.click(button);
			await waitFor(() => {
				expect(onMetadataSubmitMock).toHaveBeenCalled();
			});
		});
	});
});
