import type { Meta, StoryObj } from '@storybook/react';
import WizardFooter from './WizardFooter';

const meta: Meta<typeof WizardFooter> = {
	title: 'WizardFooter',
	component: WizardFooter,
};

export default meta;

type Story = StoryObj<typeof WizardFooter>;

export const CancelPreviousNext: Story = {
	args: {
		cancel: { visible: true },
		previous: { visible: true },
		next: { visible: true },
	},
};

export const CancelPreviousNextDisabled: Story = {
	args: {
		cancel: { visible: true },
		previous: { visible: true },
		next: { visible: true, disabled: true },
	},
};

export const CancelPreviousNextCustomLabels: Story = {
	args: {
		cancel: { visible: true, label: 'Cancel' },
		previous: { visible: true, label: 'Previous' },
		next: { visible: true, disabled: true, label: 'Next' },
	},
};

export const CancelSave: Story = {
	args: {
		cancel: { visible: true },
		save: { visible: true },
	},
};

export const CancelSaveDisabled: Story = {
	args: {
		cancel: { visible: true },
		save: { visible: true, disabled: true },
	},
};

export const CancelSaveCustomLabels: Story = {
	args: {
		cancel: { visible: true, label: 'Cancel' },
		save: { visible: true, label: 'Save' },
	},
};

export const PreviousNext: Story = {
	args: {
		previous: { visible: true },
		next: { visible: true },
	},
};

export const PreviousNextDisabled: Story = {
	args: {
		previous: { visible: true },
		next: { visible: true, disabled: true },
	},
};

export const PreviousNextCustomLabels: Story = {
	args: {
		previous: { visible: true, label: 'Previous' },
		next: { visible: true, label: 'Next' },
	},
};

export const NextSave: Story = {
	args: {
		next: { visible: true },
		save: { visible: true },
	},
};

export const NextSaveDisabled: Story = {
	args: {
		next: { visible: true, disabled: true },
		save: { visible: true, disabled: true },
	},
};

export const NextSaveCustomLabels: Story = {
	args: {
		next: { visible: true, label: 'Next' },
		save: { visible: true, label: 'Save' },
	},
};
