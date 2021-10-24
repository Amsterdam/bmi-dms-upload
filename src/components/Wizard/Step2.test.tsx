//test routing, zie SOKtabs in aip
//

import * as React from 'react';
import { screen } from '@testing-library/react';
import renderWithProviders from '~/tests/utils/withProviders';
import Step2 from '~/components/Wizard/Step2';
import { DummyForm, MetadataExample, documentTypeEnum } from '../DummyForm/DummyForm';
/* eslint-disable react/display-name */

const mockData: MetadataExample = {
	documentType: documentTypeEnum.typeOne,
	documentDescription: 'test',
	executionDate: '12-10-2021',
};

function renderComponent() {
	return renderWithProviders(<Step2 metadataForm={DummyForm} data={mockData} handleChange={jest.fn()} />, {});
}

describe('<Step2 />', () => {
	test('Should render form', () => {
		renderComponent();
		expect(screen.queryByTestId('file-upload')).not.toBeInTheDocument();
	});
});
