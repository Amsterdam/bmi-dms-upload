import { useNavigate } from 'react-router-dom';
import { CurrentStep } from './model';
import { reducer, initialState, setCurrentStep, resetState, setFile, setFields } from './slice';
import { files as filesMock, fields as fieldsMock } from '../__stubs__';

jest.mock('react-router-dom')

describe('Bulk Slice', () => {
	test('should return the initial state', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	test('should reset to the initial state', () => {
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
							type: 'text'
						},
					],
				},
				resetState({navigate}),
			),
		).toEqual(initialState);
	});

	test('should handle currentStep being set', () => {
		expect(reducer(initialState, setCurrentStep(CurrentStep.Upload))).toEqual({
			...initialState,
			currentStep: 1,
		});
	});

	test('should handle file beging set', () => {
		expect(reducer(initialState, setFile(filesMock[0]))).toEqual({
			...initialState,
			files: [filesMock[0]],
		});
	});

	test('should handle fields being set', () => {
		expect(reducer(initialState, setFields(fieldsMock))).toEqual({
			...initialState,
			fields: fieldsMock,
		});
	});

	test.todo('removeFile')
	test.todo('setFileMetadata')
});
