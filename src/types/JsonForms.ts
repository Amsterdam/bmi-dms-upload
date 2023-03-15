import { ErrorObject } from 'ajv';
import { MetadataGenericType } from './MetadataGenericType';
import { JsonSchema7, UISchemaElement } from '@jsonforms/core';

export type OnChangeCallback = (data: MetadataGenericType, valid: boolean, errors: ErrorObject[]) => void;

export interface CustomJsonSchema extends JsonSchema7 {
	'bmi-isNotEmpty'?: boolean;
	'is-date-year'?: boolean;
	properties?: {
		[property: string]: JsonSchema7 & {
			'bmi-isNotEmpty'?: boolean;
			'is-date-year'?: boolean;
			customFormat?: 'creatable' | 'creatable-array' | 'multi-creatable';

			properties?: {
				[property: string]: JsonSchema7 & {
					'bmi-isNotEmpty'?: boolean;
					'is-date-year'?: boolean;
					customFormat?: 'creatable' | 'creatable-array' | 'multi-creatable';
				};
			};
		};
	};
}

export interface RowLayoutSchema {
	type: 'RowLayout';
	elements: Array<UISchemaElement & { scope: string; label?: string }>;
}
