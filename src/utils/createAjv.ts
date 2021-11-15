import AJV from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';

let cached: AJV;

export default function () {
	if (cached) return cached;

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

	cached = ajvErrors(ajv, { singleError: true, keepErrors: false });

	return cached;
}
