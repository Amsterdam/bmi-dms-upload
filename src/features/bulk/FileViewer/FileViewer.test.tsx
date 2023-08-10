import React, { ComponentProps } from 'react';
import { screen, act } from '@testing-library/react';
import { DocumentViewer } from '@amsterdam/bmi-component-library';

import { render } from '~/tests/utils/testUtils';
import { mockComponentProps, mocked } from '~/tests/helpers';
import { files as filesMock, fields as fieldsMock } from '../bulk/__stubs__';
import { getDocumentViewUrlMock, onChangeMock } from '../bulk/__mocks__/bulk';
import FileViewer, { Props } from './FileViewer';

const defaultProps: Props = {
	file: filesMock[0],
	getDocumentViewUrl: getDocumentViewUrlMock,
	onChange: onChangeMock,
};

jest.mock('@amsterdam/bmi-component-library', () => ({
	...jest.requireActual('@amsterdam/bmi-component-library'),
	DocumentViewer: jest.fn().mockImplementation(() => <div data-testid="document-viewer" />),
}));

// Mock IndividualFieldsForm because <Form> doesn't return anything
jest.mock('./IndividualFieldsForm/IndividualFieldsForm', () => {
	return jest.fn().mockImplementation(({ data, schema }) => {
		return (
			<div data-testid="form">
				{Object.keys(data).map((field: any) => (
					<span key={data[field].id}>{data[field].value}</span>
				))}
				<div>test</div>
			</div>
		);
	});
});

const defaultStore = {
	bulk: {
		files: filesMock,
		fields: fieldsMock,
	},
};

describe('<FileViewer />', () => {
	test('Default fields are rendered', async () => {
		await act(async () => {
			render(<FileViewer {...defaultProps} />, { store: defaultStore });
		});

		expect(screen.getByText('Field 1 Value')).toBeDefined();
		expect(screen.getByText('Field 3 Value')).toBeDefined();
	});

	test('Individual fields are rendered', async () => {
		await act(async () => {
			render(<FileViewer {...defaultProps} />, { store: defaultStore });
		});

		expect(screen.getByText('Field 2 Value')).toBeDefined();
	});

	test('DocumentViewer is called with correct data', async () => {
		await act(async () => {
			render(<FileViewer {...defaultProps} />, { store: defaultStore });
		});

		const DocumentViewerMock = mocked(DocumentViewer);
		expect(mockComponentProps<ComponentProps<typeof DocumentViewer>>(DocumentViewerMock).uri).toEqual('mock-url');
	});
});
