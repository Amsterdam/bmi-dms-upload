import AJV from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';

const ajv = new AJV({
	allErrors: true,
	verbose: true,
	strict: false,
});

// @ts-ignore
addFormats(ajv);

ajv.addKeyword({
	keyword: 'bmi-isNotEmpty',
	type: ['string', 'array'],
	validate: function (schema: any, data: any) {
		switch (typeof data) {
			case 'string':
				return data.trim() !== '';
			case 'object':
				return data.length > 0;
			default:
				return false;
		}
	},
	errors: true,
});

ajv.addKeyword({
	keyword: 'is-date-year',
	type: ['string', 'number'],
	validate: function (schema: any, data: unknown) {
		switch (typeof data) {
			case 'number':
				return data >= 0 && data <= new Date().getFullYear();
			case 'string':
				return (
					data.match(/^[0-9]+$/) != null && parseInt(data, 10) >= 0 && parseInt(data, 10) <= new Date().getFullYear()
				);
			default:
				return false;
		}
	},
	errors: true,
});

ajvErrors(ajv, { singleError: true, keepErrors: false });

export default ajv;
