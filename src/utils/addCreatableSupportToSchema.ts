import type { CustomJsonSchema } from '../types';

// The oneOf property in the JsonSchema we use to populate the select options does is used for validation purposes
// If an option for a creatable field does not exist in the oneOf array, it is deemed an invalid option
// What we do here is adding a new option in case a non-existent option is presenting itself
// The altered schema is then used for validation purposes but NOT rendering purposes
export default function addCreatableSupportToSchema(
	schema: CustomJsonSchema,
	data: Record<string, any>,
): CustomJsonSchema {
	const { properties = {} } = schema;
	return {
		...schema,
		properties: Object.keys(properties).reduce((acc = {}, key) => {
			const property = { ...properties?.[key] };
			const value = data[key];

			if (property?.customFormat === 'creatable' && value) {
				const isOption = property.oneOf?.findIndex((option) => option.const === value) !== -1;
				if (!isOption) {
					property.oneOf = [...(property?.oneOf ?? []), { const: value, title: value }];
				}
			}

			acc[key] = property;
			return acc;
		}, {} as CustomJsonSchema['properties']),
	};
}
