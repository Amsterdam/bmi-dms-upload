export type MetadataProperty = {
	key: string;
	scope: string;
	type: 'string' | 'date';
	format?: string;
	label: string;
	'bmi-isNotEmpty'?: boolean;
	'bmi-errorMessage'?: string;
	oneOf?: { const: string; title: string }[];
	customFormat?: 'creatable';
};
