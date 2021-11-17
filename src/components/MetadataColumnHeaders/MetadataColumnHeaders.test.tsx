import React from 'react';
import { screen } from '@testing-library/react';
import renderWithTheme from '../../../tests/utils/withTheme';
import MetadataColumnHeaders from './MetadataColumnHeaders';
import { twoColumns, threeColumns } from './__stubs__/columns';

describe('<MetadataColumnHeaders />', () => {
	describe('Renders 2 columns', () => {
		beforeEach(() => renderWithTheme(<MetadataColumnHeaders columns={twoColumns} />));

		test.each(twoColumns.map((col) => [col.header, col.width]))('%s at %s% width', (header, width) => {
			const columnHeader = screen.getByText(header);
			expect(columnHeader).toBeInTheDocument();
			expect(window.getComputedStyle(columnHeader).width).toBe(`${width}%`);
		});
	});

	describe('Renders 3 columns', () => {
		beforeEach(() => renderWithTheme(<MetadataColumnHeaders columns={threeColumns} />));

		test.each(threeColumns.map((col) => [col.header, col.width]))('%s at %s% width', (header, width) => {
			const columnHeader = screen.getByText(header);
			expect(columnHeader).toBeInTheDocument();
			expect(window.getComputedStyle(columnHeader).width).toBe(`${width}%`);
		});
	});
});
