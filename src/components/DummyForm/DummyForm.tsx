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

type Props = {
	handleChange: (e: any) => void;
	data: MetadataExample;
};

export default function DummyForm({ handleChange }: Props) {
	return (
		<DummyFormStyle>
			<TextField onChange={(e) => handleChange(e)} name="documentDescription" label="DocumentOmschrijving" />
			<TextField onChange={(e) => handleChange(e)} name="executionDate" label="Uitvoeringsdatum" />
		</DummyFormStyle>
	);
}
