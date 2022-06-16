import { rankWith } from '@jsonforms/core';
import { schemaMatches, Tester } from '@jsonforms/core';

export const customFormatIs = (expectedFormat: string): Tester => {

	return schemaMatches((schema) => {
		// @TODO: cannot find customFormat on schema type. Technical depth that has to be fixed in the future
		// @ts-ignore
		return schema?.customFormat === expectedFormat && schema?.type === 'array'
	})
}
export default rankWith(100, customFormatIs('creatable-array'));
