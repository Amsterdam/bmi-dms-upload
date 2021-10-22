//test routing, zie SOKtabs in aip
//

import * as React from 'react';
import Wizard from './Wizard';
import { screen, } from '@testing-library/react';
import { DummyForm } from '../DummyForm/DummyForm';
import renderWithProviders from '~/tests/utils/withProviders';
/* eslint-disable react/display-name */

jest.mock('./Step1', () => ({
	__esModule: true,
	default: () => <div data-testid="step-1"></div>,
}));
jest.mock('./Step2', () => ({
	__esModule: true,
	default: () => <div data-testid="step-2"></div>,
}));

function mount(url: string) {
	return renderWithProviders(
		<Wizard
			onClose={jest.fn()}
			getPostUrl={jest.fn()}
			getHeaders={jest.fn()}
			onFileSuccess={jest.fn()}
			onFileRemove={jest.fn()}
			metadataForm={DummyForm}
			onMetadataValidate={jest.fn()}
			onMetadataSubmit={jest.fn()}
			onCancel={jest.fn()}
		/>,
		url,
	);
}

describe('<Wizard> />', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	test('Step1', () => {
		mount('/');
		expect(screen.queryByTestId('step-1')).toBeInTheDocument();
		expect(screen.queryByTestId('step-2')).not.toBeInTheDocument();
	});

	//next button not visible when no file in list
	test('Should not render Next button when there are no files in the list', () => {
		expect(screen.findByText('Volgende')).not.toBeInTheDocument();
		expect(screen.findByText('Opslaan')).not.toBeInTheDocument();
	});
	// test('Should not render Next button when there are no files in the list', () => {
	// 	mount('step2/');
	// 	expect(screen.findByText('Volgende')).not.toBeInTheDocument();
	// });
});
