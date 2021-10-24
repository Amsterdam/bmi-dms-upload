//test routing, zie SOKtabs in aip
//

import * as React from 'react';
import { screen } from '@testing-library/react';
import renderWithProviders from '~/tests/utils/withProviders';
import Step1 from '~/components/Wizard/Step1';
/* eslint-disable react/display-name */

function renderComponent() {
	return renderWithProviders(
		<Step1 getPostUrl={jest.fn()} getHeaders={jest.fn()} onFileSuccess={jest.fn()} onFileRemove={jest.fn()} />,
		{},
	);
}

describe('<Step1 />', () => {
	test('Should render fileUpload component', () => {
		renderComponent();
		expect(screen.queryByTestId('file-upload')).toBeInTheDocument();
	});
});
