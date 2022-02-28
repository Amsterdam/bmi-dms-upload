import React, { ComponentProps } from 'react';
import Form from '../Form/Form';
import MetadataColumnHeaders from '../MetadataColumnHeaders/MetadataColumnHeaders';
import BulkMetadataFormStyles from './BulkMetadataFormStyles';
import { JsonForms } from '@jsonforms/react';
import { OnChangeCallback } from '../../types';

export type Props = Omit<ComponentProps<typeof JsonForms>, 'onChange'> & {
	onChange: OnChangeCallback;
};

const BulkMetadataForm: React.FC<Props> = ({ schema, uischema, renderers, data = {}, cells, onChange }) => {
	return (
		<BulkMetadataFormStyles data-testid={'bulk-metadata-form'}>
			<MetadataColumnHeaders
				columns={[
					{
						header: 'Metadata veld',
						width: 34,
					},
					{
						header: 'Default waarde',
						width: 34,
					},
					{
						header: 'Individueel wijzigen',
						width: 32,
						align: 'center',
					},
				]}
			/>
			<Form schema={schema} uischema={uischema} data={data} renderers={renderers} cells={cells} onChange={onChange} />
		</BulkMetadataFormStyles>
	);
};

export default BulkMetadataForm;
