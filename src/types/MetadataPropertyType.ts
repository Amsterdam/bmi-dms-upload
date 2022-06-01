export type MetadataProperty = {
	key: string;
	label: string;
	scope: string;
	type: string;
	'bmi-errorMessage'?: string;
	'bmi-isNotEmpty'?: boolean;
	customFormat?: 'creatable' | 'multi-creatable';
	default?: string[];
	format?: string;
	items?: { type: string; enum: string[] };
	minItems?: number;
	oneOf?: { const: string; title: string }[] | OneOfDateType;
	uniqueItems?: boolean;
	options?: { format?: string };
};

export type OneOfDateType = Array<{ maxLength: number } | { format: string }>;
