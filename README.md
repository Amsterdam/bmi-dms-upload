# DMS Upload

A document upload flow that can be implemented in any BMI React application. Documents are stored in DMS. Metadata can be added in the flow.

## Installation

```shell
npm install --save @amsterdam/bmi-dms-upload
```

## Implementation

```typescript jsx
import { AddDocumentButton } from '@amsterdam/bmi-dms-upload';

function MyComponent() {
	return (
		<AddDocumentButton<MetadataExample>
			// Dynamically construct the URL for the file upload POST
			getPostUrl={(file) => Promise.resolve('/api/example/upload')}
			// Dynamically inject headers for the file upload POST
			getHeaders={async () => {
				const headers: { [key: string]: string } = {};
				if (token) {
					headers['some-token'] = token;
				}
				return Promise.resolve(headers);
			}}
			// Do something when a file is uploaded successfully
			onFileSuccess={(file) => {
				if (typeof file.response !== 'string') throw new Error('BUG: no response provided to onFileSuccess callback');

				const response = JSON.parse(file.response);
				console.log('Optionally track successfully uploaded documents in state', response);
			}}
			// Do something when a file is being removed
			onFileRemove={(file) => {}}
			// A custom form component should be rendered here that is specifically geared towards
			// capturing the relevant metadata for the context in which this button is implemented
			metadataForm={<></>}
			// Yup can be leveraged here to validate the metadata that was captured with the form
			onMetadataValidate={async function (data: MetadataExample) {
				console.log('Validate metadata against schema', data);
				return true;
			}}
			// Dispatch actions/make async calls to persist the metadata
			// This effectively completes the wizard flow
			// If an exception were to be thrown from this callback it is gracefully handled with
			// some generic feedback to the end user
			onMetadataSubmit={async function (data: MetadataDataSubmitCallbackArg<MetadataExample>) {
				console.log('Persist metadata; the wizard has been completed and will be closed after this.');
			}}
			// Dispatch actions/make async calls to remove the uploaded files from DMS
			// (cancellation is only possible prior to metadata being persisted)
			onCancel={async function ({ metadata, file }: CancelCallbackArg<MetadataExample>) {
				console.log('Remove previously uploaded files and reset state.');
			}}
		/>
	);
}
```

**IMPORTANT**: It is expected that you have already implemented [@amsterdam/asc-ui](https://www.npmjs.com/package/@amsterdam/asc-ui) or
[@amsterdam/bmi-component-library](https://www.npmjs.com/package/@amsterdam/asc-ui). This package is built with styled-components and depends on the ThemeProvider
from [@amsterdam/asc-ui](https://www.npmjs.com/package/@amsterdam/asc-ui).

## Development

To bootstrap the app in a static frontend served by webpack devserver run `npm run serve` and `npm run serve:mock-api`.
You can also use storybook for the isolated development of components.

### NPM link

The solution to working with packages for development locally is to rely on `npm link`.
As an example, this package has `@amsterdam/bmi-component-library` as a dependency. To make changes in the
`@amsterdam/bmi-component-library` package and to have these immediately reflected in your development workflow, follow
these steps:

- Checkout `@amsterdam/bmi-dms-upload` at `/path/to/repos/bmi-dms-upload`
- Checkout `@amsterdam/bmi-component-library` at `/path/to/repos/bmi-component-library`
- `cd /path/to/repos/bmi-component-library && npm link`
- `cd /path/to/repos/bmi-dms-upload && npm link @amsterdam/bmi-component-library`

This will create a symlink at `/path/to/repos/dms-upload/node_modules/@amsterdam/bmi-component-library` which points to
your clone of the `@amsterdam/bmi-component-library` package.

Now all you need to do is run typescript compilation in watch mode:
`cd /path/to/repos/bmi-component-library && npm run build:ts:es:watch`

IMPORTANT: if you use NVM, it is crucial that both `npm link` commands are executed with the same node version.

## Publish

TODO

## Unit tests

`npm run test`

## Storybook

To boot storybook, run the following command: `npm run storybook`. It should open your default browser at
`http://localhost:6006/`.
