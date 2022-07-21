import { useNavigate } from 'react-router-dom-v5-compat';

import { CustomFileLightOrRejection } from '../../../../types';
import { files as filesMock, fields as fieldsMock, state as stateMock } from '../__stubs__';
import {
	reducer,
	initialState,
	setCurrentStep,
	resetState,
	setFile,
	setFields,
	removeFile,
	setFileMetadata,
	setBasePath,
} from './slice';
import { CurrentStep, IBulkFileMetadata } from './model';

jest.mock('react-router-dom-v5-compat');

describe('Bulk Slice', () => {
	test('initial state', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	test('setBasePath', () => {
		expect(reducer(initialState, setBasePath('/foo/bar'))).toEqual({
			...initialState,
			basePath: '/foo/bar',
		});
	});

	test('removeFile', () => {
		expect(stateMock.files.length).toBe(2);
		expect(reducer(stateMock, removeFile(filesMock[0].uploadedFile as CustomFileLightOrRejection)).files.length).toBe(
			1,
		);
	});

	test('resetState', () => {
		const navigate = useNavigate();

		expect(
			reducer(
				{
					...initialState,
					currentStep: 1,
					fields: [
						{
							id: '1',
							label: 'some-label',
							value: 'some-value',
							changeIndividual: false,
							type: 'text',
						},
					],
				},
				resetState({ navigate }),
			),
		).toEqual(initialState);
	});

	test('setCurrentStep', () => {
		expect(reducer(initialState, setCurrentStep(CurrentStep.Upload))).toEqual({
			...initialState,
			currentStep: 1,
		});
	});

	test('setFile', () => {
		expect(reducer(initialState, setFile(filesMock[0]))).toEqual({
			...initialState,
			files: [filesMock[0]],
		});
	});

	test('setFields', () => {
		expect(reducer(initialState, setFields(fieldsMock))).toEqual({
			...initialState,
			fields: fieldsMock,
		});
	});

	test('setFileMetadata', () => {
		const newValues: IBulkFileMetadata = { id: 'field-1', value: 'New Field 1 value', type: 'text' };
		expect(reducer(stateMock, setFileMetadata({ fileId: '1', metadata: [newValues] })).files[0].metadata).toStrictEqual(
			[newValues],
		);
	});
});
