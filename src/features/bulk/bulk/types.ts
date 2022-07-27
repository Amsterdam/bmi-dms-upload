import { Props as SingleProps } from '../../single/single/types';
import { IBulkField, IBulkFile } from './store/model';
import { CustomFileLight } from '../../../types';

export type TGetDocumentViewUrl = (id: string) => Promise<string>;

export interface Props<T> extends Omit<SingleProps<T>, 'onMetadataSubmit'> {
	onMetadataSubmit: (data: IBulkFile[]) => Promise<void>;
	getDocumentViewUrl: TGetDocumentViewUrl;
	metadataFields?: IBulkField[];
	onFileSuccess: (file: CustomFileLight) => Promise<IBulkFile>;
}
