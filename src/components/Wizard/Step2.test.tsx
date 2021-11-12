import * as React from 'react';
import { screen } from '@testing-library/react';
import Step2 from './Step2';
import { MetadataExample } from '../../types/MetadataExample';
import { schema, uischema } from './__stubs__';
import renderWithTheme from '~/tests/utils/withTheme';

const mockData: MetadataExample = {
	documentDescription: 'test',
	executionDate: '12-10-2021',
};

function renderComponent(onChange = jest.fn()) {
	return renderWithTheme(
		<Step2
			metadataForm={{
				schema,
				uischema,
				data: mockData,
				renderers: [],
			}}
			onChange={onChange}
		/>,
		{},
	);
}

// TODO Write tests
describe('<Step2 />', () => {
	test('Should render form', () => {
		renderComponent();
		expect(screen.queryByTestId('file-upload')).not.toBeInTheDocument();
	});
});
