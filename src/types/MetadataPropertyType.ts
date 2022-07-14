export type MetadataProperty = {
	key: string;
	label: string;
	scope: string;
	type: string;
	'bmi-errorMessage'?: string;
	'bmi-isNotEmpty'?: boolean;
	customFormat?: 'creatable' | 'creatable-array' | 'multi-creatable';
	default?: string[];
	format?: string;
	items?: { type: string; enum: string[] };
	minItems?: number;
	oneOf?: { const: string; title: string }[] | OneOfDateType;
	options?: { format?: string };
	uniqueItems?: boolean;
};

export type OneOfDateType = Array<{ maxLength: number } | { format: string }>;
