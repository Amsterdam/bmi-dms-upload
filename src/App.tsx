import React from 'react';
import { muiTheme } from '@amsterdam/bmi-component-library';
import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles';
import AddDocumentButton from './components/AddDocumentButton/AddDocumentButton';
import theme from './theme';
import { CancelCallbackArg, MetadataDataSubmitCallbackArg } from './components/Wizard/Wizard';

enum documentTypeEnum {
	typeOne = 'Type 1',
	typeTwo = 'Type 2',
}

/* eslint-disable-next-line */
type MetadataExample = {
	documentType: documentTypeEnum;
	documentDescription: string;
	executionDate: string;
};

const App: React.FC = () => {
	const token = 'EXAMPLE';

	return (
		<MUIThemeProvider theme={muiTheme}>
			<ThemeProvider overrides={theme}>
				<GlobalStyle />
				<div>
					<AddDocumentButton<MetadataExample>
						getPostUrl={() => Promise.resolve('/api/example/upload')}
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
							console.log('Optionally track successfully uploaded documents in state', response);
						}}
						onFileRemove={(file) => {}}
						// A custom form component should be rendered here that is specifically geared towards
						// capturing the relevant metadata for the context in which this button is implemented
						metadataForm={<></>}
						onMetadataValidate={async function (data: MetadataExample) {
							// Yup can be leveraged here to validate the metadata that was captured with the form
							console.log('Validate metadata against schema', data);
							return true;
						}}
						onMetadataSubmit={async function (data: MetadataDataSubmitCallbackArg<MetadataExample>) {
							// Dispatch actions/make async calls to persist the metadata
							// This effectively completes the wizard flow
							// If an exception were to be thrown from this callback it is gracefully handled with
							// some generic feedback to the end user
							console.log('Persist metadata; the wizard has been completed and will be closed after this.');
						}}
						onCancel={async function ({ metadata, file }: CancelCallbackArg<MetadataExample>) {
							// Dispatch actions/make async calls to remove the uploaded files from DMS
							// (cancellation is only possible prior to metadata being persisted)
						}}
					/>
				</div>
			</ThemeProvider>
		</MUIThemeProvider>
	);
};

export default App;
