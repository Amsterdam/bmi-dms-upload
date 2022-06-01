export type MetadataProperty = {
	key: string;
	scope: string;
	type: string;
	format?: string;
	label: string;
	'bmi-isNotEmpty'?: boolean;
	'bmi-errorMessage'?: string;
	oneOf?: { const: string; title: string }[] | OneOfDateType;
	customFormat?: 'creatable';
	options?: { format?: string };
};

export type OneOfDateType = Array<{ maxLength: number } | { format: string }>;
