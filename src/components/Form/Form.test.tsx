import React, { ComponentProps } from 'react';
import { JsonForms } from '@jsonforms/react';
import renderWithTheme from '../../tests/utils/withTheme';
import MetadataForm from '../MetadataForm/MetadataForm';
import { DEFAULT_RENDERERS, Props } from './Form';
import { schema, uischema } from '../MetadataForm/__stubs__';
import ajv from '../../utils/createAjv';
import { tester, DateField } from '../customRenderers/DateField';
import { error } from './__stubs__/errors';
import { mockComponentProps, mocked } from '../../tests/helpers';

jest.mock('@jsonforms/react', () => ({
	...jest.requireActual('@jsonforms/react'),
	JsonForms: jest.fn().mockImplementation(() => <div data-testid="form" />),
}));

const props = {
	ajv,
	schema,
	uischema,
	data: {
		textField: '__TEXT__',
	},
	renderers: [],
	validationMode: 'ValidateAndShow',
};

const JsonFormsMock = mocked(JsonForms);

describe('<Form/>', () => {
	const render = (customProps: Partial<Props> = {}, onChange = jest.fn()) => {
		renderWithTheme(<MetadataForm onChange={onChange} {...Object.assign({}, props, customProps)} />);
	};

	test('Renders <JsonForms /> component with default set of custom renderers', () => {
		render();
		expect(mockComponentProps(JsonFormsMock)).toEqual(
			expect.objectContaining({
				...props,
				renderers: DEFAULT_RENDERERS,
			}),
		);
	});

	test('Allows for additional custom renderers to be passed as a prop', () => {
		const additionalCustomRenderers = [{ tester, renderer: DateField }];
		render({
			renderers: additionalCustomRenderers,
		});
		expect(mockComponentProps(JsonFormsMock)).toEqual(
			expect.objectContaining({
				...props,
				renderers: [...DEFAULT_RENDERERS, ...additionalCustomRenderers],
			}),
		);
	});

	describe('onChange', () => {
		const onChange = jest.fn();

		beforeEach(() => {
			render({
				onChange,
			});
		});

		test('Informs of validation errors', () => {
			const data = {
				textField: '',
				dummyDate: '2021-11-15',
			};
			const { onChange: onChangeProp } = mockComponentProps<ComponentProps<typeof JsonForms>>(JsonFormsMock);
			if (onChangeProp) onChangeProp({ errors: [error], data });
			expect(onChange).toHaveBeenCalledWith(data, false, [error]);
		});

		test('Informs of validation success', () => {
			const data = {
				textField: '__TEXT__',
				documentDescription: 'c135b8b2-6ccb-4742-b586-543d537e7a17',
				dummyDate: '2021-11-15',
			};
			const { onChange: onChangeProp } = mockComponentProps<ComponentProps<typeof JsonForms>>(JsonFormsMock);
			if (onChangeProp) onChangeProp({ errors: [], data });
			expect(onChange).toHaveBeenCalledWith(data, true, []);
		});

		test('Creatable can be any value', () => {
			const data = {
				textField: '__TEXT__',
				documentDescription: '__ANY_VALUE',
				dummyDate: '2021-11-15',
			};
			const { onChange: onChangeProp } = mockComponentProps<ComponentProps<typeof JsonForms>>(JsonFormsMock);
			if (onChangeProp) onChangeProp({ errors: [], data });
			expect(onChange).toHaveBeenCalledWith(data, true, []);
		});
	});
});
