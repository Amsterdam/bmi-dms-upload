import React from 'react';
import { fireEvent, getDefaultNormalizer, render } from '@testing-library/react';
import selectEvent from 'react-select-event';
import Form, { Props } from '../../Form/Form';
import { schema as schemaStub, options } from './__stubs__/schema';
import { uischema, uischema as uischemaStub } from './__stubs__/uischema';
import { act } from 'react-dom/test-utils';

const label = uischema.elements[0]?.label ?? '';

const labelNormalizer = (str: string) => getDefaultNormalizer()(str).replace('*', '').replace('required', '')

describe('customRenderers / CreatableSelect', () => {
	const renderForm = ({
		schema = schemaStub,
		uischema = uischemaStub,
		data = {},
		onChange = jest.fn(),
		renderers = [],
	}: Partial<Pick<Props, 'onChange' | 'data' | 'schema' | 'uischema' | 'renderers'>>) => {
		return render(<Form onChange={onChange} schema={schema} uischema={uischema} data={data} renderers={renderers} />);
	};

	test('Renders input with label', () => {
		const { getByText } = renderForm({});
		expect(
			getByText(label, { normalizer: labelNormalizer }),
		).toBeInTheDocument();
	});

	test.only('Is connected to JsonForms state', async () => {
		const onChangeMock = jest.fn();
		await act(async () => {
			const { getByText } = renderForm({ onChange: onChangeMock });
			const input = getByText(label, { normalizer: labelNormalizer }).closest('label');
			console.log('input', input)
			await selectEvent.select(input!, options[3]);
		})
		// expect(onChangeMock).toHaveBeenLastCalledWith(
		// 	{
		// 		documentDescription: 'Bouwkundig onderzoek',
		// 	},
		// 	true,
		// 	[],
		// );
	});

	test('Produces error onBlur when dirty', async () => {
		const { getByRole, getByLabelText } = renderForm({ onChange: jest.fn() });
		const input = getByLabelText(label);
		await selectEvent.select(input, options[3]);
		await selectEvent.clearFirst(input);
		fireEvent.blur(input);
		expect(getByRole('alert').textContent).toBe(
			schemaStub.properties?.documentDescription?.errorMessage?.['bmi-isNotEmpty'],
		);
	});

	test('onBlur triggers onChange another time', async () => {
		const onChangeMock = jest.fn();
		const { getByLabelText, getByText, queryByText } = renderForm({
			onChange: onChangeMock,
			data: { documentDescription: options[5] },
		});
		expect(onChangeMock).toHaveBeenCalledTimes(1);
		const input = getByLabelText(label);
		expect(queryByText(options[3])).not.toBeInTheDocument();
		await selectEvent.openMenu(input);
		expect(getByText(options[3])).toBeInTheDocument();
		fireEvent.blur(input);
		expect(queryByText(options[3])).not.toBeInTheDocument();
		expect(onChangeMock).toHaveBeenLastCalledWith(
			{
				documentDescription: options[5],
			},
			true,
			[],
		);
		expect(onChangeMock).toHaveBeenCalledTimes(2);
	});
});
