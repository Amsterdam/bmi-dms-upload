import { setFile, reducer, initialState } from './slice';
import { files } from './__stubs__/state';

describe('BulkMetadata Slice', (): void => {
	describe('reducers', (): void => {
		it('should handle initial state', () => {
			expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
		});

		describe('setFile', (): void => {
			it('should set file', (): void => {
				const file = files[0];

				expect(reducer(initialState, setFile({
					id: file.id,
					url: file.url,
					uploadedFile: file.uploadedFile,
					metadata: file.metadata,
				}))).toEqual({
					currentStep: 'upload',
					files: [file],
					fields: [],
				});
			});
		})
	});
});
