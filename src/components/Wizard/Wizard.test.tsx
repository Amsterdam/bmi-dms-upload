import React from 'react';
import { useHistory } from 'react-router-dom';
import { screen, fireEvent } from '@testing-library/react';
import renderWithProviders from '~/tests/utils/withProviders';
import * as actions from '../../store/dataSlice';
import { DMSUpload } from '../../store/store';
import { initialState as storeState } from '../../store/dataSlice';
import Wizard from './Wizard';
import { MetadataExample } from '../../types';
import { asset, schema, uischema } from './__stubs__';

jest.mock('./Step1');
jest.mock('../MetadataForm/MetadataForm');

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as Record<string, unknown>),
	useHistory: jest.fn(),
}));

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

	const renderComponent = (storeState: DMSUpload, url: string = '/', initialState = defaultInitialState) => {
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
				basePath={'/'}
			/>,
			{ initialState: storeState, initialRoute: url },
		);
		cancelButton = screen.getByText('Annuleren');
	};

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('Starts by rendering <Step1 />', () => {
		renderComponent(storeState);
		expect(screen.queryByTestId('step-1')).toBeInTheDocument();
		expect(screen.queryByText('Volgende')).toBeDisabled();
		expect(screen.queryByTestId('metadata-form')).not.toBeInTheDocument();
		expect(cancelButton).toBeInTheDocument();
	});

	test('Should render Next button when file in state and go to next page on click', () => {
		const pushSpy = jest.fn();
		(useHistory as jest.Mock).mockReturnValue({
			push: pushSpy,
		});
		renderComponent({ file: mockFile, metadata: { mockData } });
		const nextButton = screen.getByText('Volgende');
		expect(nextButton).toBeInTheDocument();
		fireEvent.click(nextButton);
		expect(pushSpy).toHaveBeenCalledWith('/step2');
	});

	// test('Should render the correct buttons in step 2', () => {
	// 	renderComponent(storeState, '/step2');
	//
	// 	expect(screen.queryByTestId('step-2')).toBeInTheDocument();
	// 	expect(cancelButton).toBeInTheDocument();
	// 	expect(screen.getByText('Opslaan')).toBeInTheDocument();
	// });

	test.each([['cancel-wizard'], ['modal-close-button']])(
		'Clicking button with test id %s triggers resetState and terminates the wizard',
		(dataTestId) => {
			const pushSpy = jest.fn();
			(useHistory as jest.Mock).mockReturnValue({
				push: pushSpy,
			});
			const spy = jest.spyOn(actions, 'resetState');
			renderComponent({ file: mockFile, metadata: { mockData } }, '/');
			fireEvent.click(screen.getByTestId(dataTestId));
			expect(spy).toHaveBeenCalled();
			expect(onCloseMock).toHaveBeenCalled();
			expect(pushSpy).toHaveBeenCalledWith('/');
		},
	);

	test('should go to navigate to previous step when clicking previousbutton', () => {
		const pushSpy = jest.fn();
		(useHistory as jest.Mock).mockReturnValue({
			push: pushSpy,
		});
		renderComponent(
			{
				file: mockFile,
				metadata: { mockData },
			},
			'/step2',
		);
		const previousButton = screen.getByTestId('previous-button');
		expect(screen.getByTestId('previous-button')).toBeInTheDocument();
		fireEvent.click(previousButton);

		expect(pushSpy).toHaveBeenCalledWith('/');
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

	//test 72-73		onFileSuccess && onFileSuccess(file);
	// dispatch(setFile(file));
	//test 80-81 onFileRemove && onFileRemove(file);
	// dispatch(removeFileFromStore());
	// test 87-94 e.preventDefault();

	// if (file && isValidForm) {
	// 	onMetadataSubmit({ file, metadata })
	// 		.then(() => resetAndClose())
	// 		.catch((err) => {
	// 			// TODO handle error gracefully
	// 			console.error(err);

	//test 115 terminate function
	// dispatch(setMetadata(data));
	// setIsValidForm(valid);

	// 									console.error(err);

	// 183= previous button click

	// test('Should submit when valid data', () => {
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
	// });
});
