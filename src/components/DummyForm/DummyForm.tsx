import React from 'react';
import { TextField } from '@amsterdam/asc-ui';
import { DummyFormStyle } from './DummyFormStyles';

export enum documentTypeEnum {
	typeOne = 'Type 1',
	typeTwo = 'Type 2',
}

export type MetadataExample = {
	documentType: documentTypeEnum;
	documentDescription: string;
	executionDate: string;
};

type Props = {
	handleChange: (e: any) => void;
	data: MetadataExample;
};

export const DummyForm = ({ handleChange, data }: Props): JSX.Element => (
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
