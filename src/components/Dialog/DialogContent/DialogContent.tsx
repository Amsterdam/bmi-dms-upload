import React from 'react';
import DialogContentStyle from './DialogContentStyles';
export interface Props {
	children?: React.ReactNode | React.ReactNode[];
}

const DialogContent = ({ children }: Props) => {
	return <DialogContentStyle>{children}</DialogContentStyle>;
};

DialogContent.displayName = 'DialogContent';

export default DialogContent;
