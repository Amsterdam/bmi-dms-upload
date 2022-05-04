import React, { ComponentProps } from 'react';
import { screen, act } from '@testing-library/react';
import { DocumentViewer } from '@amsterdam/bmi-component-library';

import { render } from '../../../tests/utils/testUtils';
import { mockComponentProps, mocked } from '../../../tests/helpers';
import { files as filesMock, fields as fieldsMock } from '../bulk/__stubs__';
import { getDocumentViewUrlMock, onChangeMock } from '../bulk/__mocks__/bulk';
import FileViewer from './FileViewer';

const defaultProps = {
	file: filesMock[0],
	getDocumentViewUrl: getDocumentViewUrlMock,
	onChange: onChangeMock,
};

jest.mock('@amsterdam/bmi-component-library', () => ({
	...jest.requireActual('@amsterdam/bmi-component-library'),
	DocumentViewer: jest.fn().mockImplementation(() => <div data-testid="document-viewer" />),
}));

// Mock IndividualFieldsForm because <Form> doesn't return anything
jest.mock('./IndividualFieldsForm', () => {
	return jest.fn().mockImplementation(({ fields }) => {
		return (
			<div data-testid="form">
				{fields.map((field: any) => (
					<span key={field.id}>{field.label}</span>
				))}
			</div>
		);
	});
});

afterEach(() => {
	jest.restoreAllMocks();
});

describe('<FileViewer />', () => {
	test('Default fields are rendered', async () => {
		const store = {
			bulk: {
				files: filesMock,
				fields: fieldsMock,
			},
		};

		await act( async () => {
			render(<FileViewer {...defaultProps} />, { store });
		});

		expect(screen.getByText('Field 1')).toBeDefined();
		expect(screen.getByText('Field 3')).toBeDefined();
	});

	test('Individual fields are rendered', async () => {
		const store = {
			bulk: {
				files: filesMock,
				fields: fieldsMock,
			},
		};

		await act( async () => {
			render(<FileViewer {...defaultProps} />, { store });
		});

		expect(screen.getByText('Field 2')).toBeDefined();
	});

	test('DocumentViewer is called with correct data', async () => {
		const store = {
			bulk: {
				files: filesMock,
				fields: fieldsMock,
			},
		};

		await act( async () => {
			render(<FileViewer {...defaultProps} />, { store });
		});

		const DocumentViewerMock = mocked(DocumentViewer);
		expect(mockComponentProps<ComponentProps<typeof DocumentViewer>>(DocumentViewerMock).uri).toEqual('mock-url')
		expect(mockComponentProps<ComponentProps<typeof DocumentViewer>>(DocumentViewerMock).authorizationHeader).toEqual('mock-token')
	});
});
