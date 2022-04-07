import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { render } from '../../../tests/utils/testUtils';
import { MetadataExample } from '../../../types';
import { asset, file, schema, uischema } from './__stubs__';
import { Props } from './types';
import { CurrentStep } from './model';
import { Single } from './Single';
import { STEP1, STEP2 } from './constants';

const onCloseMock = jest.fn();
const onMetadataSubmitMock = jest.fn().mockImplementation(() => Promise.resolve());
const onFileSuccessMock = jest.fn().mockImplementation(() => Promise.resolve());
const onFileRemoveMock = jest.fn().mockImplementation(() => Promise.resolve());
const onCancelMock = jest.fn().mockImplementation(() => Promise.resolve());

const mockData: MetadataExample = {
	documentDescription: 'test',
	executionDate: '12-10-2021',
};

const defaultProps: Props<MetadataExample> = {
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

describe('<Single />', () => {
	describe('Button', () => {
		test('is rendered', () => {
			render(<Single {...defaultProps} />, {});
			expect(screen.getByText('Upload bestand')).toBeInTheDocument();
		});

		test('changes route on click', () => {
			act(() => {
				render(<Single {...defaultProps} />, {});
			});

			const button = screen.getByText('Upload bestand');
			act(() => {
				fireEvent.click(button);
			});

			const modalTitle = screen.queryByText(`Bestand uploaden voor ${asset.name}`);
			expect(modalTitle).toBeInTheDocument();
		});
	});

	describe('Steps', () => {
		test('Step1 is rendered for step1 route', () => {
			act(() => {
				render(<Single {...defaultProps} />, {}, [STEP1]);
			});

			const modalTitle = screen.queryByText(`Bestand uploaden voor ${asset.name}`);
			expect(modalTitle).toBeInTheDocument();
		});

		test('Step2 is rendered for step2 route', () => {
			const store = {
				single: {
					currentStep: CurrentStep.Upload,
					file: file,
				},
			};

			act(() => {
				render(<Single {...defaultProps} />, { store }, [STEP2]);
			});

			expect(screen.queryByText(`Metadata toevoegen`)).toBeInTheDocument();
		});
	});
});
