import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import { MetadataExample } from '../../../types';
import { CurrentStep } from '../single/model';
import SingleWizard from './SingleWizard';
import { initialState as singleInitialState } from '../single/slice';
import * as actions from '../single/slice';
import { asset, schema, uischema, file as fileMock, metadataFields as metadataMock} from '../single/__stubs__';

import { initialState as bulkInitialState } from '../../bulk/bulk/slice';
import { render } from '../../../tests/utils/testUtils';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as Record<string, unknown>),
	useHistory: jest.fn().mockImplementation(() => ({
		push: mockHistoryPush,
	})),
}));

jest.mock('../single/selectors', () => ({
	...(jest.requireActual('../single/selectors') as Record<string, unknown>),
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
	isValidForm: false,
};

afterEach(() => {
	jest.restoreAllMocks();
});

describe('<SingleWizard />', () => {
	function renderComponent(singleStateOverrides?: any, props?: any) {
		render(<SingleWizard {...defaultProps} {...props} />, {
			preloadedState: {
				single: {
					...singleInitialState,
					...singleStateOverrides,
				},
				bulk: bulkInitialState,
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

		test('dispatches setCurrentStepPrev on click', () => {
			const setCurrentStepPrevSpy = jest.spyOn(actions, 'setCurrentStepPrev');
			renderComponent({ currentStep: CurrentStep.SelectFields });

			fireEvent.click(screen.getByText('Vorige'))
			expect(setCurrentStepPrevSpy).toHaveBeenCalled();
		});
	});

	describe('Next button', () => {
		test('is not rendered on the last step', () => {
			renderComponent({ currentStep: CurrentStep.SelectFields });
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
			renderComponent({ currentStep: CurrentStep.SelectFields });
			expect(screen.queryByText('Opslaan')).not.toBeDisabled();
		});

		test('triggers onMetadataSubmit', async () => {
			renderComponent({ currentStep: CurrentStep.SelectFields, file: fileMock, metadata: metadataMock }, { isValidForm: true });
			expect(screen.queryByText('Opslaan')).not.toBeDisabled();

			fireEvent.click(screen.getByText('Opslaan'))
			expect(onMetadataSubmitMock).toHaveBeenCalled();
		});
	});
});
