import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import selectEvent from 'react-select-event';
import Form, { Props } from '../../Form/Form';
import { schema as schemaStub, options } from './__stubs__/schema';
import { uischema, uischema as uischemaStub } from './__stubs__/uischema';

const label = `${uischema.elements[0]?.label} *` ?? '';

describe('customRenderers / CreatableSelectArray', () => {
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
		const { getByLabelText } = renderForm({});
		expect(getByLabelText(label)).toBeInTheDocument();
	});

	test('Is connected to JsonForms state', async () => {
		const onChangeMock = jest.fn();
		const { getByLabelText } = renderForm({ onChange: onChangeMock });
		const input = getByLabelText(label);
		await selectEvent.select(input, options[3]);
		await waitFor(() => {
			expect(onChangeMock).toHaveBeenLastCalledWith(
				{
					documentDescription: ['Bouwkundig onderzoek'],
				},
				true,
				[],
			);
		});
	});

	test('Produces error onBlur when dirty', async () => {
		const { getByRole, getByLabelText } = renderForm({ onChange: jest.fn() });
		const input = getByLabelText(label);
		await selectEvent.select(input, options[3]);
		await selectEvent.clearFirst(input);
		fireEvent.blur(input);
		expect(getByRole('alert').textContent).toContain(
			schemaStub.properties?.documentDescription?.errorMessage?.['bmi-isNotEmpty'],
		);
	});

	test('onBlur triggers onChange another time', async () => {
		const onChangeMock = jest.fn();
		const { getByLabelText, getByText, queryByText } = renderForm({
			onChange: onChangeMock,
			data: {
				documentDescription: [options[5]],
			},
		});
		const input = getByLabelText(label);
		expect(queryByText(options[3])).not.toBeInTheDocument();
		await selectEvent.openMenu(input);
		expect(getByText(options[3])).toBeInTheDocument();
		fireEvent.blur(input);
		await waitFor(() => {
			expect(queryByText(options[3])).not.toBeInTheDocument();
			expect(onChangeMock).toHaveBeenLastCalledWith(
				{
					documentDescription: [options[5]],
				},
				true,
				[],
			);
			expect(onChangeMock).toHaveBeenCalledTimes(1);
		});
	});
});
