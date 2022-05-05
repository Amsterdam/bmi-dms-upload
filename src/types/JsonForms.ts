import { ErrorObject } from 'ajv';
import { MetadataGenericType } from './MetadataGenericType';
import { JsonSchema7, UISchemaElement } from '@jsonforms/core';

export type OnChangeCallback = (data: MetadataGenericType, valid: boolean, errors: ErrorObject[]) => void;

export interface CustomJsonSchema extends JsonSchema7 {
	'bmi-isNotEmpty'?: boolean;
	properties?: {
		[property: string]: JsonSchema7 & {
			'bmi-isNotEmpty'?: boolean;
			customFormat?: 'creatable';

			properties?: {
				[property: string]: JsonSchema7 & {
					'bmi-isNotEmpty'?: boolean;
					customFormat?: 'creatable';
				}
			}
		};
	};
}

export interface RowLayoutSchema {
	type: 'RowLayout';
	elements: Array<UISchemaElement & { scope: string; label?: string }>;
}
