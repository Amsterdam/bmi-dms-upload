import { CurrentStep } from './model';
import { reducer, initialState, setCurrentStep, resetState, setFile, setMetadata } from './slice';
import { file } from './__stubs__';

describe('Single Slice', () => {
	test('should return the initial state', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	test('should reset to the initial state', () => {
		expect(
			reducer(
				{
					...initialState,
					currentStep: 1,
					metadata: {
						foo: 'bar',
					},
				},
				resetState(),
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
		expect(reducer(initialState, setFile(file))).toEqual({
			...initialState,
			file,
		});
	});

	test('should handle metadata being set', () => {
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
});