import {
	getFilesFromStore,
	getFieldsFromStore,
	getChangeIndividualFieldsFromStore,
	getDefaultFieldsFromStore,
} from './selectors';
import { files, fields, fieldsDefault, fieldsChangeIndividual, stateWithFiles, stateWithFields } from './__stubs__/state';

describe('BulkMetadata Selectors', () => {
	describe('getFilesFromStore', () => {
		it('should get files from store', () => {
			expect(getFilesFromStore(stateWithFiles)).toEqual(files)
		})
	})
	describe('getFieldsFromStore', () => {
		it('should get fields from store', () => {
			expect(getFieldsFromStore(stateWithFields)).toEqual(fields)
		})
	})
	describe('getChangeIndividualFieldsFromStore', () => {
		it('should get', () => {
			expect(getChangeIndividualFieldsFromStore(stateWithFields)).toEqual(fieldsChangeIndividual)
		})
	})
	describe('getDefaultFieldsFromStore', () => {
		it('should get', () => {
			expect(getDefaultFieldsFromStore(stateWithFields)).toEqual(fieldsDefault)
		})
	})
});
