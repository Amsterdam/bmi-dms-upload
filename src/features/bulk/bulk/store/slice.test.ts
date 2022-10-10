import { useNavigate } from 'react-router-dom-v5-compat';

import { CustomFileLightOrRejection } from '../../../../types';
import { files as filesMock, fields as fieldsMock, state as stateMock } from '../__stubs__';
import { CurrentStep, IBulkField, IBulkFile, IBulkFileMetadata } from './model';
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
	setAllFieldsEditable,
	resetFieldsAndFiles,
	setBulkMode,
} from './slice';

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

	test('setAllFieldsEditable', () => {
		const metadataFields = [
			{ id: '1', changeIndividual: false },
			{ id: '3', changeIndividual: false },
		] as IBulkField[];

		const result = reducer(initialState, setAllFieldsEditable(metadataFields)).fields;
		const expectedResult = [
			{ id: '1', changeIndividual: true },
			{ id: '3', changeIndividual: true },
		] as IBulkField[];

		expect(result).toStrictEqual(expectedResult);
	});

	test('resetFieldsAndFiles', () => {
		const fields = [
			{ id: '1', changeIndividual: true },
			{ id: '3', changeIndividual: true },
		] as IBulkField[];
		const files = [
			{
				id: '1',
				uploadedFile: {},
				metadata: [] as IBulkFileMetadata[],
			},
			{
				id: '2',
				uploadedFile: {},
				metadata: [] as IBulkFileMetadata[],
			},
		] as IBulkFile[];
		const mockState = { ...initialState, files, fields };

		const result = reducer(mockState, resetFieldsAndFiles());
		const expectedFields = [
			{ id: '1', changeIndividual: false },
			{ id: '3', changeIndividual: false },
		];
		const expectedFiles = [
			{
				id: '1',
				uploadedFile: {},
			},
			{
				id: '2',
				uploadedFile: {},
			},
		];

		expect(result.fields).toStrictEqual(expectedFields);
		expect(result.files).toStrictEqual(expectedFiles);
	});

	test('setBulkMode', () => {
		const result = reducer(initialState, setBulkMode(true));

		expect(result.isBulkMode).toBeTruthy();
	});
});
