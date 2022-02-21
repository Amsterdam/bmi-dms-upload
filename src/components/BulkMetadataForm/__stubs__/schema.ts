import { CustomJsonSchema } from '../../../types';
import { metadataProperties } from './metadataProperties';
import createSchemaFromMetadataProps from '../../../utils/createSchemaFromMetadataProps';

export const schema: CustomJsonSchema = createSchemaFromMetadataProps(metadataProperties);
