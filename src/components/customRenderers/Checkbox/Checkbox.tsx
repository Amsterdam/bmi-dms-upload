import * as React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { ControlProps } from '@jsonforms/core';
import { Checkbox as ASCCheckbox } from '@amsterdam/asc-ui';

const Checkbox = ({ data: value = '', path, handleChange }: ControlProps) => {
	return (
		<>
			<div>
				<ASCCheckbox
					id={path}
					checked={value}
					onChange={(e) => {
						handleChange(path, e.currentTarget.checked);
					}}
				/>
			</div>
		</>
	);
};

export default withJsonFormsControlProps(Checkbox);
