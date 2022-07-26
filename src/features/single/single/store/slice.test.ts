import { useNavigate } from 'react-router-dom-v5-compat';

import { CurrentStep } from './model';
import { file, state as stateMock } from '../__stubs__';
import {
	initialState,
	reducer,
	removeFile,
	resetState,
	setBasePath,
	setCurrentStep,
	setFile,
	setMetadata,
	stepBack,
	stepForward,
} from './slice';

jest.mock('react-router-dom-v5-compat');

describe('Single Slice', () => {
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
		expect(reducer(stateMock, removeFile())).toEqual(initialState);
	});

	test('resetState', () => {
		const navigate = useNavigate();

		expect(
			reducer(
				{
					...initialState,
					currentStep: 1,
					metadata: {
						foo: 'bar',
					},
				},
				resetState({ navigate }),
			),
		).toEqual(initialState);
	});

	test('setCurrentStep', () => {
		expect(reducer(initialState, setCurrentStep(CurrentStep.Upload))).toEqual({
			...initialState,
			currentStep: CurrentStep.Upload,
		});
	});

	test('setFile', () => {
		expect(reducer(initialState, setFile(file))).toEqual({
			...initialState,
			file,
		});
	});

	test('setMetadata', () => {
		expect(
			reducer(
				initialState,
				setMetadata({
					foo: 'bar',
				}),
			),
		).toEqual({
			...initialState,
			metadata: {
				foo: 'bar',
			},
		});
	});

	test('stepBack', () => {
		expect(reducer(initialState, stepBack({ navigate: jest.fn() }))).toEqual(initialState);
	});

	test('stepForward', () => {
		expect(reducer(initialState, stepForward({ navigate: jest.fn() }))).toEqual(initialState);
	});
});
