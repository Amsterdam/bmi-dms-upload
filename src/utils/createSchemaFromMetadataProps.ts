import { CustomJsonSchema, MetadataProperty } from '../types';

export default function createSchemaFromMetadataProps(metadataProperties: MetadataProperty[]): CustomJsonSchema {
	return {
		type: 'object',
		properties: metadataProperties.reduce(
			(
				acc,
				{ key, scope, type, format, 'bmi-isNotEmpty': isNotEmpty, 'bmi-errorMessage': customErrorMessage, label },
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
							'bmi-isNotEmpty': isNotEmpty,
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
				return acc;
			},
			{} as { [key: string]: CustomJsonSchema },
		),
	};
}
