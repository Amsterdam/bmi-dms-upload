import React from 'react';
import { screen, act } from '@testing-library/react';

import { render } from '../../../tests/utils/testUtils';
import { files as filesMock, fields as fieldsMock } from '../bulk/__stubs__';
import { getDocumentViewUrlMock, onChangeMock } from '../bulk/__mocks__/bulk';
import FileViewer from './FileViewer';

const defaultProps = {
	file: filesMock[0],
	getDocumentViewUrl: getDocumentViewUrlMock,
	onChange: onChangeMock,
};

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

describe('<BulkWizard />', () => {
	test('Default fields are rendered', () => {
		const store = {
			bulk: {
				files: filesMock,
				fields: fieldsMock,
			},
		};

		act(() => {
			render(<FileViewer {...defaultProps} />, { store });
		});

		expect(screen.getByText('Field 1')).toBeDefined();
		expect(screen.getByText('Field 3')).toBeDefined();
	});

	test('Individual fields are rendered', () => {
		const store = {
			bulk: {
				files: filesMock,
				fields: fieldsMock,
			},
		};

		act(() => {
			render(<FileViewer {...defaultProps} />, { store });
		});

		expect(screen.getByText('Field 2')).toBeDefined();
	});
});
