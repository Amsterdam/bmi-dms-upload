import { removeFileFromStore, resetState, setFile, setMetadata, reducer, initialState } from './dataSlice';
import { file, metadata, stateWithFile, stateWithFileAndMetadata } from './__stubs__/state';

describe('dataSlice', () => {
	test('setFile', () => {
		expect(reducer(initialState, setFile(file))).toEqual(stateWithFile);
	});

	test('setMetadata', () => {
		expect(reducer(stateWithFile, setMetadata(metadata))).toEqual(stateWithFileAndMetadata);
	});

	test('resetState', () => {
		expect(reducer(stateWithFileAndMetadata, resetState())).toEqual({
			metadata: {},
		});
	});

	test('removeFileFromStore', () => {
		expect(reducer(stateWithFileAndMetadata, removeFileFromStore())).toEqual({
			metadata,
		});
	});
});
