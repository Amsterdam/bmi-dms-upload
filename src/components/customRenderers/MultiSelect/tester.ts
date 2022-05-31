import { rankWith } from '@jsonforms/core';
import { schemaMatches, Tester } from '@jsonforms/core';

export const customFormatIs = (expectedFormat: string): Tester => {

	return schemaMatches((schema) => {
		// @ts-ignore
		return schema?.customFormat === expectedFormat && schema?.type === 'array'
	})
}
export default rankWith(110, customFormatIs('multi-creatable'));
