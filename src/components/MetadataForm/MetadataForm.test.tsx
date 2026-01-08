import React, { ComponentProps } from 'react';
import renderWithTheme from '~/tests/utils/withTheme';
import MetadataForm, { Props } from './MetadataForm';
import { schema, uischema } from './__stubs__';
import { screen } from '@testing-library/react';
import MetdadataColumnHeaders from '../MetadataColumnHeaders/MetadataColumnHeaders';
import Form from '../Form/Form';
import { mockComponentProps, mocked } from '../../../tests/helpers';

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

const MetdadataColumnHeadersMock = mocked(MetdadataColumnHeaders);

describe('<MetadataForm />', () => {
	const render = (customProps: Partial<Props> = {}) => {
		renderWithTheme(<MetadataForm {...Object.assign({}, props, customProps)} />);
	};

	test('Renders a H2', () => {
		render();
		const h2 = screen.queryByText('Metadata toevoegen');
		expect(h2?.tagName).toEqual('H2');
	});

	test('Renders column headers', () => {
		render();
		expect(mockComponentProps<ComponentProps<typeof MetdadataColumnHeaders>>(MetdadataColumnHeadersMock)).toEqual({
			columns: [
				{ header: 'Metadataveld', width: 50, objectID: 1 },
				{ header: 'Waarde', width: 50, objectID: 2 },
			],
		});
	});

	test('Renders form', () => {
		render();
		expect(Form).toHaveBeenCalledWith(props, {});
	});

	test('Renders form with default data', () => {
		const propsWithOverride = { data: { documentType: '__DOCUMENT_TYPE__' } };
		render(propsWithOverride);
		expect(Form).toHaveBeenCalledWith(Object.assign({}, props, propsWithOverride), {});
	});

	test('Renders form with custom renderers', () => {
		const propsWithOverride = { renderers: [{ tester: jest.fn(), renderer: jest.fn() }] };
		render(propsWithOverride);
		expect(Form).toHaveBeenCalledWith(Object.assign({}, props, propsWithOverride), {});
	});

	test('Renders form with onChange callback prop', () => {
		const propsWithOverride = { onChange: () => '!!' };
		render(propsWithOverride);
		expect(Form).toHaveBeenCalledWith(Object.assign({}, props, propsWithOverride), {});
	});

	test('Renders without title', () => {
		render({ heading: '' });
		expect(screen.queryByText('Metadata toevoegen')).not.toBeInTheDocument();
	});

	test('Renders without column headers', () => {
		render({ showColumnHeaders: false });
		expect(screen.queryByTestId('metadata-column-headers')).not.toBeInTheDocument();
	});
});
