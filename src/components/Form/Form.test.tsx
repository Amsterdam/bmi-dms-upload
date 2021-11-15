import * as React from 'react';
import { ComponentProps } from 'react';
import * as JsonFormsModule from '@jsonforms/react';
import { materialRenderers } from '@jsonforms/material-renderers';
import renderWithTheme from '~/tests/utils/withTheme';
import MetadataForm from '../MetadataForm/MetadataForm';
import Form from './Form';
import { schema, uischema } from '../MetadataForm/__stubs__';
import customRenderers from '../customRenderers';
import customLayoutRenderers from '../customLayouts';
import createAjv from '../../utils/createAjv';
import { tester, DateField } from '../customRenderers/DateField';
import { error } from './__stubs__/errors';

jest.mock('@jsonforms/react', () => ({
	...jest.requireActual('@jsonforms/react'),
	JsonForms: jest.fn().mockImplementation(() => <div data-testid="form" />),
}));

// Note that createAjv() returns a cached version if called more than once
const ajv = createAjv();
const props = {
	ajv,
	schema,
	uischema,
	data: {
		documentType: '__DOCUMENT_TYPE__',
	},
	renderers: [],
	validationMode: 'ValidateAndShow',
};

describe('<Form/>', () => {
	const render = (customProps: Partial<ComponentProps<typeof Form>> = {}, onChange = jest.fn()) => {
		renderWithTheme(<MetadataForm onChange={onChange} {...Object.assign({}, props, customProps)} />);
	};

	test('Renders <JsonForms /> component with default set of custom renderers', () => {
		const spy = jest.spyOn(JsonFormsModule, 'JsonForms');
		render();
		expect(spy.mock.calls[0][0]).toEqual(
			expect.objectContaining({
				...props,
				renderers: [...materialRenderers, ...customRenderers, ...customLayoutRenderers],
			}),
		);
	});

	test('Allows for additional custom renderers to be passed as a prop', () => {
		const additionalCustomRenderers = [{ tester, renderer: DateField }];
		const spy = jest.spyOn(JsonFormsModule, 'JsonForms');
		render({
			renderers: additionalCustomRenderers,
		});
		expect(spy.mock.calls[0][0]).toEqual(
			expect.objectContaining({
				...props,
				renderers: [...materialRenderers, ...customRenderers, ...customLayoutRenderers, ...additionalCustomRenderers],
			}),
		);
	});

	describe('onChange', () => {
		const spy = jest.spyOn(JsonFormsModule, 'JsonForms');
		const onChangeCallback = jest.fn();

		beforeEach(() => {
			render({
				onChange: onChangeCallback,
			});
		});

		test('Informs of validation errors', () => {
			const data = {
				documentDescription: '',
				dummyDate: '2021-11-15',
			};
			// @ts-ignore
			spy.mock.calls[0][0].onChange({ errors: [error], data });
			expect(onChangeCallback).toHaveBeenCalledWith(data, false, [error]);
		});

		test('Informs of validation success', () => {
			const data = {
				documentDescription: '__DOCUMENT_DESCRIPTION__',
				dummyDate: '2021-11-15',
			};
			// @ts-ignore
			spy.mock.calls[0][0].onChange({ errors: [], data });
			expect(onChangeCallback).toHaveBeenCalledWith(data, true, []);
		});
	});
});
