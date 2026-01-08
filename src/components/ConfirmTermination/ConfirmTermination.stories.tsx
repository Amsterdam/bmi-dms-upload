import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { confirm } from '@amsterdam/bmi-component-library';
import ConfirmTermination, { customSubject } from './ConfirmTermination';
import { MODAL_SIZES } from '../../enums/MODAL_SIZES';

type ConfirmArgs = Parameters<typeof confirm>[0];

const defaultConfirm: ConfirmArgs = {
	title: 'Waarschuwing',
	message: 'Weet u zeker dat u dit document definitief wilt verwijderen?',
	onCancel: () => {},
	onConfirm: () => {},
};

const englishConfirm: ConfirmArgs = {
	title: 'Warning',
	message: 'Do you want to delete this document?',
	textCancelButton: 'Cancel',
	textConfirmButton: 'Confirm',
	onCancel: () => {},
	onConfirm: () => {},
};

const meta: Meta<typeof ConfirmTermination> = {
	title: 'ConfirmTermination',
	component: ConfirmTermination,
};

export default meta;

type Story = StoryObj<typeof ConfirmTermination>;

const Template: Story = {
	render: (args, { globals, viewMode }) => (
		<>
			<button
				onClick={() => {
					confirm(defaultConfirm, customSubject);
				}}
			>
				Open ConfirmTermination
			</button>
			<ConfirmTermination {...args} />
		</>
	),
	args: {},
};

export const Default: Story = {
	...Template,
};

export const WithCloseButton: Story = {
	...Template,
	args: {
		hideCloseButton: false,
	},
};

export const DifferentDialogSize: Story = {
	...Template,
	args: {
		size: MODAL_SIZES.MD,
	},
};

export const WithCustomButtons: Story = {
	render: (args) => (
		<>
			<button
				onClick={() => {
					confirm(englishConfirm, customSubject);
				}}
			>
				Open ConfirmTermination
			</button>
			<ConfirmTermination {...args} />
		</>
	),
	args: {},
};
