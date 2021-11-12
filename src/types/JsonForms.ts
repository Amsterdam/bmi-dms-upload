import { ErrorObject } from 'ajv';
import { MetadataGenericType } from './MetadataGenericType';

export type OnChangeCallback = (data: MetadataGenericType, valid: boolean, errors: ErrorObject[]) => void;
