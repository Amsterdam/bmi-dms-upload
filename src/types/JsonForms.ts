import { ErrorObject } from 'ajv';

export type OnChangeCallback = (valid: boolean, errors: ErrorObject[]) => void;
