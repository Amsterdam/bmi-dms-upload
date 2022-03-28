import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../../tests/utils/testUtils';
import { MetadataExample } from '../../../types';
import { initialState as singleInitialState } from '../../single/single/slice';
import * as actions from '../bulk/slice';
import { initialState as bulkInitialState } from '../bulk/slice';
import { CurrentStep  } from '../bulk/model';
import { asset, schema, uischema } from './__stubs__';
import BulkWizard from './BulkWizard';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as Record<string, unknown>),
	useHistory: jest.fn().mockImplementation(() => ({
		push: mockHistoryPush,
	})),
}));

jest.mock('../bulk/selectors', () => ({
	...(jest.requireActual('../bulk/selectors') as Record<string, unknown>),
	getFilesFromStore: jest.fn(),
}));

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
	function renderComponent(bulkStateOverrides?: any) {
		render(<BulkWizard {...defaultProps} />, {
			preloadedState: {
				single: singleInitialState,
				bulk: {
					...bulkInitialState,
					...bulkStateOverrides,
				},
			},
		});
	}

	describe('Cancel button', () => {
		test('is rendered', () => {
			renderComponent();
			expect(screen.getByText('Annuleer')).toBeDefined();
		});

		test('triggers onCancel', async () => {
			renderComponent();
			fireEvent.click(screen.getByText('Annuleer'))
			const buttonAccept = await screen.getByText('Akkoord')
			fireEvent.click(buttonAccept);
			expect(onCancelMock).toHaveBeenCalled();
		});

		test('triggers resetState', async () => {
			const resetStateSpy = jest.spyOn(actions, 'resetState');
			renderComponent();
			fireEvent.click(screen.getByText('Annuleer'))
			const buttonAccept = await screen.getByText('Akkoord')
			fireEvent.click(buttonAccept);
			expect(resetStateSpy).toHaveBeenCalled();
		});
	});

	describe('Previous button', () => {
		test('is not rendered on the first step', () => {
			renderComponent();
			expect(screen.queryByText('Vorige')).toBeNull();
		});

		test('is rendered on steps after the first', () => {
			renderComponent({ currentStep: CurrentStep.SelectFields });
			expect(screen.queryByText('Vorige')).toBeDefined();
		});

		// handlePrev dispatches setCurrentStepPrev
		test('dispatches setCurrentStepPrev on click', () => {
			const setCurrentStepPrevSpy = jest.spyOn(actions, 'setCurrentStepPrev');
			renderComponent({ currentStep: CurrentStep.SelectFields });

			fireEvent.click(screen.getByText('Vorige'))
			expect(setCurrentStepPrevSpy).toHaveBeenCalled();
		});
	});

	describe('Next button', () => {
		test('is not rendered on the last step', () => {
			renderComponent({ currentStep: CurrentStep.EditFields });
			expect(screen.queryByText('Volgende')).toBeNull();
		});

		test('is rendered on steps before the last', () => {
			renderComponent({ currentStep: CurrentStep.Upload });
			expect(screen.queryByText('Volgende')).toBeDefined();
		});

		test('dispatches setCurrentStepNext on click', () => {
			const setCurrentStepNextSpy = jest.spyOn(actions, 'setCurrentStepNext');
			renderComponent({ currentStep: CurrentStep.Upload });

			fireEvent.click(screen.getByText('Volgende'))
			expect(setCurrentStepNextSpy).toHaveBeenCalled();
		});
	});

	describe('Save button', () => {
		test('is disabled on steps before the last', () => {
			renderComponent();
			expect(screen.queryByText('Opslaan')).toBeDisabled();
		});

		test('is enabled on last step', () => {
			renderComponent({ currentStep: CurrentStep.EditFields });
			expect(screen.queryByText('Opslaan')).not.toBeDisabled();
		});

		test.todo('triggers saveState')
	});
});
