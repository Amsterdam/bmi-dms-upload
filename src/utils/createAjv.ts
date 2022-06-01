import AJV from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';

const ajv = new AJV({
	allErrors: true,
	verbose: true,
	strict: false,
});

addFormats(ajv);

ajv.addKeyword({
	keyword: 'bmi-isNotEmpty',
	type: ['string', 'array'],
	validate: function (schema: any, data: any) {
		switch (typeof data) {
			case 'string':
				return data.trim() !== ''
			case 'object':
				return data.length > 0;
			default:
				return false;
		}
	},
	errors: true,
});

ajvErrors(ajv, { singleError: true, keepErrors: false });

export default ajv;
