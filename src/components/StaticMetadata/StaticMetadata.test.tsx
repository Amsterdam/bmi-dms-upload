import React from 'react';
import { screen } from '@testing-library/react';
import renderWithTheme from '../../../tests/utils/withTheme';
import StaticMetadata from './StaticMetadata';
import { metadataList } from './__stubs__';

describe('<StaticMetadata />', () => {
	beforeEach(() => renderWithTheme(<StaticMetadata list={metadataList} />));

	test('Renders with metadata', () => {
		metadataList.forEach((metadata) => {
			const labelColumn = screen.getByText(metadata.label);
			expect(labelColumn).toBeInTheDocument();

			if (typeof metadata.value === 'string') {
				const valueColumn = screen.getByText(metadata.value);
				expect(valueColumn).toBeInTheDocument();
			}
		});
	});
});
