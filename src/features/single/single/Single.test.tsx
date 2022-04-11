import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { render } from '../../../tests/utils/testUtils';
import { MetadataExample } from '../../../types';
import { mockData, asset, file, schema, uischema } from './__stubs__';
import { getHeadersMock, getPostUrlMock, onCancelMock, onChangeMock, onCloseMock, onFileRemoveMock, onFileSuccessMock, onMetadataSubmitMock } from './__mocks__/single';
import { Props } from './types';
import { CurrentStep } from './store/model';
import { Single } from './Single';
import { STEP1, STEP2 } from './constants';

const defaultProps: Props<MetadataExample> = {
	asset: asset,
	onClose: () => onCloseMock(),
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
