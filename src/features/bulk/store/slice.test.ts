import { setFiles, reducer, initialState } from './slice';
import { customFiles, stateWithFiles } from './__stubs__/state';

describe('BulkMetadata Slice', (): void => {
	describe('reducers', (): void => {
		it('should handle initial state', () => {
			expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
		});

		describe('setFiles', (): void => {
			it('should set files', (): void => {
				expect(reducer(initialState, setFiles(customFiles))).toEqual(stateWithFiles);
			});
		})
	});
});
