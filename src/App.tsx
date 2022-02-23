import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import AddDocumentButton from './features/single-file/components/AddDocumentButton/AddDocumentButton';
import theme from './theme';
import { CancelCallbackArg, CustomFileLight, MetadataDataSubmitCallbackArg } from './types';
import { schema, uischema } from './components/MetadataForm/__stubs__';
import BulkUploadButton from './features/bulk/components/BulkUploadButton/BulkUploadButton';

import { useEffect } from 'react';

type MetadataExample = {
	documentDescription: string;
	executionDate: string;
};

const basePath = '/base/path';

const App: React.FC = () => {
	const [sessionId, setSessionId] = useState<any | undefined>(undefined);

	useEffect(() => {
		const doGetSessionId = async () => {
			const result = await getSessionId();
			setSessionId(result)
		}

		doGetSessionId();
	}, [])

	async function getSessionId() {
		if (sessionId) return sessionId;

		const formdata = new FormData();
		formdata.append('dmsAsset', '8');
		formdata.append('dmsCategoryTheme', '9');

		const response = await fetch('https://acc.bmidms.amsterdam.nl/api/v1.0/upload-session', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				"x-api-token": "<token>"
			},
			body: new URLSearchParams(formdata as any)
		})

		const id = await response.json()

		return id;
	}

	return (
		<MUIThemeProvider theme={muiTheme}>
			<ThemeProvider overrides={theme}>
				<GlobalStyle />
				<BrowserRouter>
					<Switch>
						<Route
							path={basePath}
							component={() => (
								<div>
									<AddDocumentButton<MetadataExample>
										asset={{
											code: 'BRU0004',
											name: 'BRU0004 Heibrug',
										}}
										getPostUrl={(file: CustomFileLight) => {
											console.log(':: getPostUrl', file);
											return Promise.resolve('https://reqres.in/api/users');
										}}
										getHeaders={async () => {
											const headers: { [key: string]: string } = {};
											headers['some-token'] = '__TOKEN__';
											return Promise.resolve(headers);
										}}
										onFileSuccess={(file) => {
											if (typeof file.response !== 'string')
												throw new Error('BUG: no response provided to onFileSuccess callback');

											const response = JSON.parse(file.response);
											console.log(':: onFileSuccess', file);
											console.log('Optionally track successfully uploaded documents in state', response);
										}}
										onFileRemove={(file) => {
											console.log(':: fileRemove', file);
										}}
										// A custom form component should be rendered here that is specifically geared towards
										// capturing the relevant metadata for the context in which this button is implemented
										metadataForm={{
											schema,
											uischema,
											data: {
												documentDescription: '__DOCUMENT_DESCRIPTION__',
											} as Partial<MetadataExample>,
											renderers: [],
										}}
										onMetadataSubmit={async function (data: MetadataDataSubmitCallbackArg<MetadataExample>) {
											// Dispatch actions/make async calls to persist the metadata
											// This effectively completes the wizard flow
											// If an exception were to be thrown from this callback it is gracefully handled with
											// some generic feedback to the end user
											console.log(
												'Persist metadata; the wizard has been completed and will be closed after this.',
												data,
											);
										}}
										onCancel={async function (data: CancelCallbackArg<MetadataExample>) {
											// Dispatch actions/make async calls to remove the uploaded files from DMS
											// (cancellation is only possible prior to metadata being persisted)
											console.log(':: onCancel', data);
											// return Promise.resolve();
										}}
										basePath={basePath}
									/>
									<hr />
									<BulkUploadButton<MetadataExample>
										asset={{
											code: '1337',
											name: 'some-name',
										}}
										metadataForm={{
											schema,
											uischema,
											data: {
												documentDescription: '__DOCUMENT_DESCRIPTION__',
											} as Partial<MetadataExample>,
											renderers: [],
										}}
										getDocumentViewUrl={() => {
											console.log(':: getDocumentViewUrl');
											return Promise.resolve('some-document-url');
										}}
										getPostUrl={async (file: CustomFileLight) => {
											const sessionObj = await getSessionId();
											console.log(':: getPostUrl: sessionId', sessionObj);
											console.log(':: getPostUrl: file', file);
											return Promise.resolve('https://reqres.in/api/users');
										}}
										getHeaders={async () => {
											const headers: { [key: string]: string } = {};
											headers['some-token'] = '__TOKEN__';
											console.log(':: getHeaders', headers);
											return Promise.resolve(headers);
										}}
										onCancel={async function (data: CancelCallbackArg<MetadataExample>) {
											console.log(':: onCancel', data);
										}}
										onFileRemove={(file) => {
											console.log(':: fileRemove', file);
										}}
										buttonText="Bestanden toevoegen"
										basePath={basePath}
									/>
								</div>
							)}
						/>
						<Redirect to={basePath} />
					</Switch>
				</BrowserRouter>
			</ThemeProvider>
		</MUIThemeProvider>
	);
};

export default App;
