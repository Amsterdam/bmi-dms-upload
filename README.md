# DMS Upload

A document upload flow that can be implemented in any BMI React application. Documents are stored in DMS. Metadata can be added in the flow.

## Development

To bootstrap the app in a static frontend served by webpack devserver run `npm run serve`.
You can also use storybook for the isolated development of components.

### NPM link

The solution to working with packages for development locally is to rely on `npm link`.
As an example, this package has `@bmi/component-library` as a dependency. To make changes in the `@bmi/component-library` package and to have these immediately reflected in your development workflow, follow these steps:

* Checkout `@bmi/dms-upload` at `/path/to/repos/dms-upload`
* Checkout `@bmi/component-library` at `/path/to/repos/component-library`
* `cd /path/to/repos/component-library && npm link`
* `cd /path/to/repos/dms-upload && npm link @bmi/component-library`

This will create a symlink at `/path/to/repos/dms-upload/node_modules/@bmi/component-library` which points to your 
clone of the `@bmi/component-library` package.

Now all you need to do is run typescript compilation in watch mode:
`cd /path/to/repos/component-library && npm run build:ts:es:watch`

IMPORTANT: if you use NVM, it is crucial that both `npm link` commands are executed with the same node version.

## Publish

See this `./Jenkinsfile` and [this Jenkins pipeline](https://ci.secure.amsterdam.nl/job/BMI/job/dms-upload/)

## Unit tests

`npm run test`

## Storybook

To boot storybook, run the following command: `npm run storybook`. It should open your default browser at 
`http://localhost:6006/`.  
