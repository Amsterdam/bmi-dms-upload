import React, { ComponentProps } from 'react';
import { schema, uischema } from '../../MetadataForm/__stubs__';
import RowLayoutRenderer from './RowLayoutRenderer';
import { LayoutProps } from '@jsonforms/core';
import renderWithTheme from '../../../../tests/utils/withTheme';
import { screen } from '@testing-library/react';
import { DEFAULT_RENDERERS } from '../../Form/Form';

const props: LayoutProps = {
	schema,
	uischema,
	path: '',
	renderers: DEFAULT_RENDERERS,
	enabled: true,
	visible: true,
	direction: 'row',
};

describe('<RowLayoutRenderer />', () => {
	const render = (customProps: Partial<ComponentProps<typeof RowLayoutRenderer>> = {}) => {
		return renderWithTheme(<RowLayoutRenderer {...Object.assign({}, props, customProps)} />);
	};

	test('Should render RowLayoutRenderer', () => {
		render();
		expect(screen.queryByTestId('row-layout')?.children).toHaveLength(2);
	});

	test('Should render Labels', () => {
		render();
		expect(screen.getByText('Dummy date')).toBeInTheDocument();
		expect(screen.getByText('Documentomschrijving')).toBeInTheDocument();
	});

	test('Should not render when visible set to false', () => {
		render({ visible: false });
		expect(screen.queryByTestId('row-layout')?.children).toHaveLength(0);
	});
});
