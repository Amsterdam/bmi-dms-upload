//test routing, zie SOKtabs in aip
//

import * as React from 'react';
import Wizard from '~/components/Wizard/Wizard';
import { screen } from '@testing-library/react';
import { DummyForm, MetadataExample, documentTypeEnum } from '../DummyForm/DummyForm';
import renderWithProviders from '~/tests/utils/withProviders';
// import * as Step2 from '~/components/Wizard/Step2';
// import * as Step1 from '~/components/Wizard/Step1';
import { DMSUpload } from '~/store/store';
import { initialState } from '../../store/dataSlice';
/* eslint-disable react/display-name */

jest.mock('./Step1', () => ({
	__esModule: true,
	default: () => (
		<>
			<div data-testid="step-1"></div>
		</>
	),
}));
jest.mock('./Step2', () => ({
	__esModule: true,
	default: () => (
		<>
			<div data-testid="step-2"></div>
		</>
	),
}));

const rawFile = new File(['there'], 'there.png', { type: 'image/png' });
const mockFile = Object.assign(rawFile, { tmpId: 100 });

const mockData: MetadataExample = {
	documentType: documentTypeEnum.typeOne,
	documentDescription: 'test',
	executionDate: '12-10-2021',
};

const renderComponent = (state: DMSUpload, url: string) =>
	renderWithProviders(
		<Wizard<MetadataExample>
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
		{ initialState: state, initialRoute: url },
	);

describe('<Wizard />', () => {
	test('Step1', () => {
		renderComponent(initialState, '/');
		expect(screen.queryByTestId('step-1')).toBeInTheDocument();
		expect(screen.queryByTestId('step-2')).not.toBeInTheDocument();
		const annulerenButton = screen.getByText('Annuleren');

		expect(annulerenButton).toBeInTheDocument();
	});

	test('Should render Next button when file in state', () => {
		renderComponent({ file: mockFile, metadata: { mockData } }, '/');

		const nextButton = screen.getByText('Volgende');

		expect(nextButton).toBeInTheDocument();
	});

	test('Should render the right buttons in step 2', () => {
		// const spy = jest.spyOn(Step2, 'default');

		renderComponent(initialState, '/step2');
		// expect(spy).toHaveBeenCalledWith({}, DummyForm, jest.fn, {});
		expect(screen.queryByTestId('step-2')).toBeInTheDocument();
		const annulerenButton = screen.getByText('Annuleren');
		const saveButton = screen.getByText('Opslaan');

		expect(annulerenButton).toBeInTheDocument();
		expect(saveButton).toBeInTheDocument();
	});

	test('Should render next button when file in state', () => {
		// const component = renderComponent(initialState, './');
	});
});
