# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.1-alpha.8](https://github.com/Amsterdam/bmi-dms-upload/compare/v0.0.1-alpha.7...v0.0.1-alpha.8) (2021-11-24)


### Bug Fixes

* **step1:** file upload should only accept a single file ([53f3bb8](https://github.com/Amsterdam/bmi-dms-upload/commit/53f3bb812a9cfbebf90836357c437e910f47284e))
* **wizard:** bind cancel procedure to close button in modal header ([17c9e04](https://github.com/Amsterdam/bmi-dms-upload/commit/17c9e04814be0b3202a8344f8d11f20b52af8d04))

### [0.0.1-alpha.7](https://github.com/Amsterdam/bmi-dms-upload/compare/v0.0.1-alpha.6...v0.0.1-alpha.7) (2021-11-22)


### Features

* **types:** exporting json schema types ([09d38ed](https://github.com/Amsterdam/bmi-dms-upload/commit/09d38ed9fcaaed4743db2e3b9b84989fb1e76286))

### [0.0.1-alpha.6](https://github.com/Amsterdam/bmi-dms-upload/compare/v0.0.1-alpha.5...v0.0.1-alpha.6) (2021-11-18)


### Features

* **metadatacolumnheaders:** added MetadataColumnHeaders component + tests + storybook entry ([628b86b](https://github.com/Amsterdam/bmi-dms-upload/commit/628b86b465a5a2005007ac3027e6bca0de7b6639))
* **validation:** wip commit for validation logic with latest alpha release of jsonforms ([d78e55e](https://github.com/Amsterdam/bmi-dms-upload/commit/d78e55e08e50e9498516bf74afbfcbcf8e310f01))


### Bug Fixes

* **tsconfig:** ignoring **/__mocks/* for TS build purposes ([fdc3383](https://github.com/Amsterdam/bmi-dms-upload/commit/fdc33833887fc3ea225427f5ae32f1d8293df91b))
* **tsconfig:** reverted esModuleInterop back to true while fixing source of the problem ([eeb3acd](https://github.com/Amsterdam/bmi-dms-upload/commit/eeb3acd3e881a56564e25730b3485d943dfc2fa4))

### [0.0.1-alpha.5](https://github.com/Amsterdam/bmi-dms-upload/compare/v0.0.1-alpha.4...v0.0.1-alpha.5) (2021-10-27)


### Features

* **fileupload:** http method for file upload can now be configured ([a7bd9c8](https://github.com/Amsterdam/bmi-dms-upload/commit/a7bd9c8bb44e8ff0dc568a84e77fe15b2f2187e7))

### [0.0.1-alpha.4](https://github.com/Amsterdam/bmi-dms-upload/compare/v0.0.1-alpha.3...v0.0.1-alpha.4) (2021-10-25)


### Features

* **dummyform:** created dummyform to use for the metadata in step2 ([095bb19](https://github.com/Amsterdam/bmi-dms-upload/commit/095bb19f3440630d420abdb39d6163d3c10499cc))
* **multiple tests:** updated imports in tests and update provider function calls ([c32ceae](https://github.com/Amsterdam/bmi-dms-upload/commit/c32ceaecc32bfa1e7a50d1f37f10fb6a7a398744))
* **step1:** connect with redux Toolkit and remove old redux files ([0b9e142](https://github.com/Amsterdam/bmi-dms-upload/commit/0b9e14261a8b91231b31508bd9ab051e425a8e5c))
* **step1:** implementation upload component and upgraded component-library version ([fc6d0e2](https://github.com/Amsterdam/bmi-dms-upload/commit/fc6d0e29a4c23a8fa8cffcd245c92f92a67835d9))
* **step1:** style step 1 ([b531e07](https://github.com/Amsterdam/bmi-dms-upload/commit/b531e0744b7eb2281db624c2004cd665490fdddf))
* **step2:** connect step 3 with redux toolkit ([8d37037](https://github.com/Amsterdam/bmi-dms-upload/commit/8d3703741bbb60b4fd9eaa859bf90bf663e5eb6a))
* **step2:** prefill form with defaultValue ([f498422](https://github.com/Amsterdam/bmi-dms-upload/commit/f4984226cec0f700310559b20ef93ac6282cf1f7))
* **step2:** step 2 in wizard with a form prop to add generic metadata to file ([39178e2](https://github.com/Amsterdam/bmi-dms-upload/commit/39178e274440596298b8f2c845bf94544734da3a))
* **sub-routing:** added concept of sub-routing where all wizard routes expand on a base path ([f132ee9](https://github.com/Amsterdam/bmi-dms-upload/commit/f132ee916718e16a1cd8369392b670ba39e03b1f))
* **withproviders:** add browserrouter to provider ([030e949](https://github.com/Amsterdam/bmi-dms-upload/commit/030e949662640530a126aeca72fefebe3ea4c58c))
* **withproviders:** initialstate as argument to pass into Providerstore ([5189feb](https://github.com/Amsterdam/bmi-dms-upload/commit/5189febd971ee968937e7681e2dd3fe467c7a615))
* **wizard:** only show 'volgende' button when there is a file in the list ([ed3ad61](https://github.com/Amsterdam/bmi-dms-upload/commit/ed3ad610b32e12e1d60c8a358663fcb8ad64b92b))
* **wizard:** reset state when cancelling or submitting ([7b2d4d7](https://github.com/Amsterdam/bmi-dms-upload/commit/7b2d4d766043180374a24bfdd4ffab3aecf19caa))
* **wizard:** routing ([9a2a2f1](https://github.com/Amsterdam/bmi-dms-upload/commit/9a2a2f1dec14095b273134abc96592172a7443ec))
* **wizard:** submit and validate file and metadata ([0311c0a](https://github.com/Amsterdam/bmi-dms-upload/commit/0311c0a0ac356d5ca06918aa437be28d08c9d4ab))
* **wizard:** validation dummyform, remove file from store, use storedFiles prop ([b4a40df](https://github.com/Amsterdam/bmi-dms-upload/commit/b4a40dfd92bd2c059c61bb532c68e824322d2756))
* **wizard and step1:** first test and renderWithProviders ([4cf561f](https://github.com/Amsterdam/bmi-dms-upload/commit/4cf561f17827abb95dabc369a3d68d0e9dab69e5))
* dummyform ([198bf2d](https://github.com/Amsterdam/bmi-dms-upload/commit/198bf2dd008ede73156b15397b607129e8624f38))


### Bug Fixes

* **wizard:** import for WizardStyles contained a type ([c590ade](https://github.com/Amsterdam/bmi-dms-upload/commit/c590ade900c9d569ac47049a97c6958008371616))

### [0.0.1-alpha.3](https://github.com/Amsterdam/bmi-dms-upload/compare/v0.0.1-alpha.2...v0.0.1-alpha.3) (2021-10-07)


### Bug Fixes

* **tsconfig:** tsconfig paths should not be used for imports as NodeJS has no knowledge of them ([3e18f43](https://github.com/Amsterdam/bmi-dms-upload/commit/3e18f43277bb143af665d1e819123774bc20d1f5))

### [0.0.1-alpha.2](https://github.com/Amsterdam/bmi-dms-upload/compare/v0.0.1-alpha.1...v0.0.1-alpha.2) (2021-09-23)


### Features

* **adddocumentbutton:** exporting Props interface in an attempt to get inferred prop types ([6eba301](https://github.com/Amsterdam/bmi-dms-upload/commit/6eba301e35dfc3e780cf0c3ee13a92c0bc0b388d))

### [0.0.1-alpha.1](https://github.com/Amsterdam/bmi-dms-upload/compare/v0.0.1-alpha.0...v0.0.1-alpha.1) (2021-09-23)


### Features

* **adddocumentbutton:** moved generic metadata type to props interface instead of individual props ([e8c5fe0](https://github.com/Amsterdam/bmi-dms-upload/commit/e8c5fe0b343c9ce0853ea672706609e04f131e00))

### [0.0.1-alpha.0](https://github.com/Amsterdam/bmi-dms-upload/compare/v0.0.1-alpha...v0.0.1-alpha.0) (2021-09-22)
