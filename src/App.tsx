import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import AddDocumentButton from './components/AddDocumentButton/AddDocumentButton';
import theme from './theme';
import { CancelCallbackArg, MetadataDataSubmitCallbackArg } from './components/Wizard/Wizard';
// import MetadataForm from './components/MetadataForm/MetadataForm';
import schema from './components/MetadataForm/schema.json';
import uiSchema from './components/MetadataForm/uiSchema.json';

type MetadataExample = {
	documentDescription: string;
	executionDate: string;
};

const App: React.FC = () => {
	const token = 'EXAMPLE';
	const basePath = '/base/path';

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
										getPostUrl={() => Promise.resolve('https://reqres.in/api/users')}
										getHeaders={async () => {
											const headers: { [key: string]: string } = {};
											if (token) {
												headers['some-token'] = token;
											}
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
											schema: schema,
											uischema: uiSchema,
											data: {
												documentDescription: '__DOCUMENT_DESCRIPTION__',
											} as Partial<MetadataExample>,
											renderers: [],
										}}
										// onMetadataValidate={async function (data: MetadataExample) {
										// 	// Yup can be leveraged here to validate the metadata that was captured with the form
										// 	console.log(':: onMetadataValidate', data);
										// 	return true;
										// 	// const valid = await validationSchema.isValid(data);
										// 	// console.log('data valid', valid);
										// 	// return valid;
										// }}
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
