import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { render } from '../../../tests/utils/testUtils';
import { MetadataExample } from '../../../types';
import { asset, data as mockData, schema, uischema, files as filesMock, fields as fieldsMock } from './__stubs__';
import { Props } from './types';
import { CurrentStep } from './store/model';
import { STEP1, STEP2 } from './constants';
import { Bulk } from './Bulk';
import { getHeadersMock, getPostUrlMock, onCancelMock, onChangeMock, onCloseMock, onFileRemoveMock, onFileSuccessMock, onMetadataSubmitMock } from './__mocks__/bulk';

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

describe('<Bulk />', () => {
	describe('Button', () => {
		test('is rendered', () => {
			render(<Bulk {...defaultProps} />, {});
			expect(screen.getByText('Upload bestanden')).toBeInTheDocument();
		});

		test('changes route on click', () => {
			act(() => {
				render(<Bulk {...defaultProps} />, {});
			});

			const button = screen.getByText('Upload bestanden');
			act(() => {
				fireEvent.click(button);
			});

			const modalTitle = screen.queryByText(`Bestanden uploaden voor ${asset.name}`);
			expect(modalTitle).toBeInTheDocument();
		});
	});

	describe('Steps', () => {
		test('Step1 is rendered for step1 route', () => {
			act(() => {
				render(<Bulk {...defaultProps} />, {}, [STEP1]);
			});

			const modalTitle = screen.queryByText(`Bestanden uploaden voor ${asset.name}`);
			expect(modalTitle).toBeInTheDocument();
		});

		test('Step2 is rendered for step2 route', () => {
			const store = {
				bulk: {
					currentStep: CurrentStep.Upload,
					files: filesMock,
					fields: fieldsMock,
				},
			};

			act(() => {
				render(<Bulk {...defaultProps} />, { store }, [STEP2]);
			});

			expect(screen.queryByText(`Metadata veld`)).toBeInTheDocument();
		});
	});
});
