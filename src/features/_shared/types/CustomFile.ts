import { FileRejection } from 'react-dropzone';
import { CustomFile } from '@amsterdam/bmi-component-library';

export type CustomFileLight = Pick<CustomFile, 'name' | 'size' | 'tmpId' | 'type' | 'response'>

export type CustomFileLightOrRejection = CustomFileLight & FileRejection;
