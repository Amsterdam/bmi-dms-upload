import { CustomJsonSchema, MetadataProperty } from '../types';

export default function createSchemaFromMetadataProps(metadataProperties: MetadataProperty[]): CustomJsonSchema {
	return {
		type: 'object',
		properties: metadataProperties.reduce(
			(
				acc,
				{
					key,
					scope,
					type,
					format,
					'bmi-isNotEmpty': isNotEmpty,
					'bmi-errorMessage': customErrorMessage,
					label,
					oneOf,
					customFormat,
				},
			) => {
				acc[key] = {
					type: 'object',
					properties: {
						name: {
							type: 'string',
						},
						value: {
							type,
							format,
							errorMessage: {
								format: customErrorMessage ?? `Het format voor '${label}' is ongeldig`,
								'bmi-isNotEmpty': customErrorMessage ?? `Geef de default waarde voor '${label}' op`,
							},
						},
						changeIndividual: {
							type: 'boolean',
						},
					},
				};

				if (isNotEmpty !== undefined) {
					acc[key].properties!.value['bmi-isNotEmpty'] = isNotEmpty;
				}

				if (oneOf !== undefined) {
					acc[key].properties!.value.oneOf = oneOf;
					acc[key].properties!.value.customFormat = customFormat;
				}

				return acc;
			},
			{} as { [key: string]: CustomJsonSchema },
		),
	};
}
