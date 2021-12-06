import React from 'react';

import { storiesOf } from '@storybook/react';
import WizardFooter from './WizardFooter';

storiesOf('WizardFooter', module)
	.add('Default', () => <WizardFooter />)
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
			cancel={{ visible: true, onClick: undefined, label: '❌' }}
			previous={{ visible: true, onClick: undefined, label: '⬅️' }}
			next={{ visible: true, disabled: true, onClick: undefined, label: '➡️' }}
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
			cancel={{ visible: true, onClick: undefined, label: '❌' }}
			save={{ visible: true, onClick: undefined, label: '➡️' }}
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
	.add('Previous and Save (custom labels)', () => (
		<WizardFooter
			previous={{ visible: true, onClick: undefined, label: '⬅️' }}
			next={{ visible: true, onClick: undefined, label: '⏺' }}
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
			next={{ visible: true, label: '➡️', onClick: undefined }}
			save={{ visible: true, label: '⏺', onClick: undefined }}
		/>
	));
