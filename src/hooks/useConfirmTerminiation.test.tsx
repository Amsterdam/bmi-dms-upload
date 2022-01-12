import { renderHook } from '@testing-library/react-hooks';
import useConfirmTermination from './useConfirmTermination';
import { act } from 'react-dom/test-utils';

describe('useConfirmTermination()', () => {
	test('should render is open as true and return callback', () => {
		const { result } = renderHook(() => useConfirmTermination(() => jest.fn()));

		act(() => {
			result.current.confirm();
		});

		expect(result.current.isOpen).toBe(true);
		expect(result.current.confirm).toEqual(expect.any(Function));
	});
});
