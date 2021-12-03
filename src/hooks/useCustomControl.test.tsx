import useCustomControl from './useCustomControl';
import { ControlProps } from '@jsonforms/core';
import { renderHook } from '@testing-library/react-hooks';

describe('', () => {
	test('should return correct entries', () => {
		const { result } = renderHook(() =>
			useCustomControl({
				data: 'test',
				errors: 'test-error',
				label: 'test-label',
				path: '/test',
			} as ControlProps),
		);

		const expectedResult = {
			isFocused: false,
			isDirty: true,
			isValid: false,
			onFocus: function () {
				console.log('onFocus');
			},
			onBlur: () => console.log('onBlur'),
			onChange: () => console.log('onChange'),
		};
		const currResult = result.current;

		expect(Object.keys(currResult)).toEqual(Object.keys(expectedResult));
		expect(currResult.isValid).toEqual(expectedResult.isValid);
		expect(currResult.isDirty).toEqual(expectedResult.isDirty);
		expect(currResult.isFocused).toEqual(expectedResult.isFocused);
		expect(currResult.onBlur).toEqual(expect.any(Function));
		expect(currResult.onFocus).toEqual(expect.any(Function));
		expect(currResult.onChange).toEqual(expect.any(Function));
	});
});
