import React, { ComponentProps } from 'react';
import { useHistory } from 'react-router-dom';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import { CustomFileOrRejection } from '@amsterdam/bmi-component-library/lib/common/src/FileUpload/hooks';
import renderWithProviders from '~/tests/utils/withProviders';
import * as actions from '../../store/dataSlice';
import { DMSUpload } from '../../store/store';
import { initialState as storeState } from '../../store/dataSlice';
import Wizard from './Wizard';
import { MetadataExample } from '../../types';
import { asset, schema, uischema } from './__stubs__';
import MetadataForm from '../MetadataForm/MetadataForm';
import Step1 from './Step1';
import { mocked, mockComponentProps } from '~/tests/helpers';
import { getMetadataFromStore } from '../../store/selectors';

jest.mock('./Step1');
jest.mock('../MetadataForm/MetadataForm');

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as Record<string, unknown>),
	useHistory: jest.fn().mockImplementation(() => ({
		push: mockHistoryPush,
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

const Step1Mock = mocked(Step1);
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
const onCloseMock = jest.fn();
const onMetadataSubmitMock = jest.fn().mockImplementation(() => Promise.resolve());
const onFileSuccessMock = jest.fn().mockImplementation(() => Promise.resolve());
const onFileRemoveMock = jest.fn().mockImplementation(() => Promise.resolve());
const onCancelMock = jest.fn().mockImplementation(() => Promise.resolve());

const props = {
	asset: asset,
	onClose: () => onCloseMock(),
	getPostUrl: jest.fn(),
	getHeaders: jest.fn(),
	onFileSuccess: onFileSuccessMock,
	onFileRemove: onFileRemoveMock,
	metadataForm: {
		schema,
		uischema,
		data: mockData,
		onChange: jest.fn(),
		renderers: [],
	},
	onMetadataSubmit: onMetadataSubmitMock,
	onCancel: onCancelMock,
	basePath: '/',
};

describe('<Wizard />', () => {
	const renderComponent = (
		storeState: DMSUpload,
		url: string = '/',
		customProps: Partial<ComponentProps<typeof Wizard>> = {},
	) => {
		renderWithProviders(<Wizard<MetadataExample> {...Object.assign({}, props, customProps)} />, {
			initialState: storeState,
			initialRoute: url,
		});
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
			const metadata: MetadataExample = {
				documentDescription: '__DOCUMENT_DESCRIPTION__',
				executionDate: '__EXECUTION_DATE__',
			};
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

		test('is NOT called when saving while <MetaDataForm /> is NOT valid', async () => {
			const pushSpy = jest.fn();
			useHistoryMock.mockReturnValue({ push: pushSpy } as any);
			renderComponent({ file: mockFile, metadata: {} }, '/step2');

			act(() => {
				fireEvent.click(screen.getByText('Opslaan'));
			});
			await waitFor(() => {
				expect(onMetadataSubmitMock).not.toHaveBeenCalled();
			});
		});

		test('setFile is called when file is uploaded successfully', () => {
			const setFileSpy = jest.spyOn(actions, 'setFile');
			renderComponent(storeState);
			const { onFileSuccess } = mockComponentProps<ComponentProps<typeof Step1>>(Step1Mock);
			act(() => {
				onFileSuccess && onFileSuccess(mockFile);
			});
			expect(setFileSpy).toHaveBeenCalledWith(mockFile);
			expect(onFileSuccessMock).toHaveBeenCalledWith(mockFile);
		});

		test('removeFileFromStore is called when onFileRemove is removed successfully', () => {
			const removeFileFromStoreSpy = jest.spyOn(actions, 'removeFileFromStore');
			renderComponent({ file: mockFile, metadata: {} }, '/');
			const { onFileRemove } = mockComponentProps<ComponentProps<typeof Step1>>(Step1Mock);
			act(() => {
				onFileRemove && onFileRemove(mockFile as CustomFileOrRejection);
			});
			expect(removeFileFromStoreSpy).toHaveBeenCalled();
			expect(onFileRemoveMock).toHaveBeenCalledWith(mockFile);
		});

		test.each([['cancel-wizard'], ['modal-close-button']])(
			'should catch error when promise is rejected',
			(dataTestId) => {
				const onCancelMockRejected = jest.fn().mockImplementation(() => Promise.reject(Error('my error')));
				renderComponent({ file: mockFile, metadata: {} }, '/', {
					onCancel: onCancelMockRejected,
				});
				fireEvent.click(screen.getByTestId(dataTestId));
				expect(onCancelMockRejected).rejects.toThrow();
			},
		);

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
	});
});
