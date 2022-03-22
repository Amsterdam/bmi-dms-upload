import React, { useEffect, useRef, useState } from 'react';
import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import { UISchemaElement } from '@jsonforms/core';

import CustomProvider from './features/CustomProvider';
import Single from './features/singleNew/single/Single';
import Bulk from './features/bulkNew/bulk/Bulk';
import { IBulkField, IDmsUploadSession } from './features/bulkNew/bulk/model';
import { schema as singleSchema, uischema as singleUischema } from './features/singleNew/single/__stubs__';
import theme from './theme';
import {
	CancelCallbackArg,
	CustomFileLight,
	CustomFileLightOrRejection,
	CustomJsonSchema,
	MetadataDataSubmitCallbackArg,
	MetadataExample,
} from './types';
import * as utils from './features/bulkNew/bulk/utils';
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
		const formdata = new FormData();
		formdata.append('dmsAsset', '8');
		formdata.append('dmsCategoryTheme', '9');

		const response = await fetch('https://acc.bmidms.amsterdam.nl/api/v1.0/upload-session', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'x-api-token': 'sQRNkdEC8JSXF5',
			},
			body: new URLSearchParams(formdata as any),
		});

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
	const onCancel = async (data: CancelCallbackArg<MetadataExample>) => console.log(':: onCancel', data);
	const onFileSuccess = (file: CustomFileLight) => console.log(':: onFileSuccess', file);
	const onFileRemove = (file: CustomFileLightOrRejection) => console.log(':: onFileRemove', file);
	const onMetadataSubmit = async (data: MetadataDataSubmitCallbackArg<MetadataExample>) =>
		console.log(':: onMetadataSubmit', data);
	const getPostUrl = async (file: CustomFileLight) => 'http://localhost:3000/files';
	const getHeaders = async () => ({ foo: 'bar' });

	return (
		<MUIThemeProvider theme={muiTheme}>
			<ThemeProvider overrides={theme}>
				<GlobalStyle />
				<CustomProvider>
					<AppStyles>
						<div>
							<Single
								asset={asset}
								basePath="/"
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
								basePath="/"
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
				</CustomProvider>
			</ThemeProvider>
		</MUIThemeProvider>
	);
}

export default App;
