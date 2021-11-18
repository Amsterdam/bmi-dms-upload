import React from 'react';
import * as JsonFormsModule from '@jsonforms/react';
import renderWithTheme from '~/tests/utils/withTheme';
import MetadataForm from '../MetadataForm/MetadataForm';
import { DEFAULT_RENDERERS, Props } from './Form';
import { schema, uischema } from '../MetadataForm/__stubs__';
import ajv from '../../utils/createAjv';
import { tester, DateField } from '../customRenderers/DateField';
import { error } from './__stubs__/errors';

jest.mock('@jsonforms/react', () => ({
	...jest.requireActual('@jsonforms/react'),
	JsonForms: jest.fn().mockImplementation(() => <div data-testid="form" />),
}));

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
	const render = (customProps: Partial<Props> = {}, onChange = jest.fn()) => {
		renderWithTheme(<MetadataForm onChange={onChange} {...Object.assign({}, props, customProps)} />);
	};

	test('Renders <JsonForms /> component with default set of custom renderers', () => {
		const spy = jest.spyOn(JsonFormsModule, 'JsonForms');
		render();
		expect(spy.mock.calls[0][0]).toEqual(
			expect.objectContaining({
				...props,
				renderers: DEFAULT_RENDERERS,
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
				renderers: [...DEFAULT_RENDERERS, ...additionalCustomRenderers],
			}),
		);
	});

	describe('onChange', () => {
		const spy = jest.spyOn(JsonFormsModule, 'JsonForms');
		const onChange = jest.fn();

		beforeEach(() => {
			render({
				onChange: onChange,
			});
		});

		test('Informs of validation errors', () => {
			const data = {
				documentDescription: '',
				dummyDate: '2021-11-15',
			};
			// @ts-ignore
			spy.mock.calls[0][0].onChange({ errors: [error], data });
			expect(onChange).toHaveBeenCalledWith(data, false, [error]);
		});

		test('Informs of validation success', () => {
			const data = {
				documentDescription: '__DOCUMENT_DESCRIPTION__',
				dummyDate: '2021-11-15',
			};
			// @ts-ignore
			spy.mock.calls[0][0].onChange({ errors: [], data });
			expect(onChange).toHaveBeenCalledWith(data, true, []);
		});
	});
});
