import { renderHook } from '@testing-library/react-hooks';
import useConfirmSave from './useConfirmSave';
import { act } from 'react-dom/test-utils';

describe('useConfirmSave()', () => {
	test('should render is open as true and return callback', () => {
		const { result } = renderHook(() => useConfirmSave(() => jest.fn()));

		act(() => {
			result.current.confirm();
		});

		expect(result.current.isOpen).toBe(true);
		expect(result.current.confirm).toEqual(expect.any(Function));
	});
});
