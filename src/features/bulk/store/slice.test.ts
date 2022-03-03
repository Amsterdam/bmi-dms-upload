import { setFile, reducer, initialState, resetState, setFields, setFieldData, removeFile } from './slice';
import { customFileA, fieldsDefault, files, stateWithFieldsUpdated, stateWithFiles, stateWithFilesRemoved } from './__stubs__/state';
import { fields, stateWithFields } from './__stubs__/state'

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
					currentStep: 0,
					files: [file],
					fields: [],
				});
			});
		})

		describe('setFields', (): void => {
			it('should set fields', (): void => {
				expect(reducer(initialState, setFields(fields))).toEqual(stateWithFields);
			})
		})

		describe('setFieldData', (): void => {
			it('should set field data', (): void => {
				const fieldFromStore = fieldsDefault[0];
				const fieldData: any = {}
				fieldData[fieldFromStore.id] = {}
				fieldData[fieldFromStore.id].changeIndividual = true;
				expect(reducer(stateWithFields, setFieldData(fieldData))).toEqual(stateWithFieldsUpdated);
			})
		})

		describe('removeFile', (): void => {
			it('should remove file', (): void => {
				expect(reducer(stateWithFiles, removeFile(customFileA))).toEqual(stateWithFilesRemoved);
			})
		})

		describe('resetState', (): void => {
			it('should reset state', (): void => {
				expect(reducer(initialState, resetState())).toEqual(initialState)
			})
		})

	});
});
