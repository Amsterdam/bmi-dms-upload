import React from 'react';

import { storiesOf } from '@storybook/react';
import WizardFooter from './WizardFooter';

storiesOf('WizardFooter', module)
	.add('Cancel, Previous and Next', () => (
		<WizardFooter
			cancel={{ visible: true, onClick: undefined }}
			previous={{ visible: true, onClick: undefined }}
			next={{ visible: true, onClick: undefined }}
		/>
	))
	.add('Cancel, Previous and Next (disabled)', () => (
		<WizardFooter
			cancel={{ visible: true, onClick: undefined }}
			previous={{ visible: true, onClick: undefined }}
			next={{ visible: true, disabled: true, onClick: undefined }}
		/>
	))
	.add('Cancel, Previous and Next (custom labels', () => (
		<WizardFooter
			cancel={{ visible: true, onClick: undefined, label: 'Cancel' }}
			previous={{ visible: true, onClick: undefined, label: 'Previous' }}
			next={{ visible: true, disabled: true, onClick: undefined, label: 'Next' }}
		/>
	))
	.add('Cancel and Save', () => (
		<WizardFooter cancel={{ visible: true, onClick: undefined }} save={{ visible: true, onClick: undefined }} />
	))
	.add('Cancel and Save (disabled)', () => (
		<WizardFooter
			cancel={{ visible: true, onClick: undefined }}
			save={{ visible: true, disabled: true, onClick: undefined }}
		/>
	))
	.add('Cancel and Save (custom labels)', () => (
		<WizardFooter
			cancel={{ visible: true, onClick: undefined, label: 'Cancel' }}
			save={{ visible: true, onClick: undefined, label: 'Save' }}
		/>
	))
	.add('Previous and Next', () => (
		<WizardFooter previous={{ visible: true, onClick: undefined }} next={{ visible: true, onClick: undefined }} />
	))
	.add('Previous and Next (disabled)', () => (
		<WizardFooter
			previous={{ visible: true, onClick: undefined }}
			next={{ visible: true, disabled: true, onClick: undefined }}
		/>
	))
	.add('Previous and Next (custom labels)', () => (
		<WizardFooter
			previous={{ visible: true, onClick: undefined, label: 'Previous' }}
			next={{ visible: true, onClick: undefined, label: 'Next' }}
		/>
	))
	.add('Next and Save', () => (
		<WizardFooter next={{ visible: true, onClick: undefined }} save={{ visible: true, onClick: undefined }} />
	))
	.add('Next and Save (disabled)', () => (
		<WizardFooter
			next={{ visible: true, disabled: true, onClick: undefined }}
			save={{ visible: true, disabled: true, onClick: undefined }}
		/>
	))
	.add('Next and Save (custom labels)', () => (
		<WizardFooter
			next={{ visible: true, label: 'Next', onClick: undefined }}
			save={{ visible: true, label: 'Save', onClick: undefined }}
		/>
	));
