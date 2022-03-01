import React, { ComponentProps } from 'react';
import { screen } from '@testing-library/react';
import BulkMetadataForm, { Props } from './BulkMetadataForm';
import renderWithTheme from '~/tests/utils/withTheme';
import { schema, uischema } from './__stubs__';
import { mockComponentProps, mocked } from '~/tests/helpers';
import MetadataColumnHeaders from '../MetadataColumnHeaders/MetadataColumnHeaders';
import Form from '../Form/Form';
import { JsonSchema7 } from '@jsonforms/core';
import { MetadataProperty } from '../../types';

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
				{ header: 'Default waarde', width: 34 },
				{ align: 'center', header: 'Individueel wijzigen', width: 32 },
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

	test.each([
		['default', 'carUse', 'bmi-isNotEmpty', "Geef de default waarde voor 'Gebruik auto' op"],
		['custom', 'year', 'bmi-isNotEmpty', 'Jaartal mag niet leeg zijn (custom error message)'],
		['default formatting', 'executionDate', 'format', "Het format voor 'Uitvoeringsdatum' is ongeldig"],
	])('Should have %s error message', (testCase, property, errorType, errorMessage) => {
		render();
		const { schema } = mockComponentProps<ComponentProps<typeof Form>>(FormMock);
		const val = schema?.properties?.[property].properties?.value as JsonSchema7;

		expect(val.errorMessage[errorType]).toBe(errorMessage);
	});

	test.each([
		['required', 'year'],
		['not required', 'ils3'],
	])('Should detect if %s', (testCase, property) => {
		render();
		const { schema } = mockComponentProps<ComponentProps<typeof Form>>(FormMock);
		const val = schema?.properties?.[property].properties?.value as MetadataProperty;

		if (testCase === 'required') {
			expect(val['bmi-isNotEmpty']).toBeTruthy();
		} else {
			expect(val['bmi-isNotEmpty']).toBeUndefined();
		}
	});

	test('Should have dropdown', () => {
		render();
		const { schema } = mockComponentProps<ComponentProps<typeof Form>>(FormMock);
		const val = schema?.properties?.['objectType'].properties?.value as MetadataProperty;
		const oneOfValues = [
			{ const: '1', title: 'Brug' },
			{ const: '2', title: 'Kademuur' },
			{ const: '3', title: 'Sondering' },
		];

		expect(val.oneOf).toEqual(oneOfValues);
	});
});
