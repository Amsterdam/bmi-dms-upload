import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

import useConfirmTermination from './useConfirmTermination';

describe('useConfirmTermination()', () => {
	test('should render is open as true and return callback', () => {
		const { result } = renderHook(() => useConfirmTermination(() => jest.fn()));

		act(() => {
			result.current.confirm();
		});

		expect(result.current.isOpen).toBe(true);
		expect(result.current.confirm).toEqual(expect.any(Function));
	});

	test('should call terminate callback when forceTerminate is true', () => {
		const terminateCallback = jest.fn();
		const { result } = renderHook(() => useConfirmTermination(terminateCallback));

		act(() => {
			result.current.confirm(true);
		});

		expect(terminateCallback).toHaveBeenCalled();
	});

	test('should not call terminate callback when forceTerminate is false', () => {
		const terminateCallback = jest.fn();
		const { result } = renderHook(() => useConfirmTermination(terminateCallback));

		act(() => {
			result.current.confirm(false);
		});

		expect(terminateCallback).not.toHaveBeenCalled();
	});

	test('should not call terminate callback when forceTerminate is undefined', () => {
		const terminateCallback = jest.fn();
		const { result } = renderHook(() => useConfirmTermination(terminateCallback));

		act(() => {
			result.current.confirm();
		});

		expect(terminateCallback).not.toHaveBeenCalled();
	});
});
