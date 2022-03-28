import { FileUploadProps } from "@amsterdam/bmi-component-library";
import { CustomFileLight, CustomFileLightOrRejection, SupportedHTTPMethods } from "../../../types";

export interface Props {
	getPostUrl: FileUploadProps['getPostUrl'];
	getHeaders: FileUploadProps['getHeaders'];
	onFileSuccess?: (file: CustomFileLight) => void;
	onFileRemove?: (file: CustomFileLightOrRejection) => void;
	storedFiles?: FileUploadProps['storedFiles'];
	httpMethod?: SupportedHTTPMethods;
	placeholder?: string;
	maxFiles?: number;
}
