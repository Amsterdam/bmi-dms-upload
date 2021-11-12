import AJV from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';

export default function () {
	const ajv = new AJV({
		allErrors: true,
		verbose: true,
		strict: false,
	});

	addFormats(ajv);

	ajv.addKeyword({
		keyword: 'bmi-isNotEmpty',
		type: 'string',
		validate: function (schema: any, data: any) {
			return typeof data === 'string' && data.trim() !== '';
		},
		errors: true,
	});

	return ajvErrors(ajv, { singleError: true, keepErrors: false });
}
