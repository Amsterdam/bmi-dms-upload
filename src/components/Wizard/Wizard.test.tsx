//test routing, zie SOKtabs in aip
//

import * as React from 'react';

import { screen, fireEvent } from '@testing-library/react';
import renderWithProviders from '~/tests/utils/withProviders';
import * as actions from '../../store/dataSlice';
import { DMSUpload } from '../../store/store';
import { initialState as storeState } from '../../store/dataSlice';
import Wizard from './Wizard';
import { MetadataExample } from '../../types/MetadataExample';
import { asset, schema, uischema } from './__stubs__';

/* eslint-disable react/display-name */

jest.mock('./Step1');
jest.mock('./Step2');

const rawFile = new File(['there'], 'there.png', { type: 'image/png' });
const mockFile = Object.assign(rawFile, { tmpId: 100 });

const mockData: MetadataExample = {
	documentDescription: 'test',
	executionDate: '12-10-2021',
};

let cancelButton: HTMLElement;

interface IInitialState {
	formValues: MetadataExample;
	isValidForm: boolean;
}

const defaultInitialState: IInitialState = {
	formValues: mockData,
	isValidForm: false,
};

describe('<Wizard />', () => {
	const onCloseMock = jest.fn();
	const onMetadataSubmitMock = jest.fn();
	// const setFormValues = jest.fn();
	// const setIsValidForm = jest.fn();

	const renderComponent = (storeState: DMSUpload, url: string, initialState = defaultInitialState) => {
		// (useStateMock as any)
		//  .mockImplementationOnce((initial: boolean) => {
		//      return [initialState?.formValues ?? initial, setFormValues];
		//  })
		//  .mockImplementationOnce((initial: undefined) => {
		//      return [initialState?.isValidForm ?? initial, setIsValidForm];
		//  })
		//  // Ensure useState doesn't flip out when called from elsewhere
		//  .mockImplementation((initial: any) => [initial, jest.fn()]);

		renderWithProviders(
			<Wizard<MetadataExample>
				asset={asset}
				onClose={() => onCloseMock()}
				getPostUrl={jest.fn()}
				getHeaders={jest.fn()}
				onFileSuccess={jest.fn()}
				onFileRemove={jest.fn()}
				metadataForm={{
					schema,
					uischema,
					data: mockData,
					onChange: jest.fn(),
					renderers: [],
				}}
				onMetadataSubmit={onMetadataSubmitMock}
				onCancel={jest.fn().mockImplementation(() => Promise.resolve())}
			/>,
			{ initialState: storeState, initialRoute: url },
		);
		cancelButton = screen.getByText('Annuleren');
	};

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('Step1', () => {
		renderComponent(storeState, '/');
		expect(screen.queryByTestId('step-1')).toBeInTheDocument();
		expect(screen.queryByTestId('step-2')).not.toBeInTheDocument();

		expect(cancelButton).toBeInTheDocument();
	});

	test('Should render Next button when file in state and go to next page on click', () => {
		renderComponent({ file: mockFile, metadata: { mockData } }, '/');
		const nextButton = screen.getByText('Volgende');
		expect(nextButton).toBeInTheDocument();
		fireEvent.click(nextButton);
		expect(screen.queryByTestId('step-2')).toBeInTheDocument();
		expect(screen.queryByTestId('step-1')).not.toBeInTheDocument();
	});

	test('Should render the correct buttons in step 2', () => {
		renderComponent(storeState, '/step2');

		expect(screen.queryByTestId('step-2')).toBeInTheDocument();
		expect(cancelButton).toBeInTheDocument();
		expect(screen.getByText('Opslaan')).toBeInTheDocument();
	});

	test('Should call resetState, onClose when clicking Cancel button', () => {
		const spy = jest.spyOn(actions, 'resetState');
		renderComponent({ file: mockFile, metadata: { mockData } }, '/');
		fireEvent.click(cancelButton);
		expect(spy).toHaveBeenCalled();
		expect(onCloseMock).toHaveBeenCalled();
	});

	test('Should not submit when invalid data', () => {
		renderComponent(
			{
				file: mockFile,
				metadata: { documentDescription: '', executionDate: '' },
			},
			'/step2',
		);
		fireEvent.click(screen.getByText('Opslaan'));
		expect(onMetadataSubmitMock).not.toHaveBeenCalled();
	});

	test('Should submit when valid data', () => {
		// not working yet
		// renderComponent(storeState, '/step2', { formValues: mockData, isValidForm: true });
		// // const spy = jest.spyOn(selectors, 'getFileFromStore');
		// // expect(spy).toHaveBeenCalled();
		// expect(screen.getByText('Vorige')).toBeInTheDocument();
		// // console.log(container);
		// expect(onMetadataSubmitMock).toHaveBeenCalled();
		// fireEvent.click(screen.getByText('Opslaan'));
		// fireEvent.click(screen.getByText('Vorige'));
		// expect(screen.queryByTestId('step-1')).toBeInTheDocument();
	});
});
