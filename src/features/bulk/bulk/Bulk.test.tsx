import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { render, matchMediaMock } from '~/tests/utils/testUtils';
import { MetadataExample } from '../../../types';
import { asset, data as mockData, schema, uischema, files as filesMock, fields as fieldsMock } from './__stubs__';
import { BulkUploadProps } from './types';
import { CurrentStep } from './store/model';
import { BulkStepsToRoutes } from './constants';
import { Bulk } from './Bulk';
import {
	getDocumentViewUrlMock,
	getHeadersMock,
	getPostUrlMock,
	onCancelMock,
	onChangeMock,
	onFileRemoveMock,
	onFileSuccessMock,
	onMetadataSubmitMock,
} from './__mocks__/bulk';

const defaultProps: BulkUploadProps<MetadataExample> = {
	asset: asset,
	getDocumentViewUrl: getDocumentViewUrlMock,
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

describe('<Bulk />', () => {
	beforeAll(() => {
		matchMediaMock();
	});

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

			const modalTitle = screen.queryByText(`Bestanden uploaden voor ${asset.code} (${asset.name})`);
			expect(modalTitle).toBeInTheDocument();
		});
	});

	describe('Steps', () => {
		test('Step1 is rendered for step1 route', () => {
			act(() => {
				render(<Bulk {...defaultProps} />, {}, [BulkStepsToRoutes[1]]);
			});

			const modalTitle = screen.queryByText(`Bestanden uploaden voor ${asset.code} (${asset.name})`);
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
				render(<Bulk {...defaultProps} />, { store }, [BulkStepsToRoutes[2]]);
			});

			expect(screen.getByText(`Metadata veld`)).toBeInTheDocument();
		});
	});
});
