import { rankWith } from '@jsonforms/core';
import { and, schemaTypeIs, uiTypeIs } from '@jsonforms/core';
import { schemaMatches, Tester } from '@jsonforms/core';

export const customFormatIs = (expectedFormat: string): Tester =>
	// @ts-ignore
	schemaMatches((schema) => schema?.customFormat === expectedFormat && schema?.type === 'string');

export default rankWith(100, and(uiTypeIs('Control'), schemaTypeIs('string'), customFormatIs('creatable')));
