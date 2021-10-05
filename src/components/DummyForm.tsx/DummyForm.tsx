//@ts-nocheck
import React from 'react';
import { TextField } from '@amsterdam/asc-ui';
import { DummyFormStyle } from './DummyFormStyles';

export default function DummyForm({ handleChange }): React.ReactNode {
	return (
		<DummyFormStyle>
			<TextField onChange={(e) => handleChange(e)} name="document-omschrijving" label="DocumentOmschrijving" />
			<TextField onChange={(e) => handleChange(e)} name="uitvoeringsdatum" label="Uitvoeringsdatum" />
		</DummyFormStyle>
	);
}
