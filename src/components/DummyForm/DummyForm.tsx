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

export default function DummyForm({ handleChange, data }: Props) {
	return (
		<DummyFormStyle>
			<label>DocumentType</label>
			<select onChange={(e) => handleChange(e)} name="documentType" defaultValue={data.documentType}>
				<option>{documentTypeEnum.typeOne}</option>
				<option>{documentTypeEnum.typeTwo}</option>
			</select>
			<TextField
				onChange={(e) => handleChange(e)}
				name="documentDescription"
				label="DocumentOmschrijving"
				defaultValue={data.documentDescription}
			/>
			<TextField
				onChange={(e) => handleChange(e)}
				name="executionDate"
				label="Uitvoeringsdatum"
				defaultValue={data.executionDate}
			/>
		</DummyFormStyle>
	);
}
