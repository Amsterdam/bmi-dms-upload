import React from 'react';
import { screen } from '@testing-library/react';
import BulkMetadataForm from './BulkMetadataForm';
import renderWithTheme from '~/tests/utils/withTheme';
import { Props } from '../MetadataForm/MetadataForm';
import { schema, uischema } from '../MetadataForm/__stubs__';

jest.mock('../MetadataColumnHeaders/MetadataColumnHeaders');
jest.mock('../Form/Form');

const props: Props = {
	ajv: undefined,
	schema,
	uischema,
	data: {},
	renderers: [],
	validationMode: 'ValidateAndShow',
	onChange: jest.fn(),
};

describe('<BulkMetadataForm />', () => {
	test('Should render the component', () => {
		renderWithTheme(<BulkMetadataForm {...Object.assign({}, props)} />);
		expect(screen.getByTestId('bulk-metadata-form')).toBeInTheDocument();
	});
});
