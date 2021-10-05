//@ts-nocheck
import React from 'react';
import { TextField } from '@amsterdam/asc-ui';
import { DummyFormStyle } from './DummyFormStyles';

enum documentTypeEnum {
	typeOne = 'Type 1',
	typeTwo = 'Type 2',
}

type MetadataExample = {
	documentType: documentTypeEnum;
	documentDescription: string;
	executionDate: string;
};

export default function DummyForm({ handleChange }): React.ReactNode<MetadataExample> {
	return (
		<DummyFormStyle>
			<TextField onChange={(e) => handleChange(e)} name="document-omschrijving" label="DocumentOmschrijving" />
			<TextField onChange={(e) => handleChange(e)} name="uitvoeringsdatum" label="Uitvoeringsdatum" />
		</DummyFormStyle>
	);
}
