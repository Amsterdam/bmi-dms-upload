import React, { ComponentProps } from 'react';
import { useHistory } from 'react-router-dom';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import renderWithProviders from '~/tests/utils/withProviders';
import * as actions from '../../store/dataSlice';
import { DMSUpload } from '../../store/store';
import { initialState as storeState } from '../../store/dataSlice';
import Wizard from './Wizard';
import { MetadataExample } from '../../types';
import { asset, schema, uischema } from './__stubs__';
import MetadataForm from '../MetadataForm/MetadataForm';
import { mocked, mockComponentProps } from '~/tests/helpers';
import { getMetadataFromStore } from '../../store/selectors';

jest.mock('./Step1');
jest.mock('../MetadataForm/MetadataForm');

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as Record<string, unknown>),
	useHistory: jest.fn().mockImplementation(() => ({
		push: jest.fn(),
	})),
}));

jest.mock('react-redux', () => ({
	...(jest.requireActual('react-redux') as Record<string, unknown>),
	useDispatch: () => jest.fn(),
	useSelector: (f: () => void) => f(),
}));

jest.mock('../../store/selectors', () => ({
	...(jest.requireActual('../../store/selectors') as Record<string, unknown>),
	getMetadataFromStore: jest.fn(),
}));

const MetadataFormMock = mocked(MetadataForm);
const getMetadataFromStoreMock = mocked(getMetadataFromStore);
const useHistoryMock = mocked(useHistory);

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
	const onMetadataSubmitMock = jest.fn().mockImplementation(() => Promise.resolve());
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
		expect(screen.queryByText('Volgende')).not.toBeInTheDocument();
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

	describe('onMetadataSubmit()', () => {
		test('is called when saving while <MetaDataForm /> is valid', async () => {
			const pushSpy = jest.fn();
			const setMetadataSpy = jest.spyOn(actions, 'setMetadata');
			useHistoryMock.mockReturnValue({ push: pushSpy } as any);
			const metadata = {
				documentDescription: '__DOCUMENT_DESCRIPTION__',
				executionDate: '__EXECUTION_DATE__',
			} as MetadataExample;
			getMetadataFromStoreMock.mockReturnValue(metadata);
			renderComponent({ file: mockFile, metadata: {} }, '/step2');
			const { onChange } = mockComponentProps<ComponentProps<typeof MetadataForm>>(MetadataFormMock);
			act(() => {
				onChange(metadata, true, []);
			});
			act(() => {
				fireEvent.click(screen.getByText('Opslaan'));
			});
			await waitFor(() => {
				expect(setMetadataSpy).toHaveBeenCalledWith(metadata);
				expect(onMetadataSubmitMock).toHaveBeenCalledWith({
					file: mockFile,
					metadata,
				});
				expect(pushSpy).toHaveBeenCalledWith('/');
			});
		});

		test('is NOT called when saving while <MetaDataForm /> is NOT valid', () => {});
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
			mocked(useHistory).mockReturnValue({
				push: pushSpy,
			} as any);
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
