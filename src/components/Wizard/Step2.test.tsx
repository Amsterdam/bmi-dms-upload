//test routing, zie SOKtabs in aip
//

import * as React from 'react';
import { screen } from '@testing-library/react';
import renderWithProviders from '~/tests/utils/withProviders';
import MetadataForm, { MetadataExample, documentTypeEnum } from '../MetadataForm/MetadataForm';
import Step2 from './Step2';
/* eslint-disable react/display-name */

const mockData: MetadataExample = {
	documentType: documentTypeEnum.typeOne,
	documentDescription: 'test',
	executionDate: '12-10-2021',
};

function renderComponent() {
	return renderWithProviders(<Step2 metadataForm={MetadataForm} data={mockData} handleChange={jest.fn()} />, {});
}

describe('<Step2 />', () => {
	test('Should render form', () => {
		renderComponent();
		expect(screen.queryByTestId('file-upload')).not.toBeInTheDocument();
	});
});
