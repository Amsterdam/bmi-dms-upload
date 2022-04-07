import React, { useEffect, useRef, useState } from 'react';
import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { UISchemaElement } from '@jsonforms/core';
import Single from './features/single/single/Single';
import Bulk from './features/bulk/bulk/Bulk';
import { IBulkField, IDmsUploadSession } from './features/bulk/bulk/model';
import { schema as singleSchema, uischema as singleUischema } from './features/single/single/__stubs__';
import theme from './theme';
import {
	CancelCallbackArg,
	CustomFileLight,
	CustomFileLightOrRejection,
	CustomJsonSchema,
	MetadataDataSubmitCallbackArg,
} from './types';
import * as utils from './features/bulk/bulk/utils';
import { createSchemaFromMetadataProps, createUISchemaFromMetadataProps } from './utils';
import { AppStyles } from './AppStyles';

function App() {
	const mounted = useRef(false);
	const hasFiles = useRef(false);
	const [metadataFields, setMetadataFields] = useState<IBulkField[] | undefined>(undefined);
	const [session, setSession] = useState<IDmsUploadSession | undefined>(undefined);
	const [schema, setSchema] = useState<CustomJsonSchema | undefined>(undefined);
	const [uischema, setUischema] = useState<UISchemaElement | undefined>(undefined);

	async function fetchSession(): Promise<IDmsUploadSession> {
		const response = await fetch(`http://localhost:3000/upload-session`);
		const data = (await response.json()) as IDmsUploadSession;
		return data;
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
		const metadataProperties = utils.convertDmsDynamicFormFieldsToMetadataProperty(session.dynamicFormFields);

		const newSchema = createSchemaFromMetadataProps(metadataProperties);
		setSchema(newSchema);

		const newUischema = createUISchemaFromMetadataProps(metadataProperties);
		setUischema(newUischema);

		const fields = utils.convertDmsDynamicFormFieldsToBulkMetadataFields(session.dynamicFormFields);

		setMetadataFields(fields);
	}, [session]);

	async function getSession() {
		if (session) return session;
		return await fetchSession();
	}

	const asset = {
		code: '1337',
		name: 'some-name',
	};
	const metadataForm = {
		schema,
		uischema,
		data: {},
		renderers: [],
	};

	const onClose = () => console.log(':: onClose');
	const onCancel = async (data: CancelCallbackArg<any>) => console.log(':: onCancel', data); //<MetadataExample>
	const onFileSuccess = (file: CustomFileLight) => console.log(':: onFileSuccess', file);
	const onFileRemove = (file: CustomFileLightOrRejection) => console.log(':: onFileRemove', file);
	const onMetadataSubmit = async (
		data: MetadataDataSubmitCallbackArg<any>, // <MetadataExample>
	) => console.log(':: onMetadataSubmit', data);
	const getPostUrl = async (file: CustomFileLight) => 'http://localhost:3000/files';
	const getHeaders = async () => ({ foo: 'bar' });

	return (
		<MUIThemeProvider theme={muiTheme}>
			<ThemeProvider overrides={theme}>
				<GlobalStyle />

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
							onFileSuccess={onFileSuccess}
							onMetadataSubmit={onMetadataSubmit}
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
							onFileSuccess={onFileSuccess}
							onMetadataSubmit={onMetadataSubmit}
						/>
					</div>
				</AppStyles>
			</ThemeProvider>
		</MUIThemeProvider>
	);
}

export default App;
