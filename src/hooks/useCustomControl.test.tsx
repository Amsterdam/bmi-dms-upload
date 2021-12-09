import { ControlProps } from '@jsonforms/core';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import useCustomControl from './useCustomControl';

describe('useCustomControl()', () => {
	const handleChangeMock = jest.fn();
	const props: ControlProps = {
		data: 'value',
		errors: 'error',
		label: 'label',
		handleChange: handleChangeMock,
		path: './',
		id: 'd',
		rootSchema: {},
		uischema: { scope: 'test', type: 'Control' },
		schema: {},
		enabled: true,
		visible: true,
	};
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

	test('onFocus', () => {
		const { result } = renderHook(() => useCustomControl(props));

		act(() => {
			result.current.onFocus();
		});

		expect(result.current.isFocused).toBe(true);
		expect(result.current.isDirty).toBe(true);
	});

	test('onBlur', () => {
		const { result } = renderHook(() => useCustomControl(props));
		act(() => {
			result.current.onBlur({
				currentTarget: {
					value: '__VALUE__',
				},
			});
		});
		expect(handleChangeMock).toHaveBeenCalledWith('./', '__VALUE__');
		expect(result.current.isFocused).toBe(false);

		act(() => {
			result.current.onBlur({
				currentTarget: {},
			});
		});
		expect(handleChangeMock).toHaveBeenCalledWith('./', '');
	});

	test('onChange', () => {
		const { result } = renderHook(() => useCustomControl(props));
		result.current.onChange({
			currentTarget: {
				value: '__VALUE__',
			},
		});
		expect(handleChangeMock).toHaveBeenCalledWith('./', '__VALUE__');

		result.current.onChange({
			currentTarget: {},
		});

		expect(handleChangeMock).toHaveBeenCalledWith('./', '');
	});
});
