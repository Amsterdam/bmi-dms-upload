import React, { ComponentProps } from 'react';
import { screen } from '@testing-library/react';
import BulkMetadataForm, { Props } from './BulkMetadataForm';
import renderWithTheme from '~/tests/utils/withTheme';
import { schema, uischema } from './__stubs__';
import { mockComponentProps, mocked } from '~/tests/helpers';
import MetadataColumnHeaders from '../MetadataColumnHeaders/MetadataColumnHeaders';
import Form from '../Form/Form';

jest.mock('../MetadataColumnHeaders/MetadataColumnHeaders');
jest.mock('../Form/Form');

const props: Props = {
	schema,
	uischema,
	data: {},
	renderers: [],
	onChange: jest.fn(),
};

const MetadadataColumnHeadersMock = mocked(MetadataColumnHeaders);
const FormMock = mocked(Form);

describe('<BulkMetadataForm />', () => {
	const render = (customProps: Partial<Props> = {}) => {
		renderWithTheme(<BulkMetadataForm {...Object.assign({}, props, customProps)} />);
	};

	test('Should render the component', () => {
		render();
		expect(screen.getByTestId('bulk-metadata-form')).toBeInTheDocument();
	});

	test('Renders form', () => {
		render();
		expect(Form).toHaveBeenCalledWith(props, {});
	});

	test('Renders column headers', () => {
		render();
		expect(mockComponentProps<ComponentProps<typeof MetadataColumnHeaders>>(MetadadataColumnHeadersMock)).toEqual({
			columns: [
				{ header: 'Metadata veld', width: 34 },
				{ header: 'Default waarde', width: 36 },
				{ align: 'center', header: 'Individueel wijzigen', width: 30 },
			],
		});
	});

	test('Should have correct data', () => {
		const customProps = {
			data: {
				year: {
					value: '2021',
				},
				documentDescription: {
					value: 'Lorem Ipsum',
					changeIndividual: true,
				},
			},
		};
		render(customProps);

		expect(mockComponentProps<ComponentProps<typeof Form>>(FormMock).data).toEqual(customProps.data);
	});

	test('Should have default error message', () => {
		render();
		expect(
			// @ts-ignore
			mockComponentProps<ComponentProps<typeof Form>>(FormMock).schema.properties.carUse.properties.value.errorMessage,
		).toEqual({
			'bmi-isNotEmpty': "Geef de default waarde voor 'Gebruik auto' op",
		});
	});

	test('Should have custom error message', () => {
		render();
		expect(
			// @ts-ignore
			mockComponentProps<ComponentProps<typeof Form>>(FormMock).schema.properties.year.properties.value.errorMessage,
		).toEqual({
			'bmi-isNotEmpty': 'Jaartal mag niet leeg zijn (custom error message)',
		});
	});

	test('Should detect if required', () => {
		render();
		expect(
			// @ts-ignore
			mockComponentProps<ComponentProps<typeof Form>>(FormMock).schema.properties.year.properties.value[
				'bmi-isNotEmpty'
			],
		).toBeTruthy();
	});

	test('Should detect if not required', () => {
		render();
		expect(
			// @ts-ignore
			mockComponentProps<ComponentProps<typeof Form>>(FormMock).schema.properties.ils3.properties.value[
				'bmi-isNotEmpty'
			],
		).toBeUndefined();
	});
});
