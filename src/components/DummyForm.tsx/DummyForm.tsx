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

export default function DummyForm({ handleChange, data }): React.ReactNode<MetadataExample> {
	return (
		<DummyFormStyle>
			<TextField
				onChange={(e) => handleChange(e)}
				name="documentDescription"
				label="DocumentOmschrijving"
				defaultValue={data.documentDescription}
			/>
			<TextField
				onChange={(e) => handleChange(e)}
				name="expirationDate"
				label="Uitvoeringsdatum"
				defaultValue={data.expirationDate}
			/>
		</DummyFormStyle>
	);
}
