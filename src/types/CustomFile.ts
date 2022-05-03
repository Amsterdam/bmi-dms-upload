import { FileRejection } from 'react-dropzone';
import { CustomFile } from '@amsterdam/bmi-component-library';

export type CustomFileLight = Pick<CustomFile, 'name' | 'size' | 'tmpId' | 'type'>
export type CustomFileLightOrRejection = CustomFileLight & FileRejection;
export type MetadataDataSubmitCallbackArg<T> = { metadata: T; file: CustomFileLight };
export type CancelCallbackArg<T> = { file?: CustomFileLight; metadata?: T };
export type SupportedHTTPMethods = 'POST' | 'PUT';
