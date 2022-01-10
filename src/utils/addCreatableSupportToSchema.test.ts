import ajv from './createAjv';
import addCreatableSupportToSchema from './addCreatableSupportToSchema';
import { CustomJsonSchema } from '../types';
import { schema } from '../components/MetadataForm/__stubs__';

describe('addCreatableSupportToSchema()', () => {
	const otherData = {
		textField: '__TEXT_FIELD__',
		dummyDate: '2022-01-10',
	};

	test('With it a new Creatable value is considered valid', () => {
		const data = { ...otherData, documentDescription: '__ANY_VALUE__' };
		const creatableSchema = addCreatableSupportToSchema(schema as CustomJsonSchema, data);
		const validate = ajv.compile(creatableSchema);
		expect(validate(data)).toBe(true);
	});

	test('Without it a new Creatable value is considered invalid', () => {
		const data = { ...otherData, documentDescription: '__ANY_VALUE__' };
		const validate = ajv.compile(schema);
		expect(validate(data)).toBe(false);
	});

	test('Is still required', () => {
		const data = {
			...otherData,
			documentDescription: '',
		};
		const creatableSchema = addCreatableSupportToSchema(schema as CustomJsonSchema, data);
		const validate = ajv.compile(creatableSchema);
		expect(validate(data)).toBe(false);
	});

	test('Selected options are still considered valid', () => {
		const data = {
			...otherData,
			documentDescription: '4fc7103b-553d-4bdd-af68-80e74ee8562d',
		};
		const creatableSchema = addCreatableSupportToSchema(schema as CustomJsonSchema, data);
		const validate = ajv.compile(creatableSchema);
		expect(validate(data)).toBe(true);
	});
});
