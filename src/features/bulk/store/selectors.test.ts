import {
	getFilesFromStore,
	getFieldsFromStore,
	getChangeIndividualFieldsFromStore,
	getDefaultFieldsFromStore,
	getFieldsForFile,
} from './selectors';
import {
	files,
	fields,
	fieldsDefault,
	fieldsChangeIndividual,
} from './__stubs__/state';

describe('BulkMetadata Selectors', () => {
	describe('getFilesFromStore', () => {
		it('should get files from store', () => {
			expect(
				getFilesFromStore.resultFunc({
					currentStep: 0,
					files,
					fields: [],
				}),
			).toEqual(files);
		});
	});
	describe('getFieldsFromStore', () => {
		it('should get fields from store', () => {
			expect(
				getFieldsFromStore.resultFunc({
					currentStep: 0,
					files: [],
					fields,
				}),
			).toEqual(fields);
		});
	});
	describe('getChangeIndividualFieldsFromStore', () => {
		it('should get changeIndividual fields from store', () => {
			expect(getChangeIndividualFieldsFromStore.resultFunc(fields)).toEqual(fieldsChangeIndividual);
		});
	});
	describe('getDefaultFieldsFromStore', () => {
		it('should get default (!changeIndividual) fields from store', () => {
			expect(getDefaultFieldsFromStore.resultFunc(fields)).toEqual(fieldsDefault);
		});
	});
	describe('getFieldsForFile', () => {
		it('should get fields for a file from store', () => {
			expect(getFieldsForFile.resultFunc(files[0], fields)).toEqual([
				...(files[0].metadata ?? []),
				...fields,
			]);
		});
	});
});
