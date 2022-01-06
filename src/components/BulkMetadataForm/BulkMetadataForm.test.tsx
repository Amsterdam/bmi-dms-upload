import React from 'react';
import { screen } from '@testing-library/react';
import BulkMetadataForm from './BulkMetadataForm';
import renderWithTheme from '~/tests/utils/withTheme';

describe('<BulkMetadataForm />', () => {
	test('Should render the component', () => {
		renderWithTheme(<BulkMetadataForm />);
		expect(screen.getByTestId('bulk-metadata-form')).toBeInTheDocument();
	});
});
