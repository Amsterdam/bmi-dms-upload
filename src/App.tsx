import React, { useCallback, useEffect, useRef, useState } from 'react';
import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { UISchemaElement } from '@jsonforms/core';

import Single from './features/single/single/Single';
import { schema as singleSchema, uischema as singleUischema } from './features/single/single/__stubs__';
import Bulk from './features/bulk/bulk/Bulk';
import { IBulkField, IBulkState } from './features/bulk/bulk/store/model';
import GlobalAppStyle from './GlobalStyle';

import {
	CancelCallbackArg,
	CustomFileLight,
	CustomFileLightOrRejection,
	CustomJsonSchema,
	MetadataDataSubmitCallbackArg,
} from './types';
import { createSchemaFromMetadataProps, createUISchemaFromMetadataProps } from './utils';
import {
	convertDmsDynamicFormFieldsToBulkMetadataFields,
	convertDmsDynamicFormFieldsToMetadataProperty,
	IDmsUploadSession,
} from './dms-integration';
import { AppStyles } from './AppStyles';
import theme from './theme';

const asset = {
	code: '1337',
	name: 'some-name',
};

function App() {
	const mounted = useRef(false);
	const hasFiles = useRef(false);
	const [metadataFields, setMetadataFields] = useState<IBulkField[] | undefined>(undefined);
	const [session, setSession] = useState<IDmsUploadSession | undefined>(undefined);
	const [schema, setSchema] = useState<CustomJsonSchema | undefined>(undefined);
	const [uischema, setUischema] = useState<UISchemaElement | undefined>(undefined);

	async function fetchSession(): Promise<IDmsUploadSession> {
		const response = await fetch(`http://localhost:3000/upload-session`);
		return (await response.json()) as IDmsUploadSession;
	}

	useEffect(() => {
		mounted.current = true;

		return () => {
			mounted.current = false;
		};
	}, []);

	useEffect(() => {
		const doGetSession = async () => {
			if (!hasFiles) return false;
			setSession(await getSession());
		};

		doGetSession();
	}, [hasFiles]);

	useEffect(() => {
		if (!session) return;
		const metadataProperties = convertDmsDynamicFormFieldsToMetadataProperty(session.dynamicFormFields);
		setSchema(createSchemaFromMetadataProps(metadataProperties));
		setUischema(createUISchemaFromMetadataProps(metadataProperties));
		setMetadataFields(convertDmsDynamicFormFieldsToBulkMetadataFields(session.dynamicFormFields));
	}, [session]);

	async function getSession() {
		return session ? session : await fetchSession();
	}

	const metadataForm = {
		schema,
		uischema,
		data: {},
		renderers: [],
	};

	const onClose = useCallback(() => console.log(':: onClose'), []);
	const onCancel = useCallback(async (data: CancelCallbackArg<any>) => console.log(':: onCancel', data), []); //<MetadataExample>
	const onFileSuccessBulk = useCallback(async (file: CustomFileLight) => {
		console.log(':: onFileSuccessBulk', file);
		return {
			id: `new-${file.tmpId}`,
			uploadedFile: file,
		};
	}, []);

	const onFileSuccessSingle = useCallback((file: CustomFileLight) => console.log(':: onFileSuccess', file), []);
	const onFileRemove = useCallback((file: CustomFileLightOrRejection) => console.log(':: onFileRemove', file), []);
	const onMetadataSubmit = useCallback(
		async (
			data: MetadataDataSubmitCallbackArg<any>, // <MetadataExample>
		) => console.log(':: onMetadataSubmit', data),
		[],
	);
	const onMetadataSubmitBulk = useCallback(async (data: IBulkState) => console.log(':: onMetadataSubmit', data), []);
	const getPostUrl = useCallback(async (file: CustomFileLight) => 'http://localhost:3000/files', []);
	const getHeaders = useCallback(async () => ({ foo: 'bar' }), []);
	const getDocumentViewUrl = useCallback(async (id: string): Promise<string> => {
		console.log(':: getDocumentViewUrl', id);
		return `/some-fake-url-${id}`;
	}, []);

	return (
		<MUIThemeProvider theme={muiTheme}>
			<ThemeProvider overrides={theme}>
				<GlobalStyle />
				<GlobalAppStyle />
				<AppStyles>
					<div>
						<Single
							asset={asset}
							basePath="/documents/29/bulk-metadata"
							getHeaders={getHeaders}
							getPostUrl={getPostUrl}
							metadataForm={{
								...metadataForm,
								uischema: singleUischema,
								schema: singleSchema,
							}}
							onCancel={onCancel}
							onClose={onClose}
							onFileRemove={onFileRemove}
							onFileSuccess={onFileSuccessSingle}
							onMetadataSubmit={onMetadataSubmit}
							uploadHTTPMethod={'POST'}
						/>
					</div>
					<div>
						<Bulk
							asset={asset}
							basePath="/documents/29/bulk-metadata"
							getHeaders={getHeaders}
							getPostUrl={getPostUrl}
							metadataFields={metadataFields}
							metadataForm={metadataForm}
							onCancel={onCancel}
							onClose={onClose}
							onFileRemove={onFileRemove}
							onFileSuccess={onFileSuccessBulk}
							onMetadataSubmit={onMetadataSubmitBulk}
							getDocumentViewUrl={getDocumentViewUrl}
							uploadHTTPMethod={'POST'}
						/>
					</div>
				</AppStyles>
			</ThemeProvider>
		</MUIThemeProvider>
	);
}

export default App;
